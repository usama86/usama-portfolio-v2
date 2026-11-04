import { createHash } from "node:crypto";

const MAX_BODY_BYTES = 8_192;
const WINDOW_MS = 10 * 60_000;
const MAX_ATTEMPTS = 5;
const OWNER_EMAIL = "usama.amjad32@gmail.com";

type ContactConfig = {
  resendKey?: string;
  fromEmail?: string;
  turnstileSecret?: string;
  allowedHostnames?: string;
};
type Dependencies = {
  config: ContactConfig;
  fetchImpl: typeof fetch;
  now: () => number;
  attempts: Map<string, { count: number; until: number }>;
  completed: Map<string, { digest: string; until: number }>;
};

const attempts = new Map<string, { count: number; until: number }>();
const completed = new Map<string, { digest: string; until: number }>();

function defaults(): Dependencies {
  return {
    config: {
      resendKey: process.env.CONTACT_RESEND_API_KEY,
      fromEmail: process.env.CONTACT_FROM_EMAIL,
      turnstileSecret: process.env.CONTACT_TURNSTILE_SECRET_KEY,
      allowedHostnames: process.env.CONTACT_TURNSTILE_HOSTNAMES,
    },
    fetchImpl: fetch,
    now: Date.now,
    attempts,
    completed,
  };
}

function reply(status: number, message: string) {
  return Response.json({ ok: status === 200, message }, { status, headers: { "Cache-Control": "no-store" } });
}

async function readLimitedBody(request: Request): Promise<unknown> {
  const length = Number(request.headers.get("content-length"));
  if (Number.isFinite(length) && length > MAX_BODY_BYTES) throw new Error("size");
  if (!request.body) throw new Error("body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) throw new Error("size");
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { throw new Error("body"); }
}

function validate(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  const fields = ["name", "email", "subject", "message", "turnstileToken", "submissionId", "website"] as const;
  if (fields.some(field => typeof data[field] !== "string")) return null;
  const name = (data.name as string).trim();
  const email = (data.email as string).trim();
  const subject = (data.subject as string).trim();
  const message = (data.message as string).trim();
  const token = data.turnstileToken as string;
  const submissionId = data.submissionId as string;
  const website = data.website as string;
  if (name.length < 2 || name.length > 80 || /[\r\n\x00-\x1f]/.test(name)) return null;
  if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\r\n]/.test(email)) return null;
  if (subject.length < 3 || subject.length > 120 || /[\r\n\x00-\x1f]/.test(subject)) return null;
  if (message.length < 10 || message.length > 3000 || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(message)) return null;
  if (token.length < 1 || token.length > 2048) return null;
  if (!/^[a-f\d]{8}-[a-f\d]{4}-[1-8][a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(submissionId)) return null;
  if (website.length > 0) return { honeypot: true } as const;
  return { name, email, subject, message, token, submissionId, honeypot: false } as const;
}

function safeLog(event: string, status?: number) {
  console.error("portfolio_contact", { event, ...(status ? { status } : {}) });
}

export async function handleContact(request: Request, dependencies: Dependencies = defaults()): Promise<Response> {
  const { config, fetchImpl, now, attempts, completed } = dependencies;
  if (!config.resendKey || !config.fromEmail || !config.turnstileSecret || !config.allowedHostnames) {
    safeLog("configuration_missing");
    return reply(503, "The contact form is temporarily unavailable. Please email me directly.");
  }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return reply(415, "Please submit the contact form again.");
  const origin = request.headers.get("origin");
  if (origin) {
    let source: URL;
    try { source = new URL(origin); } catch { return reply(403, "Please submit the contact form from this site."); }
    const host = request.headers.get("host") || new URL(request.url).host;
    const protocol = `${request.headers.get("x-forwarded-proto") || new URL(request.url).protocol.replace(":", "")}:`;
    if (source.host !== host || source.protocol !== protocol) return reply(403, "Please submit the contact form from this site.");
  }
  if (request.headers.get("sec-fetch-site") === "cross-site") return reply(403, "Please submit the contact form from this site.");

  const client = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const time = now();
  if (attempts.size > 2_000) for (const [key, entry] of attempts) if (entry.until <= time || attempts.size > 2_000) attempts.delete(key);
  if (completed.size > 2_000) for (const [key, entry] of completed) if (entry.until <= time || completed.size > 2_000) completed.delete(key);
  const attempt = attempts.get(client);
  if (attempt && attempt.until > time && attempt.count >= MAX_ATTEMPTS) return reply(429, "Too many attempts. Please try again later or email me directly.");
  attempts.set(client, { count: attempt && attempt.until > time ? attempt.count + 1 : 1, until: attempt && attempt.until > time ? attempt.until : time + WINDOW_MS });

  let raw: unknown;
  try { raw = await readLimitedBody(request); }
  catch (error) { return reply(error instanceof Error && error.message === "size" ? 413 : 400, "Please check the form and try again."); }
  const data = validate(raw);
  if (!data) return reply(400, "Please check all fields and try again.");
  if (data.honeypot) return reply(400, "Please check all fields and try again.");

  let challenge: { success?: boolean; hostname?: string; action?: string };
  try {
    const response = await fetchImpl("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(8_000),
      body: JSON.stringify({ secret: config.turnstileSecret, response: data.token }),
    });
    if (!response.ok) throw new Error("siteverify");
    challenge = await response.json();
  } catch {
    safeLog("verification_unavailable");
    return reply(503, "Verification is unavailable. Please try again or email me directly.");
  }
  const allowedHostnames = config.allowedHostnames.split(",").map(host => host.trim().toLowerCase()).filter(Boolean);
  if (!challenge.success || !challenge.hostname || !allowedHostnames.includes(challenge.hostname.toLowerCase()) || challenge.action !== "portfolio_contact") {
    return reply(400, "Verification expired or failed. Please try again.");
  }

  const digest = createHash("sha256").update(JSON.stringify([data.name, data.email, data.subject, data.message])).digest("hex");
  const previous = completed.get(data.submissionId);
  if (previous && previous.until > time) return previous.digest === digest ? reply(200, "Message sent. Thank you for reaching out.") : reply(409, "Please submit the updated message again.");

  let response: Response;
  try {
    response = await fetchImpl("https://api.resend.com/emails", {
      method: "POST", signal: AbortSignal.timeout(10_000),
      headers: { Authorization: `Bearer ${config.resendKey}`, "Content-Type": "application/json", "Idempotency-Key": `portfolio-contact/${data.submissionId}` },
      body: JSON.stringify({
        from: config.fromEmail,
        to: [OWNER_EMAIL],
        reply_to: data.email,
        subject: `Portfolio contact: ${data.subject}`,
        text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
        tags: [{ name: "category", value: "portfolio_contact" }],
      }),
    });
  } catch {
    safeLog("provider_unavailable");
    return reply(502, "The message could not be sent. Please try again or email me directly.");
  }
  if (!response.ok) {
    safeLog("provider_rejected", response.status);
    return reply(502, "The message could not be sent. Please try again or email me directly.");
  }
  let result: { id?: unknown };
  try { result = await response.json(); }
  catch { safeLog("provider_invalid_response"); return reply(502, "The message could not be confirmed. Please email me directly."); }
  if (typeof result.id !== "string" || !result.id) {
    safeLog("provider_invalid_response");
    return reply(502, "The message could not be confirmed. Please email me directly.");
  }
  completed.set(data.submissionId, { digest, until: time + WINDOW_MS });
  return reply(200, "Message sent. Thank you for reaching out.");
}
