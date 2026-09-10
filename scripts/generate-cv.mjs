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
    <section class="section">
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
      <article class="entry entry-compact">
        <div class="entry-head">
          <h3>${escape(item.title)}</h3>
          <span class="period">${escape(item.period)}</span>
        </div>
        <p class="org">${escape(item.org)}</p>
      </article>`,
    )
    .join("")

  const pairs = (rows) =>
    `<div class="pairs">${rows
      .map(
        ([label, value]) =>
          `<div class="pair"><span class="pair-label">${escape(label)}</span><span class="pair-value">${escape(value)}</span></div>`,
      )
      .join("")}</div>`

  const selected = pairs(data.selected.map((i) => [i.name, i.note]))
  const skills = pairs(data.skills.map((s) => [s.label, s.value]))
  const languages = pairs(data.languages.map((l) => [l.name, l.level]))

  const awards = `<ul>${data.awards.map((a) => `<li>${escape(a)}</li>`).join("")}</ul>`

  return `<!doctype html>
<html lang="${data.htmlLang}">
<head>
<meta charset="utf-8">
<title>${escape(CONTACT.name)}, ${escape(data.role)}</title>
<style>
${fonts}

:root{
  --ink:#16222d;
  --body:#3c4b57;
  --muted:#6d7c88;
  --rule:#d9dee2;
  --primary:#1c4d6e;
}

*{box-sizing:border-box;margin:0;padding:0;}

/* Generous margins are part of the convention this has to meet. */
@page{size:A4;margin:18mm 17mm;}

html{font-family:'Archivo Variable',sans-serif;}
body{
  color:var(--body);
  font-size:10pt;
  line-height:1.5;
  -webkit-print-color-adjust:exact;
  print-color-adjust:exact;
}

header.masthead{margin-bottom:20pt;}
h1{
  font-size:24pt;
  font-stretch:106%;
  font-weight:700;
  letter-spacing:-.022em;
  line-height:1.1;
  color:var(--ink);
}
.role{
  margin-top:5pt;
  font-size:11.5pt;
  font-weight:500;
  color:var(--primary);
}
.contact{
  margin-top:9pt;
  padding-top:9pt;
  border-top:.8pt solid var(--rule);
  font-size:9pt;
  color:var(--muted);
}
.contact span:not(:last-child)::after{
  content:"   |   ";
  color:var(--rule);
}

.section{margin-bottom:17pt;}
.section:last-child{margin-bottom:0;}
.section h2{
  break-after:avoid;
  font-size:10.5pt;
  font-weight:700;
  letter-spacing:.01em;
  color:var(--ink);
  padding-bottom:4pt;
  margin-bottom:10pt;
  border-bottom:.8pt solid var(--rule);
}

.summary{max-width:62em;}

.entry{margin-bottom:13pt;break-inside:avoid;}
.entry:last-child{margin-bottom:0;}
.entry-compact{margin-bottom:9pt;}
.entry-head{
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  gap:10pt;
}
.entry h3{
  font-size:11pt;
  font-weight:650;
  color:var(--ink);
  letter-spacing:-.008em;
}
.period{
  font-size:9pt;
  color:var(--muted);
  white-space:nowrap;
}
.org{
  margin-top:1.5pt;
  font-size:9.5pt;
  font-weight:500;
  color:var(--primary);
}

.entry ul{margin-top:6pt;}
ul{list-style:none;}
li{
  position:relative;
  padding-left:11pt;
  margin-bottom:4pt;
}
li:last-child{margin-bottom:0;}
li::before{
  content:"";
  position:absolute;
  left:0;
  top:5.6pt;
  width:4pt;
  height:1pt;
  background:var(--primary);
}

/* Label and value rows. Each row is its own block so a page break can never
   land between a label and the value it belongs to. */
.pair{
  display:flex;
  gap:14pt;
  margin-bottom:7pt;
  break-inside:avoid;
}
.pair:last-child{margin-bottom:0;}
.pair-label{
  flex:0 0 26%;
  font-size:9.5pt;
  font-weight:650;
  color:var(--ink);
}
.pair-value{flex:1;font-size:9.5pt;}
</style>
</head>
<body>
<header class="masthead">
  <h1>${escape(CONTACT.name)}</h1>
  <p class="role">${escape(data.role)}</p>
  <p class="contact">
    <span>${escape(data.location)}</span><span>${escape(CONTACT.email)}</span><span>${escape(CONTACT.phone)}</span><span>${escape(CONTACT.linkedin)}</span><span>${escape(CONTACT.github)}</span><span>${escape(CONTACT.portfolio)}</span>
  </p>
</header>

${section(labels.profile, `<p class="summary">${escape(data.profile)}</p>`)}
${section(labels.experience, experience)}
${section(labels.selected, selected)}
${section(labels.skills, skills)}
${section(labels.education, education)}
${section(labels.awards, awards)}
${section(labels.languages, languages)}
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
