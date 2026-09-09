import type { SiteContent, SiteSettings } from "@/types"

export const INITIAL_SETTINGS: SiteSettings = {
  defaultLocale: "en",
  defaultTheme: "system",
  featuredProjectId: "proj-nexus-estrela",
  homeFeaturedIds: [
    "proj-nexus-estrela",
    "proj-imagens-ecommerce",
    "proj-dba-bot",
    "proj-farmacia-auth",
    "proj-feirao",
    "proj-legacy-debutante",
  ],
}

export const SEED_CONTENT: SiteContent = {
  profile: {
    fullName: "Gabriel Henrique Dagostim",
    shortName: "Gabriel Dagostim",
    birthDate: "2003-02-20",
    location: {
      en: "Cascavel, Paraná — Brazil",
      pt: "Cascavel, Paraná — Brasil",
      es: "Cascavel, Paraná — Brasil",
    },
    role: {
      en: "Infrastructure and full-stack developer",
      pt: "Desenvolvedor full stack e de infraestrutura",
      es: "Desarrollador full stack y de infraestructura",
    },
    headline: {
      en: "I build the systems a pharmacy network runs on.",
      pt: "Eu construo os sistemas em que uma rede de farmácias roda.",
      es: "Construyo los sistemas sobre los que funciona una red de farmacias.",
    },
    summary: {
      en: "Command centres, access control, expiry tracking, image pipelines, and bots that answer questions about the database — built for the people who use them every shift, not for a demo.",
      pt: "Centros de comando, controle de acesso, gestão de validade, pipelines de imagem e bots que respondem sobre o banco — feitos para quem usa todo turno, não para uma demo.",
      es: "Centros de mando, control de acceso, gestión de vencimientos, pipelines de imágenes y bots que responden sobre la base de datos — hechos para quienes los usan cada turno, no para una demo.",
    },
    photoUrl: "/profile/perfil.png",
  },

  contact: {
    email: "profissional.gabrieldagostim@outlook.com",
    phoneDisplay: "+55 45 98412-7626",
    whatsappE164: "5545984127626",
    linkedinUrl: "https://www.linkedin.com/in/gabriel-dagostim/",
    githubUrl: "https://github.com/gabriel-Dagostim",
    portfolioUrl: "https://gabrieldagostim.com",
  },

  status: [
    {
      id: "st-role",
      label: { en: "Role", pt: "Cargo", es: "Puesto" },
      value: {
        en: "Infrastructure and senior developer, Farmácias Estrela",
        pt: "Infraestrutura e desenvolvedor sênior, Farmácias Estrela",
        es: "Infraestructura y desarrollador sénior, Farmácias Estrela",
      },
      state: "live",
    },
    {
      id: "st-focus",
      label: { en: "Focus", pt: "Foco", es: "Enfoque" },
      value: {
        en: "Backend APIs, operational data with AI, infrastructure",
        pt: "APIs de backend, dados operacionais com IA, infraestrutura",
        es: "APIs de backend, datos operativos con IA, infraestructura",
      },
      state: "live",
    },
    {
      id: "st-building",
      label: { en: "Building", pt: "Construindo", es: "Construyendo" },
      value: {
        en: "n8n flows for finance and tax routines",
        pt: "Fluxos n8n para rotinas financeiras e fiscais",
        es: "Flujos n8n para rutinas financieras y fiscales",
      },
      state: "building",
    },
    {
      id: "st-shipped",
      label: { en: "In production", pt: "Em produção", es: "En producción" },
      value: {
        en: "Nexus, Auth, and the e-commerce image pipeline",
        pt: "Nexus, Auth e o pipeline de imagens do e-commerce",
        es: "Nexus, Auth y el pipeline de imágenes del e-commerce",
      },
      state: "shipped",
    },
    {
      id: "st-base",
      label: { en: "Based in", pt: "Base", es: "Base" },
      value: {
        en: "Cascavel, Paraná — Brazil",
        pt: "Cascavel, Paraná — Brasil",
        es: "Cascavel, Paraná — Brasil",
      },
      state: "shipped",
    },
  ],

  career: [
    {
      id: "car-pos",
      kind: "education",
      org: "Centro Universitário Assis Gurgacz (FAG)",
      logoUrl: "/profile/fag.jpg",
      logoFit: "contain",
      startYear: 2025,
      period: { en: "In progress", pt: "Cursando", es: "En curso" },
      title: {
        en: "Postgraduate — AI applied to business",
        pt: "Pós-graduação — IA aplicada a negócios",
        es: "Posgrado — IA aplicada a negocios",
      },
      body: {
        en: "Studying how artificial intelligence lands in real business processes and operational decisions — which is the same question my current work keeps asking.",
        pt: "Estudando como a inteligência artificial entra em processos de negócio e decisões operacionais reais — a mesma pergunta que o trabalho atual não para de fazer.",
        es: "Estudiando cómo la inteligencia artificial entra en procesos de negocio y decisiones operativas reales — la misma pregunta que mi trabajo actual no deja de hacer.",
      },
      tags: [
        { en: "Postgraduate", pt: "Pós-graduação", es: "Posgrado" },
        { en: "AI and business", pt: "IA e negócios", es: "IA y negocios" },
      ],
      current: true,
    },
    {
      id: "car-estrela",
      kind: "work",
      org: "Farmácias Estrela",
      logoUrl: "/profile/estrela.png",
      logoFit: "contain",
      startYear: 2025,
      period: {
        en: "Feb 2025 — present",
        pt: "Fev 2025 — atual",
        es: "Feb 2025 — actual",
      },
      title: {
        en: "Infrastructure and senior developer",
        pt: "Infraestrutura e desenvolvedor sênior",
        es: "Infraestructura y desarrollador sénior",
      },
      body: {
        en: "APIs and backends, integrations, data analysis with AI, automations, and the internal systems the network runs on — the Feirão board, expiry control, Nexus, Auth, the e-commerce image pipeline, the DBA bot, and the IT installer.",
        pt: "APIs e backends, integrações, análise de dados com IA, automações e os sistemas internos em que a rede roda — o painel do Feirão, a gestão de validade, o Nexus, o Auth, o pipeline de imagens do e-commerce, o bot de DBA e o instalador de TI.",
        es: "APIs y backends, integraciones, análisis de datos con IA, automatizaciones y los sistemas internos sobre los que funciona la red — el tablero del Feirão, el control de vencimientos, Nexus, Auth, el pipeline de imágenes del e-commerce, el bot de DBA y el instalador de TI.",
      },
      tags: [
        { en: "Infrastructure", pt: "Infraestrutura", es: "Infraestructura" },
        { en: "Development", pt: "Desenvolvimento", es: "Desarrollo" },
        { en: "Integrations", pt: "Integrações", es: "Integraciones" },
        { en: "Automation", pt: "Automação", es: "Automatización" },
      ],
      current: true,
    },
    {
      id: "car-unioeste",
      kind: "work",
      org: "Unioeste",
      logoUrl: "/profile/unioeste.png",
      logoFit: "cover",
      startYear: 2023,
      period: {
        en: "Nov 2023 — Feb 2025",
        pt: "Nov 2023 — Fev 2025",
        es: "Nov 2023 — Feb 2025",
      },
      title: {
        en: "Analyst and support — data centre",
        pt: "Analista e suporte — datacenter",
        es: "Analista y soporte — centro de datos",
      },
      body: {
        en: "Keeping the university's systems up: technical support for internal users, networking, Active Directory, and steady work on the institutional environment.",
        pt: "Manter os sistemas da universidade de pé: suporte técnico aos usuários internos, redes, Active Directory e trabalho contínuo no ambiente institucional.",
        es: "Mantener en pie los sistemas de la universidad: soporte técnico a usuarios internos, redes, Active Directory y trabajo continuo en el entorno institucional.",
      },
      tags: [
        { en: "Networking", pt: "Redes", es: "Redes" },
        { en: "Active Directory", pt: "Active Directory", es: "Active Directory" },
        { en: "Data centre", pt: "Datacenter", es: "Centro de datos" },
      ],
    },
    {
      id: "car-eletrolimp",
      kind: "work",
      org: "EletroLimp",
      logoUrl: "/profile/eletrolimp.jpeg",
      logoFit: "cover",
      startYear: 2023,
      period: {
        en: "Jan 2023 — Nov 2023",
        pt: "Jan 2023 — Nov 2023",
        es: "Ene 2023 — Nov 2023",
      },
      title: { en: "Social media", pt: "Social media", es: "Social media" },
      body: {
        en: "Running the brand's content: posting methodology, colour work, boosting tools and the marketing CRM, plus the visual components that ended up in the website and the system.",
        pt: "Tocando o conteúdo da marca: metodologia de posts, estudo de cor, ferramentas de impulsionamento e o CRM de marketing, além dos componentes visuais que foram parar no site e no sistema.",
        es: "Llevando el contenido de la marca: metodología de publicación, estudio de color, herramientas de impulso y el CRM de marketing, más los componentes visuales que acabaron en el sitio y el sistema.",
      },
      tags: [
        { en: "Content", pt: "Conteúdo", es: "Contenido" },
        { en: "Marketing CRM", pt: "CRM de marketing", es: "CRM de marketing" },
        { en: "Visual design", pt: "Design visual", es: "Diseño visual" },
      ],
    },
    {
      id: "car-workana",
      kind: "work",
      org: "Workana",
      logoUrl: "/profile/workana.jpeg",
      logoFit: "cover",
      startYear: 2022,
      period: {
        en: "Sep 2022 — Aug 2023",
        pt: "Set 2022 — Ago 2023",
        es: "Sep 2022 — Ago 2023",
      },
      title: {
        en: "UI freelancer",
        pt: "Freelancer de UI",
        es: "Freelance de UI",
      },
      body: {
        en: "The first paid work: UI and UX freelancing, copy, and posts — Figma prototypes and interfaces for clients, and the first real sense of what shipping a digital product costs.",
        pt: "O primeiro trabalho pago: freelas de UI e UX, textos e posts — protótipos em Figma e interfaces para clientes, e a primeira noção real do que custa entregar um produto digital.",
        es: "El primer trabajo pago: freelance de UI y UX, textos y publicaciones — prototipos en Figma e interfaces para clientes, y la primera noción real de lo que cuesta entregar un producto digital.",
      },
      tags: [
        { en: "UI/UX", pt: "UI/UX", es: "UI/UX" },
        { en: "Figma", pt: "Figma", es: "Figma" },
      ],
    },
    {
      id: "car-hackathons",
      kind: "education",
      org: "Centro Universitário Assis Gurgacz (FAG)",
      logoUrl: "/profile/fag.jpg",
      logoFit: "contain",
      startYear: 2022,
      period: { en: "2022 — 2024", pt: "2022 — 2024", es: "2022 — 2024" },
      title: {
        en: "Hackathons and timed development",
        pt: "Hackathons e desenvolvimento cronometrado",
        es: "Hackatones y desarrollo cronometrado",
      },
      body: {
        en: "Competitions through FAG, including podium finishes at the Show Rural Digital hackathon — building something defensible against a clock, with other people.",
        pt: "Competições pela FAG, com pódios no hackathon do Show Rural Digital — construir algo defensável contra o relógio, junto com outras pessoas.",
        es: "Competencias a través de FAG, con podios en el hackatón del Show Rural Digital — construir algo defendible contra el reloj, junto a otras personas.",
      },
      tags: [
        { en: "Hackathon", pt: "Hackathon", es: "Hackatón" },
        { en: "Awards", pt: "Premiações", es: "Premios" },
      ],
    },
    {
      id: "car-fag",
      kind: "education",
      org: "Centro Universitário Assis Gurgacz (FAG)",
      logoUrl: "/profile/fag.jpg",
      logoFit: "contain",
      startYear: 2021,
      period: { en: "Completed", pt: "Concluído", es: "Concluido" },
      title: {
        en: "Software engineering",
        pt: "Engenharia de software",
        es: "Ingeniería de software",
      },
      body: {
        en: "The degree that put structure under the practice: development, architecture, product, quality, and what it takes to actually deliver a system.",
        pt: "A graduação que colocou estrutura sob a prática: desenvolvimento, arquitetura, produto, qualidade e o que é preciso para entregar um sistema de verdade.",
        es: "La carrera que puso estructura bajo la práctica: desarrollo, arquitectura, producto, calidad y lo que hace falta para entregar un sistema de verdad.",
      },
      tags: [
        {
          en: "Software engineering",
          pt: "Engenharia de software",
          es: "Ingeniería de software",
        },
        { en: "Architecture", pt: "Arquitetura", es: "Arquitectura" },
      ],
    },
    {
      id: "car-eureka",
      kind: "education",
      org: "Eureka",
      logoUrl: "/profile/eureka.png",
      logoFit: "contain",
      startYear: 2020,
      period: { en: "2020 — 2021", pt: "2020 — 2021", es: "2020 — 2021" },
      title: {
        en: "Robotics fairs and prototyping",
        pt: "Feiras de robótica e prototipagem",
        es: "Ferias de robótica y prototipado",
      },
      body: {
        en: "National and international robotics fairs through Eureka — FEBRACE 2021, Infomatrix, third place at Fenecit 2020, FETEC-SP, and Ciência Jovem — with electronic prototypes and a credential for Infomatrix in Guadalajara, Mexico.",
        pt: "Feiras nacionais e internacionais de robótica pela Eureka — FEBRACE 2021, Infomatrix, 3º lugar no Fenecit 2020, FETEC-SP e Ciência Jovem — com protótipos eletrônicos e credencial para a Infomatrix em Guadalajara, México.",
        es: "Ferias nacionales e internacionales de robótica a través de Eureka — FEBRACE 2021, Infomatrix, tercer lugar en Fenecit 2020, FETEC-SP y Ciência Jovem — con prototipos electrónicos y credencial para Infomatrix en Guadalajara, México.",
      },
      tags: [
        { en: "Electronics", pt: "Eletrônica", es: "Electrónica" },
        { en: "Prototyping", pt: "Prototipagem", es: "Prototipado" },
        { en: "International", pt: "Internacional", es: "Internacional" },
      ],
    },
    {
      id: "car-codigo-kid",
      kind: "education",
      org: "Código Kid",
      logoUrl: "/profile/codigo-kid.png",
      logoFit: "cover",
      startYear: 2018,
      period: {
        en: "1 year 9 months",
        pt: "1 ano e 9 meses",
        es: "1 año y 9 meses",
      },
      title: {
        en: "Programming electronic devices",
        pt: "Programação de dispositivos eletrônicos",
        es: "Programación de dispositivos electrónicos",
      },
      body: {
        en: "Where it started: logic, Arduino, and prototyping. Making a physical thing respond to code is still the shape of everything I build.",
        pt: "Onde tudo começou: lógica, Arduino e prototipagem. Fazer uma coisa física responder a código continua sendo o formato de tudo que construo.",
        es: "Donde empezó todo: lógica, Arduino y prototipado. Hacer que algo físico responda al código sigue siendo la forma de todo lo que construyo.",
      },
      tags: [
        { en: "Arduino", pt: "Arduino", es: "Arduino" },
        { en: "Electronics", pt: "Eletrônica", es: "Electrónica" },
      ],
    },
    {
      id: "car-high-school",
      kind: "education",
      org: "Colégio Eleodoro Ébano Pereira",
      logoUrl: "",
      logoFit: "contain",
      startYear: 2017,
      period: { en: "Completed 2019", pt: "Concluído em 2019", es: "Concluido en 2019" },
      title: { en: "High school", pt: "Ensino médio", es: "Bachillerato" },
      body: {
        en: "Finished in 2019, already spending afternoons on robotics and research.",
        pt: "Concluído em 2019, já passando as tardes em robótica e pesquisa.",
        es: "Terminado en 2019, ya pasando las tardes en robótica e investigación.",
      },
      tags: [],
    },
  ],

  skills: [
    {
      id: "sk-backend",
      title: {
        en: "Backend and APIs",
        pt: "Backend e APIs",
        es: "Backend y APIs",
      },
      body: {
        en: "REST APIs, authentication, business rules, database integration, and storage — the layer that dashboards, bots, and automations all sit on.",
        pt: "APIs REST, autenticação, regras de negócio, integração com banco e armazenamento — a camada em que dashboards, bots e automações se apoiam.",
        es: "APIs REST, autenticación, reglas de negocio, integración con base de datos y almacenamiento — la capa sobre la que se apoyan paneles, bots y automatizaciones.",
      },
      items: [
        "Node.js",
        "Python",
        "REST",
        "JWT",
        "SQL Server",
        "PostgreSQL",
        "MongoDB",
        "MinIO",
      ],
    },
    {
      id: "sk-frontend",
      title: { en: "Frontend", pt: "Frontend", es: "Frontend" },
      body: {
        en: "Interfaces that stay legible under pressure: dashboards, approval queues, three languages, and motion only where it explains what changed.",
        pt: "Interfaces que continuam legíveis sob pressão: dashboards, filas de aprovação, três idiomas, e movimento só onde ele explica o que mudou.",
        es: "Interfaces que siguen legibles bajo presión: paneles, colas de aprobación, tres idiomas, y movimiento solo donde explica qué cambió.",
      },
      items: [
        "TypeScript",
        "React",
        "Vite",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "shadcn/ui",
        "i18next",
      ],
    },
    {
      id: "sk-data",
      title: {
        en: "Data and AI",
        pt: "Dados e IA",
        es: "Datos e IA",
      },
      body: {
        en: "Structuring what a model needs to know about a database, turning plain questions into SQL, and getting the answer back in the shape the person asked for.",
        pt: "Estruturar o que um modelo precisa saber sobre um banco, transformar perguntas comuns em SQL e devolver a resposta no formato que a pessoa pediu.",
        es: "Estructurar lo que un modelo necesita saber sobre una base de datos, convertir preguntas comunes en SQL y devolver la respuesta en el formato que la persona pidió.",
      },
      items: [
        "Advanced SQL",
        "Natural language to SQL",
        "Knowledge graphs",
        "Local LLMs",
        "Data joins",
        "Reports and exports",
      ],
    },
    {
      id: "sk-infra",
      title: {
        en: "Infrastructure and networks",
        pt: "Infraestrutura e redes",
        es: "Infraestructura y redes",
      },
      body: {
        en: "Servers, Active Directory, Linux, Docker, networking, and the standardisation that keeps a distributed operation from drifting.",
        pt: "Servidores, Active Directory, Linux, Docker, redes e a padronização que impede uma operação distribuída de se perder.",
        es: "Servidores, Active Directory, Linux, Docker, redes y la estandarización que impide que una operación distribuida se desvíe.",
      },
      items: [
        "Windows Server",
        "Active Directory",
        "Linux",
        "Docker",
        "Nginx",
        "PowerShell",
        "Coolify",
        "Networking",
      ],
    },
    {
      id: "sk-automation",
      title: {
        en: "Automation and bots",
        pt: "Automação e bots",
        es: "Automatización y bots",
      },
      body: {
        en: "Bots and jobs shaped around the workflow that already exists, instead of asking the operation to change to suit the tool.",
        pt: "Bots e rotinas moldados pelo fluxo que já existe, em vez de pedir que a operação mude para caber na ferramenta.",
        es: "Bots y rutinas moldeados por el flujo que ya existe, en vez de pedir que la operación cambie para caber en la herramienta.",
      },
      items: [
        "Telegram bots",
        "n8n",
        "Webhooks",
        "Scheduled jobs",
        "Scrapers",
        "CLI installers",
      ],
    },
    {
      id: "sk-delivery",
      title: {
        en: "Internal product delivery",
        pt: "Entrega de produto interno",
        es: "Entrega de producto interno",
      },
      body: {
        en: "Understanding the process before writing code, finding the bottleneck, and shipping the thing that actually moves it.",
        pt: "Entender o processo antes de escrever código, achar o gargalo e entregar a coisa que de fato o desloca.",
        es: "Entender el proceso antes de escribir código, encontrar el cuello de botella y entregar lo que de verdad lo mueve.",
      },
      items: [
        "Linx systems integration",
        "ERP integration",
        "Operator-first UX",
        "Real-time dashboards",
        "Auth and permissions",
        "API documentation",
      ],
    },
  ],

  languages: [
    {
      id: "lang-pt",
      name: { en: "Portuguese", pt: "Português", es: "Portugués" },
      level: { en: "Native", pt: "Nativo", es: "Nativo" },
      proficiency: 5,
    },
    {
      id: "lang-en",
      name: { en: "English", pt: "Inglês", es: "Inglés" },
      level: {
        en: "Intermediate — New York School",
        pt: "Intermediário — New York School",
        es: "Intermedio — New York School",
      },
      proficiency: 3,
    },
  ],

  flow: [
    {
      id: "flow-brief",
      title: { en: "Brief", pt: "Briefing", es: "Briefing" },
      role: { en: "Input", pt: "Entrada", es: "Entrada" },
      body: {
        en: "I sit with the actual problem first: what hurts in the operation, what already exists, and what finished looks like. That becomes the brief.",
        pt: "Primeiro eu sento com o problema real: o que dói na operação, o que já existe e como é o pronto. Isso vira o briefing.",
        es: "Primero me siento con el problema real: qué duele en la operación, qué ya existe y cómo se ve lo terminado. Eso se convierte en el briefing.",
      },
      practice: {
        en: "I write the ask the way I would explain it to a colleague — context, limits, examples, acceptance. Without that, nothing gets generated.",
        pt: "Escrevo o pedido como explicaria a um colega — contexto, limites, exemplos, aceitação. Sem isso, nada é gerado.",
        es: "Escribo el pedido como se lo explicaría a un colega — contexto, límites, ejemplos, aceptación. Sin eso, no se genera nada.",
      },
    },
    {
      id: "flow-generate",
      title: { en: "Generate", pt: "Gerar", es: "Generar" },
      role: { en: "Draft", pt: "Rascunho", es: "Borrador" },
      body: {
        en: "The AI writes with me in fast cycles, but never alone. Sub-agents argue the approaches against each other and I pick the one that holds up.",
        pt: "A IA escreve comigo em ciclos rápidos, mas nunca sozinha. Sub-agentes discutem as abordagens entre si e eu escolho a que se sustenta.",
        es: "La IA escribe conmigo en ciclos rápidos, pero nunca sola. Los sub-agentes discuten los enfoques entre sí y yo elijo el que se sostiene.",
      },
      practice: {
        en: "Focused chunks, an explicit argument about trade-offs, and my call at the end. Speed with a decision behind it, not accept-all.",
        pt: "Blocos focados, uma discussão explícita de trade-offs e a decisão minha no fim. Velocidade com decisão atrás, não aceitar tudo.",
        es: "Bloques enfocados, una discusión explícita de compensaciones y mi decisión al final. Velocidad con una decisión detrás, no aceptar todo.",
      },
    },
    {
      id: "flow-review",
      title: { en: "Review", pt: "Revisão", es: "Revisión" },
      role: { en: "Judgment", pt: "Julgamento", es: "Criterio" },
      body: {
        en: "I read it as a human: the architecture, the edge cases, and whether it genuinely helps the shift — not whether it compiles.",
        pt: "Eu leio como humano: a arquitetura, os casos de borda e se aquilo ajuda o turno de verdade — não se compila.",
        es: "Lo leo como humano: la arquitectura, los casos límite y si realmente ayuda al turno — no si compila.",
      },
      practice: {
        en: "What breaks? What is left over? What was never asked for? I fix that by hand before writing a single test.",
        pt: "O que quebra? O que sobrou? O que ninguém pediu? Eu corrijo isso na mão antes de escrever um teste.",
        es: "¿Qué se rompe? ¿Qué sobra? ¿Qué nadie pidió? Corrijo eso a mano antes de escribir una sola prueba.",
      },
    },
    {
      id: "flow-tests",
      title: { en: "Tests", pt: "Testes", es: "Pruebas" },
      role: { en: "Evidence", pt: "Evidência", es: "Evidencia" },
      body: {
        en: "Behaviour gets proved on the paths that matter — unit, integration, regression — so the earlier argument turns into evidence.",
        pt: "O comportamento é provado nos caminhos que importam — unitário, integração, regressão — para a discussão anterior virar evidência.",
        es: "El comportamiento se prueba en los caminos que importan — unitario, integración, regresión — para que la discusión anterior se vuelva evidencia.",
      },
      practice: {
        en: "Happy path and failure path both. A red test sends the work back to review — that loop is not optional.",
        pt: "Caminho feliz e caminho de falha, os dois. Um teste vermelho manda o trabalho de volta para a revisão — esse laço não é opcional.",
        es: "Camino feliz y camino de fallo, ambos. Una prueba en rojo devuelve el trabajo a la revisión — ese bucle no es opcional.",
      },
      loopsBack: true,
    },
    {
      id: "flow-security",
      title: { en: "Security", pt: "Segurança", es: "Seguridad" },
      role: { en: "Risk", pt: "Risco", es: "Riesgo" },
      body: {
        en: "I treat the code as if it came from a stranger: auth, input, secrets, permissions, attack surface — especially the parts the model invented.",
        pt: "Trato o código como se viesse de um desconhecido: auth, entrada, segredos, permissões, superfície de ataque — principalmente o que o modelo inventou.",
        es: "Trato el código como si viniera de un desconocido: auth, entrada, secretos, permisos, superficie de ataque — sobre todo lo que el modelo inventó.",
      },
      practice: {
        en: "An explicit security pass, sometimes with a sub-agent whose only job is to find the risk. Anything found loops back.",
        pt: "Uma passada explícita de segurança, às vezes com um sub-agente cujo único trabalho é achar o risco. O que aparecer volta para trás.",
        es: "Una pasada explícita de seguridad, a veces con un sub-agente cuyo único trabajo es encontrar el riesgo. Lo que aparezca vuelve atrás.",
      },
      loopsBack: true,
    },
    {
      id: "flow-ops",
      title: {
        en: "Operational check",
        pt: "Prova operacional",
        es: "Prueba operativa",
      },
      role: { en: "Reality", pt: "Realidade", es: "Realidad" },
      body: {
        en: "The system meets a real scenario: logs, integrations, the failures you expect, and someone using it the way they actually work.",
        pt: "O sistema encontra um cenário real: logs, integrações, as falhas que se espera e alguém usando do jeito que trabalha de verdade.",
        es: "El sistema se encuentra con un escenario real: registros, integraciones, los fallos que se esperan y alguien usándolo como realmente trabaja.",
      },
      practice: {
        en: "I simulate the routine, not the laptop demo. If the operation breaks, it goes back and we argue it again.",
        pt: "Eu simulo a rotina, não a demo no notebook. Se a operação quebra, volta e a gente discute de novo.",
        es: "Simulo la rutina, no la demo en el portátil. Si la operación se rompe, vuelve y lo discutimos otra vez.",
      },
      loopsBack: true,
    },
    {
      id: "flow-deploy",
      title: {
        en: "Parallel deploy",
        pt: "Deploy paralelo",
        es: "Despliegue paralelo",
      },
      role: { en: "Production", pt: "Produção", es: "Producción" },
      body: {
        en: "It ships beside the live system, not on top of it. Docker isolates the new version, Coolify brings it up, and the running one stays untouched.",
        pt: "Sobe ao lado do sistema no ar, não em cima dele. O Docker isola a versão nova, o Coolify sobe, e o que está rodando fica intacto.",
        es: "Se despliega junto al sistema en producción, no encima. Docker aísla la versión nueva, Coolify la levanta, y lo que está corriendo queda intacto.",
      },
      practice: {
        en: "Controlled smoke tests with real people, then promotion. If it fails, production never noticed.",
        pt: "Testes de fumaça controlados com pessoas reais, depois promoção. Se falhar, a produção nem percebeu.",
        es: "Pruebas de humo controladas con personas reales, luego promoción. Si falla, producción ni se enteró.",
      },
    },
  ],
}
