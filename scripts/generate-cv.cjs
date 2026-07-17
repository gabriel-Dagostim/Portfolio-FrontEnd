/**
 * Gera CVs PT-BR e EN em PDF para o portfólio.
 * Uso: node scripts/generate-cv.cjs  (ou npm run generate:cv)
 */
const PDFDocument = require("../app/node_modules/pdfkit")
const fs = require("fs")
const path = require("path")

const OUT_DIR = path.resolve(__dirname, "../app/public/cv")
const FONT_REG = "C:/Windows/Fonts/arial.ttf"
const FONT_BOLD = "C:/Windows/Fonts/arialbd.ttf"
const FONT_ITALIC = "C:/Windows/Fonts/ariali.ttf"

const COLORS = {
  ink: "#0f172a",
  inkSoft: "#1e293b",
  muted: "#64748b",
  body: "#334155",
  line: "#e2e8f0",
  accent: "#6d28d9",
  accentSoft: "#f5f3ff",
  chip: "#f1f5f9",
}

const CONTACT = {
  name: "Gabriel Henrique Dagostim",
  email: "profissional.gabrieldagostim@outlook.com",
  phone: "+55 (45) 98412-7626",
  linkedin: "linkedin.com/in/gabriel-dagostim",
  github: "github.com/gabriel-Dagostim",
  portfolio: "gabrieldagostim.com",
}

const CONTENT = {
  "pt-BR": {
    role: "Full stack · APIs · dados com IA · infraestrutura",
    file: "Gabriel-Dagostim-CV-pt-BR.pdf",
    location: "Cascavel, Paraná — Brasil",
    summaryTitle: "Perfil",
    summary:
      "Desenvolvo frontend e backend (APIs), análise de dados com IA, integrações, automações e organização de infraestrutura. Atuo na interseção entre produto e operação: sistemas internos, painéis, bots e melhorias de processo que a operação usa de verdade.",
    experienceTitle: "Experiência profissional",
    educationTitle: "Formação acadêmica",
    skillsTitle: "Competências",
    awardsTitle: "Premiações e competições",
    coursesTitle: "Cursos e atividades",
    languagesTitle: "Idiomas",
    contactLabel: "Contato",
    experiences: [
      {
        title: "Infraestrutura & Desenvolvedor Sênior",
        org: "Farmácias Estrela",
        period: "Fev 2025 — Atual",
        bullets: [
          "APIs e backends, sistemas web internos, integrações e automações para a operação da rede.",
          "Análise de dados com IA, painéis, bots, auth centralizado, monitoramento e ferramentas de TI.",
          "Organização de infra e melhoria de processos com foco em uso real no dia a dia.",
        ],
      },
      {
        title: "Analista / Suporte — Datacenter",
        org: "Unioeste",
        period: "Nov 2023 — Fev 2025",
        bullets: [
          "Operação de datacenter: disponibilidade, suporte técnico interno e segurança.",
          "Redes, Active Directory e otimização do ambiente institucional.",
        ],
      },
      {
        title: "Social Media",
        org: "EletroLimp",
        period: "Jan 2023 — Nov 2023",
        bullets: [
          "Gestão de redes, metodologia de posts, impulsionamento e CRM de marketing.",
          "Componentes visuais para site e sistema.",
        ],
      },
      {
        title: "UI Freelancer",
        org: "Workana",
        period: "Set 2022 — Ago 2023",
        bullets: [
          "Freelas de UI/UX, textos e posts; prototipação em Figma para clientes.",
        ],
      },
    ],
    education: [
      {
        title: "Pós-graduação — IA aplicada a negócios",
        org: "Centro Universitário Assis Gurgacz (FAG)",
        period: "Cursando",
      },
      {
        title: "Engenharia de Software",
        org: "Centro Universitário Assis Gurgacz (FAG)",
        period: "Concluído",
      },
      {
        title: "Ensino Médio",
        org: "Colégio Eleodoro Ebano Pereira",
        period: "2019",
      },
    ],
    skills: [
      {
        label: "Frontend",
        value: "TypeScript, React, Vite, Next.js, Tailwind CSS, UI/UX, Figma",
      },
      {
        label: "Backend & APIs",
        value: "Node.js, Python, REST, JWT, SQL Server, PostgreSQL, MongoDB",
      },
      {
        label: "Dados & IA",
        value: "SQL avançado, NL→SQL, LLMs locais, cruzamento de dados, relatórios",
      },
      {
        label: "Infra & ops",
        value: "Windows Server, AD, Linux, Docker, Coolify, redes, PowerShell",
      },
      {
        label: "Automação",
        value: "Bots customizados, integrações, webhooks, jobs e fluxos operacionais",
      },
    ],
    awards: [
      "Hackathons FAG — Show Rural Digital (pódios, incl. 3º lugar 2024).",
      "Eureka — FEBRACE 2021; Infomatrix México 2020/2021; 3º Fenecit 2020.",
      "Código Kid — 1a9m em programação de dispositivos eletrônicos e Arduino.",
    ],
    courses: [
      "Programação eletrônica — Código Kid (1a9m)",
      "Feiras de robótica — Eureka",
      "Lógica, informática e hardware — Harpa Informática",
      "Inglês — New York School (desde fev/2023)",
      "Introdução à Informática — SEST SENAT; Gestão de finanças",
    ],
    languages: [
      { name: "Português", level: "Nativo" },
      { name: "Inglês", level: "Intermediário" },
    ],
  },
  en: {
    role: "Full stack · APIs · data with AI · infrastructure",
    file: "Gabriel-Dagostim-CV-en.pdf",
    location: "Cascavel, Paraná — Brazil",
    summaryTitle: "Profile",
    summary:
      "I build frontend and backend (APIs), data analysis with AI, integrations, automations, and infrastructure. I work where product meets operations: internal systems, dashboards, bots, and process improvements people actually use.",
    experienceTitle: "Professional experience",
    educationTitle: "Education",
    skillsTitle: "Skills",
    awardsTitle: "Awards & competitions",
    coursesTitle: "Courses & activities",
    languagesTitle: "Languages",
    contactLabel: "Contact",
    experiences: [
      {
        title: "Infrastructure & Senior Developer",
        org: "Farmácias Estrela",
        period: "Feb 2025 — Present",
        bullets: [
          "Backend APIs, internal web systems, integrations, and automations for network operations.",
          "Data analysis with AI, dashboards, bots, central auth, monitoring, and IT tooling.",
          "Infrastructure organization and process improvement for day-to-day use.",
        ],
      },
      {
        title: "Analyst / Support — Data Center",
        org: "Unioeste",
        period: "Nov 2023 — Feb 2025",
        bullets: [
          "Data center ops: uptime, internal support, and security.",
          "Networking, Active Directory, and institutional environment optimization.",
        ],
      },
      {
        title: "Social Media",
        org: "EletroLimp",
        period: "Jan 2023 — Nov 2023",
        bullets: [
          "Social ops, posting methodology, boosting tools, and marketing CRM.",
          "Visual components for website and system.",
        ],
      },
      {
        title: "UI Freelancer",
        org: "Workana",
        period: "Sep 2022 — Aug 2023",
        bullets: [
          "UI/UX freelancing, copy, and posts; Figma prototyping for clients.",
        ],
      },
    ],
    education: [
      {
        title: "Postgraduate — AI applied to business",
        org: "Centro Universitário Assis Gurgacz (FAG)",
        period: "In progress",
      },
      {
        title: "Software Engineering",
        org: "Centro Universitário Assis Gurgacz (FAG)",
        period: "Completed",
      },
      {
        title: "High School",
        org: "Colégio Eleodoro Ebano Pereira",
        period: "2019",
      },
    ],
    skills: [
      {
        label: "Frontend",
        value: "TypeScript, React, Vite, Next.js, Tailwind CSS, UI/UX, Figma",
      },
      {
        label: "Backend & APIs",
        value: "Node.js, Python, REST, JWT, SQL Server, PostgreSQL, MongoDB",
      },
      {
        label: "Data & AI",
        value: "Advanced SQL, NL→SQL, local LLMs, data joins, reporting",
      },
      {
        label: "Infra & ops",
        value: "Windows Server, AD, Linux, Docker, Coolify, networking, PowerShell",
      },
      {
        label: "Automation",
        value: "Custom bots, integrations, webhooks, jobs, and operational flows",
      },
    ],
    awards: [
      "FAG hackathons — Show Rural Digital (podiums, incl. 3rd place 2024).",
      "Eureka — FEBRACE 2021; Infomatrix Mexico 2020/2021; 3rd Fenecit 2020.",
      "Código Kid — 1y9m electronic device programming and Arduino.",
    ],
    courses: [
      "Electronic programming — Código Kid (1y9m)",
      "Robotics fairs — Eureka",
      "Logic, IT and hardware — Harpa Informática",
      "English — New York School (since Feb/2023)",
      "Intro to Computing — SEST SENAT; Finance management",
    ],
    languages: [
      { name: "Portuguese", level: "Native" },
      { name: "English", level: "Intermediate" },
    ],
  },
}

function drawCv(locale) {
  const data = CONTENT[locale]
  const outPath = path.join(OUT_DIR, data.file)
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 42, bottom: 42, left: 48, right: 48 },
    info: {
      Title: `${CONTACT.name} — CV (${locale})`,
      Author: CONTACT.name,
    },
  })

  doc.registerFont("Body", FONT_REG)
  doc.registerFont("BodyBold", FONT_BOLD)
  doc.registerFont("BodyItalic", FONT_ITALIC)

  const stream = fs.createWriteStream(outPath)
  doc.pipe(stream)

  const left = doc.page.margins.left
  const pageWidth =
    doc.page.width - doc.page.margins.left - doc.page.margins.right
  let y = doc.page.margins.top

  const ensureSpace = (need = 56) => {
    if (y + need > doc.page.height - doc.page.margins.bottom) {
      doc.addPage()
      y = doc.page.margins.top
    }
  }

  const sectionTitle = (title) => {
    ensureSpace(40)
    y += 14
    doc
      .font("BodyBold")
      .fontSize(12)
      .fillColor(COLORS.accent)
      .text(title.toUpperCase(), left, y, {
        width: pageWidth,
        characterSpacing: 0.6,
      })
    y = doc.y + 5
    doc
      .moveTo(left, y)
      .lineTo(left + pageWidth, y)
      .strokeColor(COLORS.line)
      .lineWidth(1)
      .stroke()
    // accent underline
    doc
      .moveTo(left, y)
      .lineTo(left + 42, y)
      .strokeColor(COLORS.accent)
      .lineWidth(2.2)
      .stroke()
    y += 12
  }

  // Accent bar on left of first page header
  doc
    .rect(0, 0, 8, 118)
    .fill(COLORS.accent)

  // Name
  doc
    .font("BodyBold")
    .fontSize(22)
    .fillColor(COLORS.ink)
    .text(CONTACT.name, left, y, { width: pageWidth })
  y = doc.y + 5

  // Role
  doc
    .font("Body")
    .fontSize(11)
    .fillColor(COLORS.inkSoft)
    .text(data.role, left, y, { width: pageWidth })
  y = doc.y + 10

  // Contact strip
  doc.roundedRect(left, y, pageWidth, 36, 6).fill(COLORS.accentSoft)
  doc
    .font("Body")
    .fontSize(8.5)
    .fillColor(COLORS.body)
    .text(
      `${data.location}   ·   ${CONTACT.email}   ·   ${CONTACT.phone}`,
      left + 10,
      y + 7,
      { width: pageWidth - 20, lineGap: 2 },
    )
  doc.text(
    `${CONTACT.linkedin}   ·   ${CONTACT.github}   ·   ${CONTACT.portfolio}`,
    left + 10,
    y + 20,
    { width: pageWidth - 20 },
  )
  y += 48

  // Profile
  sectionTitle(data.summaryTitle)
  doc
    .font("Body")
    .fontSize(10)
    .fillColor(COLORS.body)
    .text(data.summary, left, y, {
      width: pageWidth,
      align: "justify",
      lineGap: 2.5,
    })
  y = doc.y + 2

  // Experience
  sectionTitle(data.experienceTitle)
  for (const job of data.experiences) {
    ensureSpace(78)
    doc
      .font("BodyBold")
      .fontSize(11)
      .fillColor(COLORS.ink)
      .text(job.title, left, y, { width: pageWidth * 0.66 })
    const titleBottom = doc.y
    doc
      .font("BodyBold")
      .fontSize(9)
      .fillColor(COLORS.accent)
      .text(job.period, left + pageWidth * 0.66, y, {
        width: pageWidth * 0.34,
        align: "right",
      })
    y = Math.max(titleBottom, doc.y) + 2
    doc
      .font("BodyItalic")
      .fontSize(9.5)
      .fillColor(COLORS.muted)
      .text(job.org, left, y)
    y = doc.y + 5
    for (const b of job.bullets) {
      ensureSpace(26)
      doc
        .circle(left + 4, y + 5, 1.6)
        .fill(COLORS.accent)
      doc
        .font("Body")
        .fontSize(9.5)
        .fillColor(COLORS.body)
        .text(b, left + 12, y, {
          width: pageWidth - 12,
          lineGap: 1.5,
        })
      y = doc.y + 3
    }
    y += 8
  }

  // Education
  sectionTitle(data.educationTitle)
  for (const edu of data.education) {
    ensureSpace(42)
    doc
      .font("BodyBold")
      .fontSize(10.5)
      .fillColor(COLORS.ink)
      .text(edu.title, left, y, { width: pageWidth * 0.66 })
    const ey = doc.y
    doc
      .font("BodyBold")
      .fontSize(9)
      .fillColor(COLORS.accent)
      .text(edu.period, left + pageWidth * 0.66, y, {
        width: pageWidth * 0.34,
        align: "right",
      })
    y = Math.max(ey, doc.y) + 2
    doc
      .font("Body")
      .fontSize(9.5)
      .fillColor(COLORS.muted)
      .text(edu.org, left, y)
    y = doc.y + 10
  }

  // Skills as labeled rows
  sectionTitle(data.skillsTitle)
  for (const s of data.skills) {
    ensureSpace(28)
    doc
      .font("BodyBold")
      .fontSize(9.5)
      .fillColor(COLORS.ink)
      .text(s.label, left, y, { width: 88, continued: false })
    const labelY = y
    doc
      .font("Body")
      .fontSize(9.5)
      .fillColor(COLORS.body)
      .text(s.value, left + 92, labelY, {
        width: pageWidth - 92,
        lineGap: 1.2,
      })
    y = Math.max(doc.y, labelY + 12) + 5
  }

  // Awards
  sectionTitle(data.awardsTitle)
  for (const a of data.awards) {
    ensureSpace(26)
    doc.circle(left + 4, y + 5, 1.6).fill(COLORS.accent)
    doc
      .font("Body")
      .fontSize(9.5)
      .fillColor(COLORS.body)
      .text(a, left + 12, y, { width: pageWidth - 12, lineGap: 1.4 })
    y = doc.y + 4
  }

  // Courses
  sectionTitle(data.coursesTitle)
  for (const c of data.courses) {
    ensureSpace(24)
    doc.circle(left + 4, y + 5, 1.6).fill(COLORS.accent)
    doc
      .font("Body")
      .fontSize(9.5)
      .fillColor(COLORS.body)
      .text(c, left + 12, y, { width: pageWidth - 12, lineGap: 1.2 })
    y = doc.y + 3
  }

  // Languages chips
  sectionTitle(data.languagesTitle)
  let chipX = left
  const chipY = y
  for (const lang of data.languages) {
    const label = `${lang.name} — ${lang.level}`
    const w = doc.widthOfString(label) + 18
    if (chipX + w > left + pageWidth) break
    doc.roundedRect(chipX, chipY, w, 20, 10).fill(COLORS.chip)
    doc
      .font("Body")
      .fontSize(9)
      .fillColor(COLORS.inkSoft)
      .text(label, chipX + 9, chipY + 5)
    chipX += w + 8
  }

  doc.end()
  return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(outPath))
    stream.on("error", reject)
  })
}

fs.mkdirSync(OUT_DIR, { recursive: true })
Promise.all([drawCv("pt-BR"), drawCv("en")])
  .then((files) => {
    console.log("CV PDFs generated:\n" + files.map((f) => ` - ${f}`).join("\n"))
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
