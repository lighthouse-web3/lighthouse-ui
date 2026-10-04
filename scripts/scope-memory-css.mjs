/**
 * Scope the memory site's stylesheets so they cannot reach the storage pages.
 *
 * The memory UI is designed as a standalone site, so its CSS styles bare
 * elements (a, button, h1, footer ...) and html/body directly. Dropped into
 * this app as-is, those rules restyle every page. This rewrites them in place:
 *
 *   a { ... }            ->  :where(.memory-page) a { ... }
 *   html { ... }         ->  html:where(:has(.memory-page)) { ... }
 *   body { ... }         ->  body:where(:has(.memory-page)) { ... }
 *   :root { ... }        ->  :root:where(:has(.memory-page)) { ... }
 *
 * :where() adds no specificity, so the original cascade is untouched -- a
 * plain `.memory-page a` would outrank single-class rules like `.primary` and
 * change which declarations win. html/body keep their real targets (rather
 * than being moved onto the wrapper) because scroll-padding, scroll-behavior
 * and the page background only work on the root scroller.
 *
 * Selectors that already name a class, id or attribute are left alone: they
 * are namespaced by that name, and `--report` lists every class so it can be
 * checked against the rest of the site.
 *
 * Usage, after copying a new design drop into containers/MemoryHome/styles:
 *   node scripts/scope-memory-css.mjs            rewrite in place (idempotent)
 *   node scripts/scope-memory-css.mjs --dry      show what would change
 *   node scripts/scope-memory-css.mjs --report   list classes, keyframes, vars
 */
import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";

const STYLES_DIR = "containers/MemoryHome/styles";
const SCOPE = ".memory-page";
const WRAP = `:where(${SCOPE})`;
const ROOT_TARGETS = ["html", "body", ":root"];

const dry = process.argv.includes("--dry");
const report = process.argv.includes("--report");

/** Drop every balanced `:not(...)` so a class inside a negation is not mistaken for a namespace. */
function withoutNegations(selector) {
  let out = "";
  for (let i = 0; i < selector.length; i++) {
    if (selector.startsWith(":not(", i)) {
      let depth = 0;
      for (; i < selector.length; i++) {
        if (selector[i] === "(") depth++;
        else if (selector[i] === ")" && --depth === 0) break;
      }
      continue;
    }
    out += selector[i];
  }
  return out;
}

/** The first compound of a selector: everything before the first top-level combinator. */
function firstCompound(selector) {
  let depth = 0;
  for (let i = 0; i < selector.length; i++) {
    const char = selector[i];
    if (char === "(" || char === "[") depth++;
    else if (char === ")" || char === "]") depth--;
    else if (depth === 0 && /[\s>+~]/.test(char)) return selector.slice(0, i);
  }
  return selector;
}

const isNamespaced = (selector) => /[.#[]/.test(withoutNegations(selector));

function scopeSelector(selector) {
  const trimmed = selector.trim();
  if (trimmed.includes(SCOPE)) return selector;

  const head = firstCompound(trimmed);
  const rootTarget = ROOT_TARGETS.find(
    (target) => head === target || head.startsWith(target + ":"),
  );

  // html.lenis, body.paused .x and friends are already gated by a class.
  if (isNamespaced(trimmed)) return selector;

  if (rootTarget) {
    const scopedHead =
      rootTarget + `:where(:has(${SCOPE}))` + head.slice(rootTarget.length);
    return scopedHead + trimmed.slice(head.length);
  }
  return `${WRAP} ${trimmed}`;
}

const insideKeyframes = (rule) => {
  for (let node = rule.parent; node; node = node.parent) {
    if (node.type === "atrule" && /keyframes$/i.test(node.name)) return true;
  }
  return false;
};

const classes = new Map();
const keyframes = new Map();
const rootVars = new Set();
let changedSelectors = 0;

for (const file of fs.readdirSync(STYLES_DIR).filter((f) => f.endsWith(".css")).sort()) {
  const filePath = path.join(STYLES_DIR, file);
  const root = postcss.parse(fs.readFileSync(filePath, "utf8"), { from: filePath });
  let fileChanged = false;

  root.walkAtRules(/keyframes$/i, (atRule) => {
    keyframes.set(atRule.params, [...(keyframes.get(atRule.params) || []), file]);
  });

  root.walkRules((rule) => {
    if (insideKeyframes(rule)) return;

    for (const match of rule.selector.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) {
      classes.set(match[1], (classes.get(match[1]) || new Set()).add(file));
    }
    if (rule.selectors.some((s) => ROOT_TARGETS.includes(firstCompound(s.trim()).split(":where")[0].replace(/:(?!root).*$/, "")))) {
      rule.walkDecls(/^--/, (decl) => rootVars.add(decl.prop));
    }

    const next = rule.selectors.map(scopeSelector);
    next.forEach((selector, index) => {
      if (selector === rule.selectors[index]) return;
      changedSelectors++;
      fileChanged = true;
      if (dry) console.log(`${file}: ${rule.selectors[index].trim()}  ->  ${selector}`);
    });
    if (!dry && !report) rule.selectors = next;
  });

  if (fileChanged && !dry && !report) fs.writeFileSync(filePath, root.toString());
}

if (report) {
  console.log(JSON.stringify({
    classes: [...classes.keys()].sort(),
    keyframes: Object.fromEntries(keyframes),
    rootVars: [...rootVars].sort(),
  }));
} else {
  console.log(`${dry ? "would scope" : "scoped"} ${changedSelectors} selector(s)`);
}
