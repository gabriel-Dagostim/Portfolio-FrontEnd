/**
 * Résumé content, one entry per language. Kept beside the generator rather
 * than imported from the app so the PDFs can be built without a bundler.
 */

export const CONTACT = {
  name: "Gabriel Henrique Dagostim",
  email: "profissional.gabrieldagostim@outlook.com",
  phone: "+55 45 98412-7626",
  linkedin: "linkedin.com/in/gabriel-dagostim",
  github: "github.com/gabriel-Dagostim",
  portfolio: "gabrieldagostim.com",
}

const SHARED_SKILLS = {
  backend: "Node.js, Python, REST, JWT, SQL Server, PostgreSQL, MongoDB, MinIO",
  frontend: "TypeScript, React, Vite, Next.js, Tailwind CSS, shadcn/ui, i18next",
  dataEn: "Advanced SQL, natural language to SQL, LLMs, knowledge graphs, reporting",
  dataPt: "SQL avançado, linguagem natural para SQL, LLMs, grafos de conhecimento, relatórios",
  dataEs: "SQL avanzado, lenguaje natural a SQL, LLMs, grafos de conocimiento, informes",
  infra: "Windows Server, Active Directory, Linux, Docker, Coolify, Nginx, PowerShell",
  automationEn: "n8n, Telegram bots, Playwright scrapers, webhooks, scheduled jobs, CLI installers",
  automationPt: "n8n, bots de Telegram, scrapers Playwright, webhooks, rotinas agendadas, instaladores CLI",
  automationEs: "n8n, bots de Telegram, scrapers Playwright, webhooks, tareas programadas, instaladores CLI",
}

export const CV = {
  en: {
    file: "Gabriel-Dagostim-CV-en.pdf",
    htmlLang: "en",
    role: "Infrastructure and full-stack developer",
    location: "Cascavel, Paraná, Brazil",
    labels: {
      profile: "Profile",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      selected: "Selected systems",
      awards: "Awards and competitions",
      languages: "Languages",
      contact: "Contact",
    },
    profile:
      "I build the internal software a retail network of dozens of branches runs on: backend APIs, monitoring command centres, centralised access control, data pipelines, and bots that answer operational questions in plain language. I start from the process and the person doing it, find the bottleneck, and ship something that survives a real shift.",
    experience: [
      {
        title: "Infrastructure and senior developer",
        org: "Farmácias Estrela",
        period: "Feb 2025 to Present",
        bullets: [
          "Built Nexus, the network's command centre: near real-time branch telemetry, browser SSH, gated remote actions, and a Telegram bot that mirrors both.",
          "Designed and shipped Farmácia Auth, centralised roles, permissions, JWT API, and an audit trail, now covering roughly 70% of the network.",
          "Automated the e-commerce image pipeline end to end: ERP gap detection, barcode scrapers, an approval queue, a MinIO catalogue, and automatic publishing.",
          "Built a natural-language-to-SQL assistant over the ERP, modelling the database as a linked-note knowledge graph so the team queries it from Telegram.",
        ],
      },
      {
        title: "Analyst and support, Data Centre",
        org: "Unioeste",
        period: "Nov 2023 to Feb 2025",
        bullets: [
          "Kept institutional systems available: uptime, incident response, and technical support for internal users.",
          "Networking, Active Directory, and continuous work on the university's server environment.",
        ],
      },
      {
        title: "Social media",
        org: "EletroLimp",
        period: "Jan 2023 to Nov 2023",
        bullets: [
          "Ran the brand's content operation: posting methodology, paid boosting, and the marketing CRM.",
          "Produced the visual components that went into the company's website and internal system.",
        ],
      },
      {
        title: "UI freelancer",
        org: "Workana",
        period: "Sep 2022 to Aug 2023",
        bullets: [
          "UI and UX freelancing for clients: Figma prototypes, interfaces, and supporting copy.",
        ],
      },
    ],
    education: [
      {
        title: "Postgraduate in AI Applied to Business",
        org: "Centro Universitário Assis Gurgacz (FAG)",
        period: "In progress",
      },
      {
        title: "Software engineering",
        org: "Centro Universitário Assis Gurgacz (FAG)",
        period: "Completed",
      },
      {
        title: "Programming electronic devices",
        org: "Código Kid",
        period: "1 year 9 months",
      },
      {
        title: "High school",
        org: "Colégio Eleodoro Ébano Pereira",
        period: "Completed 2019",
      },
    ],
    skills: [
      { label: "Backend and APIs", value: SHARED_SKILLS.backend },
      { label: "Frontend", value: SHARED_SKILLS.frontend },
      { label: "Data and AI", value: SHARED_SKILLS.dataEn },
      { label: "Infrastructure", value: SHARED_SKILLS.infra },
      { label: "Automation", value: SHARED_SKILLS.automationEn },
    ],
    selected: [
      {
        name: "Nexus Estrela",
        note: "Infrastructure command centre with browser SSH and a Telegram operator bot.",
      },
      {
        name: "Farmácia Auth",
        note: "Centralised roles, permissions, and audited access for internal systems.",
      },
      {
        name: "E-commerce image pipeline",
        note: "Barcode-driven scraping, approval queue, and automatic publishing.",
      },
      {
        name: "DBA specialist bot",
        note: "Natural-language questions answered as SQL, lists, or spreadsheets.",
      },
    ],
    awards: [
      "FAG hackathons, podium finishes at Show Rural Digital, including third place in 2024.",
      "Eureka robotics fairs, FEBRACE 2021, Infomatrix (Mexico), third place at Fenecit 2020, FETEC-SP.",
    ],
    languages: [
      { name: "Portuguese", level: "Native" },
      { name: "English", level: "Intermediate, New York School" },
    ],
  },

  "pt-BR": {
    file: "Gabriel-Dagostim-CV-pt-BR.pdf",
    htmlLang: "pt-BR",
    role: "Desenvolvedor full stack e de infraestrutura",
    location: "Cascavel, Paraná, Brasil",
    labels: {
      profile: "Perfil",
      experience: "Experiência",
      education: "Formação",
      skills: "Competências",
      selected: "Sistemas selecionados",
      awards: "Premiações e competições",
      languages: "Idiomas",
      contact: "Contato",
    },
    profile:
      "Construo o software interno em que uma rede de varejo com dezenas de filiais roda: APIs de backend, centros de comando de monitoramento, controle de acesso centralizado, pipelines de dados e bots que respondem perguntas operacionais em linguagem comum. Começo pelo processo e por quem executa ele, acho o gargalo e entrego algo que sobrevive a um turno real.",
    experience: [
      {
        title: "Infraestrutura e desenvolvedor sênior",
        org: "Farmácias Estrela",
        period: "Fev 2025 até o momento",
        bullets: [
          "Construí o Nexus, centro de comando da rede: telemetria quase em tempo real das filiais, SSH pelo navegador, ações remotas confirmadas e um bot Telegram que espelha tudo.",
          "Concebi e entreguei o Farmácia Auth, com cargos, permissões, API JWT e trilha de auditoria centralizados, hoje cobrindo cerca de 70% da rede.",
          "Automatizei o pipeline de imagens do e-commerce de ponta a ponta: detecção de lacunas no ERP, scrapers por EAN, fila de aprovação, catálogo MinIO e publicação automática.",
          "Criei um assistente de linguagem natural para SQL sobre o ERP, modelando o banco como um grafo de notas linkadas para o time consultar pelo Telegram.",
        ],
      },
      {
        title: "Analista e suporte, Datacenter",
        org: "Unioeste",
        period: "Nov 2023 a fev 2025",
        bullets: [
          "Mantive os sistemas institucionais disponíveis: uptime, resposta a incidentes e suporte técnico aos usuários internos.",
          "Redes, Active Directory e trabalho contínuo no ambiente de servidores da universidade.",
        ],
      },
      {
        title: "Social media",
        org: "EletroLimp",
        period: "Jan 2023 a nov 2023",
        bullets: [
          "Toquei a operação de conteúdo da marca: metodologia de posts, impulsionamento e o CRM de marketing.",
          "Produzi os componentes visuais que foram para o site e o sistema interno da empresa.",
        ],
      },
      {
        title: "Freelancer de UI",
        org: "Workana",
        period: "Set 2022 a ago 2023",
        bullets: [
          "Freelas de UI e UX para clientes: protótipos em Figma, interfaces e textos de apoio.",
        ],
      },
    ],
    education: [
      {
        title: "Pós-graduação em IA aplicada a negócios",
        org: "Centro Universitário Assis Gurgacz (FAG)",
        period: "Cursando",
      },
      {
        title: "Engenharia de software",
        org: "Centro Universitário Assis Gurgacz (FAG)",
        period: "Concluído",
      },
      {
        title: "Programação de dispositivos eletrônicos",
        org: "Código Kid",
        period: "1 ano e 9 meses",
      },
      {
        title: "Ensino médio",
        org: "Colégio Eleodoro Ébano Pereira",
        period: "Concluído em 2019",
      },
    ],
    skills: [
      { label: "Backend e APIs", value: SHARED_SKILLS.backend },
      { label: "Frontend", value: SHARED_SKILLS.frontend },
      { label: "Dados e IA", value: SHARED_SKILLS.dataPt },
      { label: "Infraestrutura", value: SHARED_SKILLS.infra },
      { label: "Automação", value: SHARED_SKILLS.automationPt },
    ],
    selected: [
      {
        name: "Nexus Estrela",
        note: "Centro de comando de infraestrutura com SSH pelo navegador e bot de operação no Telegram.",
      },
      {
        name: "Farmácia Auth",
        note: "Cargos, permissões e acesso auditado centralizados para os sistemas internos.",
      },
      {
        name: "Pipeline de imagens do e-commerce",
        note: "Busca por EAN, fila de aprovação e publicação automática.",
      },
      {
        name: "Bot especialista em DBA",
        note: "Perguntas em linguagem natural respondidas em SQL, listas ou planilhas.",
      },
    ],
    awards: [
      "Hackathons da FAG, pódios no Show Rural Digital, incluindo 3º lugar em 2024.",
      "Feiras de robótica Eureka, FEBRACE 2021, Infomatrix (México), 3º lugar no Fenecit 2020, FETEC-SP.",
    ],
    languages: [
      { name: "Português", level: "Nativo" },
      { name: "Inglês", level: "Intermediário, New York School" },
    ],
  },

  es: {
    file: "Gabriel-Dagostim-CV-es.pdf",
    htmlLang: "es",
    role: "Desarrollador full stack y de infraestructura",
    location: "Cascavel, Paraná, Brasil",
    labels: {
      profile: "Perfil",
      experience: "Experiencia",
      education: "Formación",
      skills: "Competencias",
      selected: "Sistemas seleccionados",
      awards: "Premios y competencias",
      languages: "Idiomas",
      contact: "Contacto",
    },
    profile:
      "Construyo el software interno sobre el que funciona una red minorista con decenas de sucursales: APIs de backend, centros de mando de monitoreo, control de acceso centralizado, pipelines de datos y bots que responden preguntas operativas en lenguaje común. Empiezo por el proceso y por quien lo ejecuta, encuentro el cuello de botella y entrego algo que sobrevive a un turno real.",
    experience: [
      {
        title: "Infraestructura y desarrollador sénior",
        org: "Farmácias Estrela",
        period: "Feb 2025 hasta la fecha",
        bullets: [
          "Construí Nexus, el centro de mando de la red: telemetría casi en tiempo real de las sucursales, SSH desde el navegador, acciones remotas confirmadas y un bot de Telegram que lo replica.",
          "Diseñé y entregué Farmácia Auth, con cargos, permisos, API JWT y rastro de auditoría centralizados, hoy cubriendo cerca del 70% de la red.",
          "Automaticé el pipeline de imágenes del e-commerce de punta a punta: detección de huecos en el ERP, scrapers por código de barras, cola de aprobación, catálogo MinIO y publicación automática.",
          "Creé un asistente de lenguaje natural a SQL sobre el ERP, modelando la base como un grafo de notas enlazadas para que el equipo la consulte desde Telegram.",
        ],
      },
      {
        title: "Analista y soporte, Centro de Datos",
        org: "Unioeste",
        period: "Nov 2023 a feb 2025",
        bullets: [
          "Mantuve disponibles los sistemas institucionales: uptime, respuesta a incidentes y soporte técnico a usuarios internos.",
          "Redes, Active Directory y trabajo continuo en el entorno de servidores de la universidad.",
        ],
      },
      {
        title: "Social media",
        org: "EletroLimp",
        period: "Ene 2023 a nov 2023",
        bullets: [
          "Llevé la operación de contenido de la marca: metodología de publicación, impulso pagado y el CRM de marketing.",
          "Produje los componentes visuales que se usaron en el sitio y el sistema interno de la empresa.",
        ],
      },
      {
        title: "Freelance de UI",
        org: "Workana",
        period: "Sep 2022 a ago 2023",
        bullets: [
          "Trabajos freelance de UI y UX para clientes: prototipos en Figma, interfaces y textos de apoyo.",
        ],
      },
    ],
    education: [
      {
        title: "Posgrado en IA aplicada a negocios",
        org: "Centro Universitário Assis Gurgacz (FAG)",
        period: "En curso",
      },
      {
        title: "Ingeniería de software",
        org: "Centro Universitário Assis Gurgacz (FAG)",
        period: "Concluido",
      },
      {
        title: "Programación de dispositivos electrónicos",
        org: "Código Kid",
        period: "1 año y 9 meses",
      },
      {
        title: "Bachillerato",
        org: "Colégio Eleodoro Ébano Pereira",
        period: "Concluido en 2019",
      },
    ],
    skills: [
      { label: "Backend y APIs", value: SHARED_SKILLS.backend },
      { label: "Frontend", value: SHARED_SKILLS.frontend },
      { label: "Datos e IA", value: SHARED_SKILLS.dataEs },
      { label: "Infraestructura", value: SHARED_SKILLS.infra },
      { label: "Automatización", value: SHARED_SKILLS.automationEs },
    ],
    selected: [
      {
        name: "Nexus Estrela",
        note: "Centro de mando de infraestructura con SSH por navegador y bot operativo en Telegram.",
      },
      {
        name: "Farmácia Auth",
        note: "Cargos, permisos y acceso auditado centralizados para los sistemas internos.",
      },
      {
        name: "Pipeline de imágenes del e-commerce",
        note: "Búsqueda por código de barras, cola de aprobación y publicación automática.",
      },
      {
        name: "Bot especialista en DBA",
        note: "Preguntas en lenguaje natural respondidas en SQL, listas u hojas de cálculo.",
      },
    ],
    awards: [
      "Hackatones de FAG, podios en Show Rural Digital, incluido el tercer lugar en 2024.",
      "Ferias de robótica Eureka, FEBRACE 2021, Infomatrix (México), tercer lugar en Fenecit 2020, FETEC-SP.",
    ],
    languages: [
      { name: "Portugués", level: "Nativo" },
      { name: "Inglés", level: "Intermedio, New York School" },
    ],
  },
}
