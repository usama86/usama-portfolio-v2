import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const app = join(process.cwd(), ".next/server/app");
const origin = "https://usama-portfolio-v2.vercel.app";
const read = path => readFileSync(join(app, path), "utf8");

test("homepage and projects listing expose distinct canonical and social metadata", () => {
  const home = read("index.html");
  const listing = read("projects.html");
  assert.match(home, new RegExp(`<link rel="canonical" href="${origin}"`));
  assert.match(listing, new RegExp(`<link rel="canonical" href="${origin}/projects"`));
  assert.match(home, /<meta property="og:image"/);
  assert.match(listing, /<meta property="og:image"/);
  assert.match(home, /<meta name="twitter:card" content="summary_large_image"/);
  assert.doesNotMatch(home, /action="mailto:/);
  assert.match(home, /Email directly/);
  assert.doesNotMatch(home, /portal\.techdestination\.com\/verify-certificate/);
});

test("all published project pages have one heading and their own canonical", () => {
  const directory = join(app, "projects");
  const files = readdirSync(directory).filter(file => file.endsWith(".html"));
  assert.equal(files.length, 19);
  for (const file of files) {
    const html = read(join("projects", file));
    const slug = file.slice(0, -5);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, slug);
    assert.ok(html.includes(`<link rel="canonical" href="${origin}/projects/${slug}"`), slug);
    assert.match(html, /<meta property="og:image"/, slug);
  }
});

test("sitemap includes every route and robots points to the same origin", () => {
  const sitemap = read("sitemap.xml.body");
  const robots = read("robots.txt.body");
  assert.equal((sitemap.match(/<loc>/g) || []).length, 21);
  assert.ok(robots.includes(`${origin}/sitemap.xml`));
  assert.ok(existsSync(join(process.cwd(), "public/resume.pdf")));
});
