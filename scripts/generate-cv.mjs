/**
 * Renders the three résumés (EN / PT-BR / ES) to PDF.
 *
 *   npm run generate:cv
 *
 * The layout is written in HTML and printed by headless Chromium so the PDFs
 * carry the same typefaces and palette as the site. Fonts are inlined from
 * node_modules, so the build needs no network access.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright"
import { CONTACT, CV } from "./cv-content.mjs"

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, "..")
const outDir = path.join(root, "app", "public", "cv")
const fontDir = path.join(root, "app", "node_modules", "@fontsource-variable")

const FONT_FILES = [
  ["Archivo Variable", "archivo/files/archivo-latin-wdth-normal.woff2", "62% 125%"],
  ["Archivo Variable", "archivo/files/archivo-latin-ext-wdth-normal.woff2", "62% 125%"],
  ["JetBrains Mono Variable", "jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2", "100%"],
  [
    "JetBrains Mono Variable",
    "jetbrains-mono/files/jetbrains-mono-latin-ext-wght-normal.woff2",
    "100%",
  ],
]

function fontFaces() {
  return FONT_FILES.map(([family, file, stretch]) => {
    const data = fs.readFileSync(path.join(fontDir, file)).toString("base64")
    return `@font-face{font-family:'${family}';font-style:normal;font-weight:100 900;font-stretch:${stretch};src:url(data:font/woff2;base64,${data}) format('woff2-variations');}`
  }).join("\n")
}

const escape = (value) =>
  String(value).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  )

function documentFor(data, fonts) {
  const { labels } = data

  const section = (title, body) => `
    <section class="block">
      <h2>${escape(title)}</h2>
      ${body}
    </section>`

  const experience = data.experience
    .map(
      (job) => `
      <article class="entry">
        <div class="entry-head">
          <h3>${escape(job.title)}</h3>
          <span class="period">${escape(job.period)}</span>
        </div>
        <p class="org">${escape(job.org)}</p>
        <ul>${job.bullets.map((b) => `<li>${escape(b)}</li>`).join("")}</ul>
      </article>`,
    )
    .join("")

  const education = data.education
    .map(
      (item) => `
      <article class="entry compact">
        <div class="entry-head">
          <h3>${escape(item.title)}</h3>
          <span class="period">${escape(item.period)}</span>
        </div>
        <p class="org">${escape(item.org)}</p>
      </article>`,
    )
    .join("")

  const selected = `<ul class="selected">${data.selected
    .map(
      (item) =>
        `<li><span class="selected-name">${escape(item.name)}</span> ${escape(item.note)}</li>`,
    )
    .join("")}</ul>`

  const awards = `<ul>${data.awards.map((a) => `<li>${escape(a)}</li>`).join("")}</ul>`

  const skills = data.skills
    .map(
      (skill) => `
      <div class="skill">
        <span class="skill-label">${escape(skill.label)}</span>
        <span class="skill-value">${escape(skill.value)}</span>
      </div>`,
    )
    .join("")

  const languages = data.languages
    .map(
      (language) => `
      <div class="skill">
        <span class="skill-label">${escape(language.name)}</span>
        <span class="skill-value">${escape(language.level)}</span>
      </div>`,
    )
    .join("")

  return `<!doctype html>
<html lang="${data.htmlLang}">
<head>
<meta charset="utf-8">
<title>${escape(CONTACT.name)} — ${escape(data.role)}</title>
<style>
${fonts}

:root{
  --ink:#17242f;
  --body:#3b4b57;
  --muted:#6b7a86;
  --rule:#d6dbdf;
  --primary:#1c4d6e;
  --signal:#a8712a;
  --sunken:#f2f4f6;
}

*{box-sizing:border-box;margin:0;padding:0;}

@page{size:A4;margin:11mm 11mm;}

html{font-family:'Archivo Variable',sans-serif;}
body{
  color:var(--body);
  font-size:8.9pt;
  line-height:1.42;
  -webkit-print-color-adjust:exact;
  print-color-adjust:exact;
}

/* Masthead — the name is the one place the type gets loud. */
header.masthead{
  border-bottom:1.6pt solid var(--ink);
  padding-bottom:6pt;
  margin-bottom:9pt;
}
h1{
  font-size:22pt;
  font-stretch:112%;
  font-weight:700;
  letter-spacing:-.028em;
  line-height:1;
  color:var(--ink);
}
.role{
  margin-top:3pt;
  font-size:10pt;
  font-weight:500;
  color:var(--primary);
}
.contact-line{
  margin-top:6pt;
  font-family:'JetBrains Mono Variable',monospace;
  font-size:7.3pt;
  letter-spacing:-.01em;
  color:var(--muted);
}
.contact-line span+span::before{content:"  ·  ";color:var(--rule);}

.layout{display:grid;grid-template-columns:1fr 60mm;gap:8mm;align-items:start;}

.block{margin-bottom:8pt;break-inside:avoid;}
.block h2{
  font-family:'JetBrains Mono Variable',monospace;
  font-size:7.6pt;
  font-weight:600;
  color:var(--primary);
  padding-bottom:2.2pt;
  margin-bottom:5pt;
  border-bottom:.7pt solid var(--rule);
}

.summary{text-align:justify;}

.entry{margin-bottom:6.5pt;break-inside:avoid;}
.entry:last-child{margin-bottom:0;}
.entry.compact{margin-bottom:4.5pt;}
.entry-head{display:flex;justify-content:space-between;align-items:baseline;gap:6pt;}
.entry h3{font-size:9.8pt;font-weight:650;color:var(--ink);letter-spacing:-.012em;}
.period{
  font-family:'JetBrains Mono Variable',monospace;
  font-size:7.2pt;
  color:var(--signal);
  white-space:nowrap;
}
.org{font-size:8.4pt;color:var(--muted);margin-top:.5pt;}

ul{list-style:none;margin-top:3.5pt;}
li{position:relative;padding-left:8pt;margin-bottom:2pt;}
li::before{
  content:"";
  position:absolute;
  left:0;top:5.2pt;
  width:3pt;height:.9pt;
  background:var(--signal);
}

.selected li{padding-left:8pt;}
.selected-name{color:var(--ink);font-weight:600;}

/* Right rail */
aside .block{
  background:var(--sunken);
  border:.7pt solid var(--rule);
  padding:6pt 7pt;
}
aside .block h2{border-bottom-color:var(--rule);}

.skill{margin-bottom:4pt;}
.skill:last-child{margin-bottom:0;}
.skill-label{
  display:block;
  font-size:8.2pt;
  font-weight:650;
  color:var(--ink);
}
.skill-value{display:block;font-size:8pt;color:var(--body);}
</style>
</head>
<body>
<header class="masthead">
  <h1>${escape(CONTACT.name)}</h1>
  <p class="role">${escape(data.role)}</p>
  <p class="contact-line">
    <span>${escape(data.location)}</span><span>${escape(CONTACT.email)}</span><span>${escape(CONTACT.phone)}</span>
  </p>
  <p class="contact-line">
    <span>${escape(CONTACT.portfolio)}</span><span>${escape(CONTACT.linkedin)}</span><span>${escape(CONTACT.github)}</span>
  </p>
</header>

<div class="layout">
  <main>
    ${section(labels.profile, `<p class="summary">${escape(data.profile)}</p>`)}
    ${section(labels.experience, experience)}
    ${section(labels.education, education)}
  </main>
  <aside>
    ${section(labels.skills, skills)}
    ${section(labels.selected, selected)}
    ${section(labels.awards, awards)}
    ${section(labels.languages, languages)}
  </aside>
</div>
</body>
</html>`
}

/**
 * Prefers Playwright's own Chromium. Falls back to a browser already present
 * under PLAYWRIGHT_BROWSERS_PATH, which is how CI images usually ship one.
 */
async function launchChromium() {
  try {
    return await chromium.launch()
  } catch (error) {
    const base = process.env.PLAYWRIGHT_BROWSERS_PATH
    if (!base || !fs.existsSync(base)) throw error

    const candidate = fs
      .readdirSync(base)
      .filter((name) => name.startsWith("chromium-"))
      .sort()
      .reverse()
      .map((name) => path.join(base, name, "chrome-linux", "chrome"))
      .find((file) => fs.existsSync(file))

    if (!candidate) throw error
    return chromium.launch({ executablePath: candidate })
  }
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true })
  const fonts = fontFaces()

  const browser = await launchChromium()
  const context = await browser.newContext()
  const written = []

  try {
    for (const [locale, data] of Object.entries(CV)) {
      const page = await context.newPage()
      await page.setContent(documentFor(data, fonts), { waitUntil: "load" })
      await page.evaluate(() => document.fonts.ready)
      const target = path.join(outDir, data.file)
      await page.pdf({
        path: target,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
      })
      await page.close()
      written.push(`${locale} → ${path.relative(root, target)}`)
    }
  } finally {
    await browser.close()
  }

  console.log(`Résumés generated:\n${written.map((w) => `  ${w}`).join("\n")}`)
}

await main()
