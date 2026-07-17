/**
 * Gera CVs PT-BR e EN em PDF para o portfólio.
 * Uso: node scripts/generate-cv.cjs
 */
const PDFDocument = require("../app/node_modules/pdfkit")
const fs = require("fs")
const path = require("path")

const OUT_DIR = path.resolve(__dirname, "../app/public/cv")
const FONT_REG = "C:/Windows/Fonts/arial.ttf"
const FONT_BOLD = "C:/Windows/Fonts/arialbd.ttf"
const FONT_ITALIC = "C:/Windows/Fonts/ariali.ttf"

const CONTACT = {
  name: "Gabriel Henrique Dagostim",
  email: "profissional.gabrieldagostim@outlook.com",
  phone: "+55 (45) 98412-7626",
  location: "Cascavel, Paraná — Brasil",
  linkedin: "linkedin.com/in/gabriel-dagostim",
  github: "github.com/gabriel-Dagostim",
  portfolio: "gabrieldagostim.com",
}

const CONTENT = {
  "pt-BR": {
    role: "Infraestrutura, desenvolvimento web e automações",
    file: "Gabriel-Dagostim-CV-pt-BR.pdf",
    location: "Cascavel, Paraná — Brasil",
    summaryTitle: "Perfil profissional",
    summary:
      "Desenvolvo sistemas web, integrações, automações e organização de infraestrutura com foco em facilitar a vida de operadores e usuários finais. Atuo na interseção entre desenvolvimento e operação: painéis, bots, auth, monitoramento e melhorias de processo em produção.",
    experienceTitle: "Experiência",
    educationTitle: "Formação",
    skillsTitle: "Competências técnicas",
    awardsTitle: "Premiações e competições",
    coursesTitle: "Cursos e atividades complementares",
    languagesTitle: "Idiomas",
    experiences: [
      {
        title: "Infraestrutura & Desenvolvedor Sênior",
        org: "Farmácias Estrela",
        period: "Fev 2025 — Atual",
        bullets: [
          "Desenvolvimento de sistemas internos web, integrações e automações para a operação da rede.",
          "Criação de painéis, bots, autenticação centralizada, monitoramento e ferramentas de TI.",
          "Organização estrutural de infra e melhoria de processos com foco em uso real no dia a dia.",
        ],
      },
      {
        title: "Analista / Suporte a usuários — Datacenter",
        org: "Unioeste",
        period: "Nov 2023 — Fev 2025",
        bullets: [
          "Operação de datacenter: disponibilidade de sistemas, suporte técnico interno e segurança.",
          "Trabalho com redes, Active Directory e otimização do ambiente institucional.",
          "Base prática de infraestrutura que sustenta o trabalho atual em sistemas e automação.",
        ],
      },
      {
        title: "UI Freelancer",
        org: "Workana",
        period: "Set 2022 — Ago 2023",
        bullets: [
          "Prototipação e interfaces em Figma para projetos de clientes.",
          "Experiência prática em UI/UX aplicada a produtos digitais.",
        ],
      },
      {
        title: "Social Media",
        org: "EletroLimp",
        period: "Abr 2023 — Set 2023",
        bullets: [
          "Gestão de contas digitais e produção regular de conteúdo.",
        ],
      },
    ],
    education: [
      {
        title: "Pós-graduação — IA aplicada a negócios",
        org: "Centro Universitário Assis Gurgacz (FAG)",
        period: "Pós-graduação",
      },
      {
        title: "Engenharia de Software",
        org: "Centro Universitário Assis Gurgacz (FAG)",
        period: "Concluído",
      },
      {
        title: "Ensino Médio",
        org: "Colégio Eleodoro Ebano Pereira",
        period: "Concluído em 2019",
      },
    ],
    skills: [
      "Frontend: TypeScript, React, Vite, Next.js, Tailwind CSS, UI/UX, Figma",
      "Backend: Node.js, Python, REST APIs, JWT, SQL Server, PostgreSQL, MongoDB",
      "Infra: Windows Server, Active Directory, Linux, Docker, redes, PowerShell",
      "Automação & IA: bots customizados, integrações, NL→SQL, estrutura de conhecimento para LLMs locais",
    ],
    awards: [
      "Hackathon Show Rural Digital — pódios consecutivos (incluindo 3º lugar em 2024 e participação em 2023).",
      "Credencial FEBRACE 2021.",
      "Infomatrix 2020 — credencial para feira no México; Infomatrix Guadalajara-México 2021.",
      "3º lugar Fenecit 2020; participações em FETEC-SP e Ciência Jovem.",
      "Pesquisa/iniciação científica (Código Kid + Eureka) com protótipos eletrônicos e prêmios em feiras.",
    ],
    courses: [
      "Robótica e eletrônica básica — Eureka / Código Kid",
      "Lógica de programação, informática e hardware — Harpa Informática",
      "Inglês — New York School (desde fev/2023)",
      "Introdução à Informática — SEST SENAT (EAD); Gestão de finanças",
    ],
    languages: ["Português — nativo", "Inglês — intermediário"],
  },
  en: {
    role: "Infrastructure, web development & automation",
    file: "Gabriel-Dagostim-CV-en.pdf",
    location: "Cascavel, Paraná — Brazil",
    summaryTitle: "Professional profile",
    summary:
      "I build web systems, integrations, automations, and infrastructure organization focused on making life easier for operators and end users. I work where development meets operations: dashboards, bots, auth, monitoring, and process improvements in production.",
    experienceTitle: "Experience",
    educationTitle: "Education",
    skillsTitle: "Technical skills",
    awardsTitle: "Awards & competitions",
    coursesTitle: "Courses & complementary activities",
    languagesTitle: "Languages",
    experiences: [
      {
        title: "Infrastructure & Senior Developer",
        org: "Farmácias Estrela",
        period: "Feb 2025 — Present",
        bullets: [
          "Building internal web systems, integrations, and automations for network operations.",
          "Dashboards, bots, centralized authentication, monitoring, and IT tooling.",
          "Infrastructure organization and process improvement focused on real day-to-day use.",
        ],
      },
      {
        title: "Analyst / User Support — Data Center",
        org: "Unioeste",
        period: "Nov 2023 — Feb 2025",
        bullets: [
          "Data center operations: system uptime, internal technical support, and security.",
          "Networking, Active Directory, and institutional environment optimization.",
          "Hands-on infrastructure foundation that supports current systems and automation work.",
        ],
      },
      {
        title: "UI Freelancer",
        org: "Workana",
        period: "Sep 2022 — Aug 2023",
        bullets: [
          "Figma prototyping and interfaces for client projects.",
          "Practical UI/UX experience applied to digital products.",
        ],
      },
      {
        title: "Social Media",
        org: "EletroLimp",
        period: "Apr 2023 — Sep 2023",
        bullets: [
          "Digital account management and regular content production.",
        ],
      },
    ],
    education: [
      {
        title: "Postgraduate — AI applied to business",
        org: "Centro Universitário Assis Gurgacz (FAG)",
        period: "Postgraduate",
      },
      {
        title: "Software Engineering",
        org: "Centro Universitário Assis Gurgacz (FAG)",
        period: "Completed",
      },
      {
        title: "High School",
        org: "Colégio Eleodoro Ebano Pereira",
        period: "Completed in 2019",
      },
    ],
    skills: [
      "Frontend: TypeScript, React, Vite, Next.js, Tailwind CSS, UI/UX, Figma",
      "Backend: Node.js, Python, REST APIs, JWT, SQL Server, PostgreSQL, MongoDB",
      "Infra: Windows Server, Active Directory, Linux, Docker, networking, PowerShell",
      "Automation & AI: custom bots, integrations, NL→SQL, knowledge structures for local LLMs",
    ],
    awards: [
      "Show Rural Digital Hackathon — consecutive podiums (including 3rd place in 2024 and 2023 participation).",
      "FEBRACE 2021 credential.",
      "Infomatrix 2020 — credential for Mexico fair; Infomatrix Guadalajara-Mexico 2021.",
      "3rd place Fenecit 2020; FETEC-SP and Ciência Jovem participations.",
      "Undergraduate research (Código Kid + Eureka) with electronic prototypes and fair awards.",
    ],
    courses: [
      "Robotics and basic electronics — Eureka / Código Kid",
      "Programming logic, IT and hardware — Harpa Informática",
      "English — New York School (since Feb/2023)",
      "Introduction to Computing — SEST SENAT (online); Finance management",
    ],
    languages: ["Portuguese — native", "English — intermediate"],
  },
}

function drawCv(locale) {
  const data = CONTENT[locale]
  const outPath = path.join(OUT_DIR, data.file)
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 48, bottom: 48, left: 52, right: 52 },
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

  const pageWidth =
    doc.page.width - doc.page.margins.left - doc.page.margins.right
  let y = doc.page.margins.top

  const ensureSpace = (need = 60) => {
    if (y + need > doc.page.height - doc.page.margins.bottom) {
      doc.addPage()
      y = doc.page.margins.top
    }
  }

  const section = (title) => {
    ensureSpace(36)
    y += 10
    doc
      .font("BodyBold")
      .fontSize(11)
      .fillColor("#111827")
      .text(title.toUpperCase(), doc.page.margins.left, y)
    y = doc.y + 4
    doc
      .moveTo(doc.page.margins.left, y)
      .lineTo(doc.page.margins.left + pageWidth, y)
      .strokeColor("#d1d5db")
      .lineWidth(1)
      .stroke()
    y += 10
  }

  doc
    .font("BodyBold")
    .fontSize(20)
    .fillColor("#0f172a")
    .text(CONTACT.name, doc.page.margins.left, y, { width: pageWidth })
  y = doc.y + 4
  doc
    .font("Body")
    .fontSize(11)
    .fillColor("#334155")
    .text(data.role, { width: pageWidth })
  y = doc.y + 8
  doc
    .fontSize(9)
    .fillColor("#475569")
    .text(
      [
        data.location,
        CONTACT.email,
        CONTACT.phone,
        CONTACT.linkedin,
        CONTACT.github,
        CONTACT.portfolio,
      ].join("  ·  "),
      { width: pageWidth, lineGap: 2 },
    )
  y = doc.y + 6

  section(data.summaryTitle)
  doc
    .font("Body")
    .fontSize(9.5)
    .fillColor("#1f2937")
    .text(data.summary, doc.page.margins.left, y, {
      width: pageWidth,
      align: "justify",
      lineGap: 1.5,
    })
  y = doc.y + 4

  section(data.experienceTitle)
  for (const job of data.experiences) {
    ensureSpace(70)
    doc
      .font("BodyBold")
      .fontSize(10)
      .fillColor("#0f172a")
      .text(job.title, doc.page.margins.left, y, {
        width: pageWidth * 0.68,
      })
    const titleY = doc.y
    doc
      .font("Body")
      .fontSize(9)
      .fillColor("#64748b")
      .text(job.period, doc.page.margins.left + pageWidth * 0.68, y, {
        width: pageWidth * 0.32,
        align: "right",
      })
    y = Math.max(titleY, doc.y) + 1
    doc
      .font("BodyItalic")
      .fontSize(9)
      .fillColor("#334155")
      .text(job.org, doc.page.margins.left, y)
    y = doc.y + 3
    doc.font("Body").fontSize(9).fillColor("#1f2937")
    for (const b of job.bullets) {
      ensureSpace(28)
      doc.text(`•  ${b}`, doc.page.margins.left + 4, y, {
        width: pageWidth - 8,
        lineGap: 1,
      })
      y = doc.y + 2
    }
    y += 6
  }

  section(data.educationTitle)
  for (const edu of data.education) {
    ensureSpace(40)
    doc
      .font("BodyBold")
      .fontSize(10)
      .fillColor("#0f172a")
      .text(edu.title, doc.page.margins.left, y, { width: pageWidth * 0.68 })
    const ey = doc.y
    doc
      .font("Body")
      .fontSize(9)
      .fillColor("#64748b")
      .text(edu.period, doc.page.margins.left + pageWidth * 0.68, y, {
        width: pageWidth * 0.32,
        align: "right",
      })
    y = Math.max(ey, doc.y) + 1
    doc
      .font("Body")
      .fontSize(9)
      .fillColor("#334155")
      .text(edu.org, doc.page.margins.left, y)
    y = doc.y + 8
  }

  section(data.skillsTitle)
  doc.font("Body").fontSize(9).fillColor("#1f2937")
  for (const s of data.skills) {
    ensureSpace(24)
    doc.text(`•  ${s}`, doc.page.margins.left + 4, y, {
      width: pageWidth - 8,
      lineGap: 1,
    })
    y = doc.y + 2
  }

  section(data.awardsTitle)
  for (const a of data.awards) {
    ensureSpace(28)
    doc.text(`•  ${a}`, doc.page.margins.left + 4, y, {
      width: pageWidth - 8,
      lineGap: 1,
    })
    y = doc.y + 2
  }

  section(data.coursesTitle)
  for (const c of data.courses) {
    ensureSpace(24)
    doc.text(`•  ${c}`, doc.page.margins.left + 4, y, {
      width: pageWidth - 8,
      lineGap: 1,
    })
    y = doc.y + 2
  }

  section(data.languagesTitle)
  doc
    .font("Body")
    .fontSize(9)
    .fillColor("#1f2937")
    .text(data.languages.join("  ·  "), doc.page.margins.left, y, {
      width: pageWidth,
    })

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
