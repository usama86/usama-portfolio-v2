import test from "node:test";
import assert from "node:assert/strict";
import { handleContact } from "../src/lib/contact-service.ts";

const valid = {
  name: "Alex Recruiter", email: "alex@example.com", subject: "Engineering role",
  message: "Could we talk about the senior engineering role?", website: "",
  turnstileToken: "valid-token", submissionId: "18106f17-b8a5-473c-92e3-42a61ac3d6a4",
};
const config = { resendKey: "test-server-key", fromEmail: "Portfolio <hello@verified.example>", turnstileSecret: "test-secret", allowedHostnames: "usama-portfolio-v2.vercel.app" };
function request(body = valid, headers = {}) {
  return new Request("https://usama-portfolio-v2.vercel.app/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json", Origin: "https://usama-portfolio-v2.vercel.app", Host: "usama-portfolio-v2.vercel.app", ...headers },
    body: JSON.stringify(body),
  });
}
function setup(resendResponse = { id: "email_123" }, challenge = { success: true, hostname: "usama-portfolio-v2.vercel.app", action: "portfolio_contact" }) {
  const calls = [];
  const dependencies = {
    config, now: () => 1000, attempts: new Map(), completed: new Map(),
    fetchImpl: async (url, options) => {
      calls.push({ url, options });
      return Response.json(url.includes("siteverify") ? challenge : resendResponse, { status: url.includes("siteverify") ? 200 : resendResponse.status || 200 });
    },
  };
  return { dependencies, calls };
}

test("valid contact sends through Resend with verified From, visitor Reply-To and idempotency", async () => {
  const { dependencies, calls } = setup();
  const response = await handleContact(request(), dependencies);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(calls.length, 2);
  assert.match(calls[0].url, /siteverify/);
  const sent = JSON.parse(calls[1].options.body);
  assert.equal(sent.from, config.fromEmail);
  assert.deepEqual(sent.to, ["usama.amjad32@gmail.com"]);
  assert.equal(sent.reply_to, valid.email);
  assert.equal(calls[1].options.headers["Idempotency-Key"], `portfolio-contact/${valid.submissionId}`);
});

test("invalid fields and oversized payload never reach Turnstile or Resend", async () => {
  const { dependencies, calls } = setup();
  assert.equal((await handleContact(request({ ...valid, email: "bad\n@example.com" }), dependencies)).status, 400);
  assert.equal((await handleContact(request({ ...valid, message: "x".repeat(9000) }), dependencies)).status, 413);
  assert.equal((await handleContact(request({ ...valid, website: "bot" }), dependencies)).status, 400);
  assert.equal(calls.length, 0);
});

test("failed Turnstile verification prevents delivery", async () => {
  const { dependencies, calls } = setup({ id: "email_123" }, { success: false });
  assert.equal((await handleContact(request(), dependencies)).status, 400);
  assert.equal(calls.length, 1);
});

test("cross-site origin is rejected before any provider call", async () => {
  const { dependencies, calls } = setup();
  assert.equal((await handleContact(request(valid, { Origin: "https://elsewhere.example" }), dependencies)).status, 403);
  assert.equal(calls.length, 0);
});

test("same-host browser request survives a framework URL rewrite", async () => {
  const { dependencies, calls } = setup({ id: "email_123" }, { success: true, hostname: "127.0.0.1", action: "portfolio_contact" });
  dependencies.config = { ...config, allowedHostnames: "127.0.0.1" };
  const browserRequest = new Request("http://localhost:3109/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", Host: "127.0.0.1:3109", Origin: "http://127.0.0.1:3109" },
    body: JSON.stringify(valid),
  });
  assert.equal((await handleContact(browserRequest, dependencies)).status, 200);
  assert.equal(calls.length, 2);
});

test("provider rejection is a failure and a retry with the same id can succeed", async () => {
  const { dependencies, calls } = setup({ status: 422 });
  assert.equal((await handleContact(request(), dependencies)).status, 502);
  dependencies.fetchImpl = async (url, options) => {
    calls.push({ url, options });
    return Response.json(url.includes("siteverify") ? { success: true, hostname: "usama-portfolio-v2.vercel.app", action: "portfolio_contact" } : { id: "email_456" });
  };
  assert.equal((await handleContact(request({ ...valid, turnstileToken: "fresh-token" }), dependencies)).status, 200);
  assert.equal(calls.filter(call => call.url.includes("api.resend.com")).length, 2);
});

test("duplicate accepted submission is not sent twice", async () => {
  const { dependencies, calls } = setup();
  assert.equal((await handleContact(request(), dependencies)).status, 200);
  assert.equal((await handleContact(request({ ...valid, turnstileToken: "fresh-token" }), dependencies)).status, 200);
  assert.equal(calls.filter(call => call.url.includes("api.resend.com")).length, 1);
});

test("rate limit and missing configuration fail closed", async () => {
  const { dependencies, calls } = setup();
  assert.equal((await handleContact(request(), { ...dependencies, config: { ...config, resendKey: undefined } })).status, 503);
  for (let i = 0; i < 5; i++) await handleContact(request({ ...valid, submissionId: crypto.randomUUID() }), dependencies);
  assert.equal((await handleContact(request({ ...valid, submissionId: crypto.randomUUID() }), dependencies)).status, 429);
  assert.equal(calls.filter(call => call.url.includes("api.resend.com")).length, 5);
});
