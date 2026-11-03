import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const repo = process.cwd();
const pages = {
  archwalk: "archwalk-immersive-experience-platform",
  talentflow: "talentflow-enterprise-recruiting-platform",
  cleon: "cleon-ai-voice-ordering",
};
function html(slug) {
  const file = join(repo, ".next/server/app/projects", `${slug}.html`);
  assert.ok(existsSync(file), `Build output missing: ${slug}`);
  return readFileSync(file, "utf8");
}

for (const [name, slug] of Object.entries(pages)) {
  test(`${name}: structured story and architecture survive static rendering`, () => {
    const page = html(slug);
    assert.match(page, /data-case-study="engineering"/);
    for (const phrase of ["At a glance", "System architecture", "Engineering choices", "Delivery &amp; outcome", "Real product evidence", "Technology by responsibility"]) {
      assert.ok(page.includes(phrase), `${name} missing ${phrase}`);
    }
    assert.match(page, /aria-label="[^"]+(?:path|model|platform|ordering)[^"]*"/i);
  });

  test(`${name}: every TOC target exists exactly once`, () => {
    const page = html(slug);
    const targets = [...page.matchAll(/href="#([a-z0-9-]+)"/g)].map(match => match[1]).filter(id => id !== "main-content");
    assert.ok(targets.length >= 8);
    assert.equal(new Set(targets).size, targets.length);
    for (const target of targets) {
      const count = [...page.matchAll(new RegExp(`id="${target}"`, "g"))].length;
      assert.equal(count, 1, `${target} must have one target`);
    }
  });

  test(`${name}: referenced local product images exist`, () => {
    const page = html(slug);
    const encoded = [...page.matchAll(/url=(%2Fimages%2Fprojects%2F[^&" ]+)/g)].map(match => decodeURIComponent(match[1]));
    assert.ok(encoded.length > 0, `${name} has no local product images`);
    for (const src of new Set(encoded)) assert.ok(existsSync(join(repo, "public", src)), `Missing ${src}`);
  });
}

test("ArchWalk distinguishes public 360 from unlaunched Architects and qualifies the 3D still", () => {
  const page = html(pages.archwalk);
  assert.match(page, /ArchWalk 360/);
  assert.match(page, /Publicly Coming Soon/);
  assert.match(page, /Orbit review mode/);
  assert.match(page, /not a public product screenshot or a Walk session/);
  assert.match(page, /Architects · Coming Soon logical path/);
});

test("TalentFlow is identified as a simulation with state-evaluation evidence", () => {
  const page = html(pages.talentflow);
  assert.match(page, /AI training and evaluation/);
  assert.match(page, /State Diff/);
  assert.match(page, /no commercial ATS customer claim/);
});

test("Cleon qualifies provider and live-order status", () => {
  const page = html(pages.cleon);
  assert.match(page, /OrderOut foundation/);
  assert.match(page, /not proof of full production operation/);
  assert.match(page, /No verified customer order volume/);
});

test("older project retains the legacy case-study layout", () => {
  const page = html("query-builder");
  assert.doesNotMatch(page, /data-case-study="engineering"/);
  assert.match(page, />Overview</);
  assert.match(page, />Problem</);
  assert.match(page, />Demo \/ Media</);
});
