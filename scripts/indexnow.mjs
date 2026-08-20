#!/usr/bin/env node
/**
 * Push URLs to IndexNow, so Bing, Yandex, Seznam and Naver learn about new
 * pages without anyone submitting them by hand. Google does not consume
 * IndexNow; nothing here reaches Google.
 *
 *   node scripts/indexnow.mjs                    list every sitemap URL
 *   node scripts/indexnow.mjs --submit           submit every sitemap URL
 *   node scripts/indexnow.mjs --submit --changed 2
 *                                                only pages modified in the
 *                                                last 2 days
 *   node scripts/indexnow.mjs --sitemap http://localhost:3000/sitemap.xml
 *                                                read a different sitemap
 *
 * Dry run is the default on purpose: this publishes to third-party services,
 * so the submitting step is always an explicit choice.
 *
 * URLs come from the live sitemap rather than a build artifact, because blog
 * posts are published from the CMS and never touch this repo. Anything the
 * sitemap lists is something we are willing to have crawled, which makes it
 * the right source of truth for both.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ENDPOINT = "https://api.indexnow.org/indexnow";

const args = process.argv.slice(2);
const submit = args.includes("--submit");

const flagValue = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};

const changedDays = flagValue("--changed");
const sitemapOverride = flagValue("--sitemap");

/**
 * Read the two constants out of the source rather than importing it. Importing
 * would pull in the module graph for two string literals.
 */
function readSiteConstants() {
  const src = readFileSync(path.join(ROOT, "utils/Data/config.js"), "utf8");
  const grab = (name) => {
    const match = src.match(new RegExp(`export const ${name} = "([^"]+)"`));
    if (!match) throw new Error(`could not find ${name} in utils/Data/config.js`);
    return match[1];
  };
  return { siteUrl: grab("SITE_URL"), key: grab("indexNowKey") };
}

const { siteUrl, key } = readSiteConstants();
const host = new URL(siteUrl).host;
const keyLocation = `${siteUrl}/${key}.txt`;

// A key file that does not match the constant means IndexNow will reject every
// submission with a 403. Catching it here beats reading it out of an API error.
const keyFile = path.join(ROOT, "public", `${key}.txt`);
let keyFileContents;
try {
  keyFileContents = readFileSync(keyFile, "utf8").trim();
} catch {
  console.error(`Missing key file: public/${key}.txt`);
  console.error("It must exist and contain the key, or IndexNow returns 403.");
  process.exit(1);
}
if (keyFileContents !== key) {
  console.error(`public/${key}.txt does not contain the key it is named after.`);
  console.error(`  expected: ${key}`);
  console.error(`  found:    ${keyFileContents}`);
  process.exit(1);
}

/**
 * Every public URL, read from the sitemap so the two can never disagree.
 * Returns { loc, lastmod } so --changed can filter on it.
 */
async function sitemapEntries() {
  const url = sitemapOverride ?? `${siteUrl}/sitemap.xml`;
  let xml;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Sitemap fetch failed: HTTP ${res.status} for ${url}`);
      process.exit(1);
    }
    xml = await res.text();
  } catch (err) {
    console.error(`Could not fetch ${url}: ${err.message}`);
    process.exit(1);
  }

  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((block) => {
    const body = block[1];
    const loc = body.match(/<loc>([\s\S]*?)<\/loc>/)?.[1]?.trim();
    const lastmod = body.match(/<lastmod>([\s\S]*?)<\/lastmod>/)?.[1]?.trim();
    return { loc, lastmod };
  });

  const usable = entries.filter((e) => e.loc);
  if (usable.length === 0) {
    console.error(`No <loc> entries found in ${url}.`);
    process.exit(1);
  }
  return usable;
}

/**
 * Pages modified within the window. Entries with no lastmod are skipped rather
 * than assumed fresh: static pages deliberately carry no lastmod, and a daily
 * job resubmitting the whole site is the noise IndexNow asks you to avoid.
 */
function recentlyModified(entries, days) {
  const cutoff = Date.now() - Number(days) * 24 * 60 * 60 * 1000;
  return entries.filter((e) => {
    if (!e.lastmod) return false;
    const ts = Date.parse(e.lastmod);
    return Number.isFinite(ts) && ts >= cutoff;
  });
}

const entries = await sitemapEntries();
const selected = changedDays ? recentlyModified(entries, changedDays) : entries;

// A URL on another host is rejected with 422 for the whole batch, so drop any
// stray entry before it takes the rest of the submission down with it.
const urlList = selected
  .map((e) => e.loc)
  .filter((loc) => {
    if (loc.startsWith(`${siteUrl}/`) || loc === siteUrl) return true;
    console.warn(`Skipping URL outside ${host}: ${loc}`);
    return false;
  });

if (urlList.length === 0) {
  console.log(
    changedDays
      ? `Nothing modified in the last ${changedDays} day(s). Nothing to submit.`
      : "No URLs found.",
  );
  process.exit(0);
}

console.log(`host:        ${host}`);
console.log(`keyLocation: ${keyLocation}`);
console.log(`urls:        ${urlList.length}${changedDays ? ` (modified in last ${changedDays}d)` : ""}`);
urlList.forEach((u) => console.log(`  ${u}`));

if (!submit) {
  console.log("\nDry run. Re-run with --submit to send these to IndexNow.");
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

// 200 accepted, 202 accepted but the key is still being verified — both fine.
if (res.status === 200 || res.status === 202) {
  console.log(`\nSubmitted. HTTP ${res.status}.`);
  if (res.status === 202) {
    console.log(`Key pending validation. Confirm ${keyLocation} is live.`);
  }
  process.exit(0);
}

console.error(`\nIndexNow rejected the submission. HTTP ${res.status}.`);
console.error(await res.text());
console.error(
  {
    400: "Malformed request body.",
    403: `Key not valid — check ${keyLocation} is reachable and contains the key.`,
    422: "A URL does not belong to this host, or the key does not match the host.",
    429: "Too many requests. Wait and retry.",
  }[res.status] ?? "Unexpected status.",
);
process.exit(1);
