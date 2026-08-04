import type {
  AreaOfWork,
  Category,
  Project,
  SiteSettings,
  Technology,
} from "@/types"

export const INITIAL_SETTINGS: SiteSettings = {
  defaultLocale: "en",
  defaultTheme: "system",
  featuredProjectId: "proj-cartas-contra-humanidade",
}

export const SEED_CATEGORIES: Category[] = [
  {
    id: "cat-estrela",
    name: { pt: "Sistemas", en: "Systems" },
    showcaseOnly: true,
  },
  {
    id: "cat-auto-ops",
    name: {
      pt: "Automações no serviço",
      en: "Workplace automations",
    },
    showcaseOnly: true,
  },
  {
    id: "cat-infra",
    name: { pt: "Infraestrutura", en: "Infrastructure" },
    showcaseOnly: true,
  },
  { id: "cat-landing", name: { pt: "Landing Page", en: "Landing Page" } },
  { id: "cat-web", name: { pt: "Sistema Web", en: "Web System" } },
  { id: "cat-dash", name: { pt: "Dashboard", en: "Dashboard" } },
  { id: "cat-ecom", name: { pt: "E-commerce", en: "E-commerce" } },
  { id: "cat-auto", name: { pt: "Automação", en: "Automation" } },
  { id: "cat-api", name: { pt: "API / Backend Integrado", en: "API / Integrated Backend" } },
  { id: "cat-inst", name: { pt: "Aplicação Institucional", en: "Institutional Application" } },
  { id: "cat-internal", name: { pt: "Ferramenta Interna", en: "Internal Tool" } },
  { id: "cat-study", name: { pt: "Estudo / Conceito", en: "Study / Concept" } },
  { id: "cat-freelance", name: { pt: "Projeto Freelancer", en: "Freelance Project" } },
  { id: "cat-corp", name: { pt: "Projeto Corporativo", en: "Corporate Project" } },
  { id: "cat-personal", name: { pt: "Projeto Pessoal", en: "Personal Project" } },
]

const FEIRAO = (file: string) => `/estrela-projects/feirao/${file}`
const VALIDADE = (file: string) => `/estrela-projects/validade/${file}`
const NEXUS = (file: string) => `/estrela-projects/nexus/${file}`
const COMISSAO = (file: string) => `/estrela-projects/comissao/${file}`
const TELEFONIA = (file: string) => `/estrela-projects/telefonia/${file}`
const AUTH = (file: string) => `/estrela-projects/farmacia-auth/${file}`
const IMAGENS = (file: string) => `/estrela-projects/imagens-ecom/${file}`
const DBA = (file: string) => `/estrela-projects/dba-bot/${file}`
const INSTALADOR = (file: string) => `/estrela-projects/instalador/${file}`
const SWIPE = (file: string) => `/estrela-projects/swipe/${file}`

export const SEED_AREAS: AreaOfWork[] = [
  { id: "area-fe", name: { pt: "Frontend", en: "Frontend" } },
  { id: "area-be", name: { pt: "Backend", en: "Backend" } },
  { id: "area-fs", name: { pt: "Full Stack", en: "Full Stack" } },
  { id: "area-infra", name: { pt: "Infraestrutura", en: "Infrastructure" } },
  { id: "area-auto", name: { pt: "Automação", en: "Automation" } },
  { id: "area-data", name: { pt: "Dados", en: "Data" } },
  { id: "area-devops", name: { pt: "DevOps", en: "DevOps" } },
  { id: "area-ux", name: { pt: "UX/UI", en: "UX/UI" } },
  { id: "area-ai", name: { pt: "IA / Assistentes", en: "AI / Assistants" } },
  { id: "area-ecom", name: { pt: "E-commerce", en: "E-commerce" } },
]

const tech = (id: string, name: string): Technology => ({ id, name })

export const SEED_TECHNOLOGIES: Technology[] = [
  tech("html5", "HTML5"),
  tech("css3", "CSS3"),
  tech("js", "JavaScript"),
  tech("ts", "TypeScript"),
  tech("react", "React"),
  tech("vite", "Vite"),
  tech("next", "Next.js"),
  tech("tailwind", "Tailwind CSS"),
  tech("sass", "Sass"),
  tech("styled", "Styled Components"),
  tech("bootstrap", "Bootstrap"),
  tech("shadcn", "shadcn/ui"),
  tech("router", "React Router"),
  tech("motion", "Framer Motion"),
  tech("i18n", "i18next"),
  tech("zod", "Zod"),
  tech("rhf", "React Hook Form"),
  tech("node", "Node.js"),
  tech("express", "Express"),
  tech("fastapi", "FastAPI"),
  tech("flask", "Flask"),
  tech("php", "PHP"),
  tech("mysql", "MySQL"),
  tech("pg", "PostgreSQL"),
  tech("mssql", "SQL Server"),
  tech("mongo", "MongoDB"),
  tech("firebase", "Firebase"),
  tech("supabase", "Supabase"),
  tech("prisma", "Prisma"),
  tech("rest", "REST API"),
  tech("git", "Git"),
  tech("github", "GitHub"),
  tech("docker", "Docker"),
  tech("cloudflare", "Cloudflare"),
  tech("coolify", "Coolify"),
  tech("nginx", "Nginx"),
  tech("linux", "Linux"),
  tech("winserver", "Windows Server"),
  tech("powershell", "PowerShell"),
  tech("python", "Python"),
  tech("playwright", "Playwright"),
  tech("selenium", "Selenium"),
  tech("minio", "MinIO"),
  tech("jwt", "JWT"),
  tech("figma", "Figma"),
  tech("three", "Three.js"),
  tech("r3f", "React Three Fiber"),
  tech("wordpress", "WordPress"),
  tech("elementor", "Elementor"),
  tech("jquery", "jQuery"),
  tech("mercadopago", "Mercado Pago"),
  tech("obsidian", "Obsidian"),
  tech("telegram", "Telegram Bot"),
  tech("openai", "IA / LLM"),
  tech("n8n", "n8n"),
  tech("chakra", "Chakra UI"),
  tech("rq", "React Query"),
]

const LEG = (file: string) => `/legacy-projects/${file}`
const DEBUTANTE = (file: string) => `/legacy-projects/debutante/${file}`
const CCH = (file: string) =>
  `/legacy-projects/cartas-contra-a-humanidade/${file}`

/** Projetos extraídos do portfólio legado (HTML + imagens em /public/legacy-projects). */
const LEGACY_FROM_PORTFOLIO: Project[] = [
  {
    id: "proj-cartas-contra-humanidade",
    slug: "cartas-contra-a-humanidade",
    title: {
      pt: "Cartas Contra a Humanidade",
      en: "Cards Against Humanity (PT)",
    },
    shortDescription: {
      pt: "Clone online em português do Cards Against Humanity — mesa digital, multiplayer local e visual de feltro.",
      en: "Portuguese online clone of Cards Against Humanity — digital table, local multiplayer, and a felt-table look.",
    },
    fullDescription: {
      pt: "Jogo de cartas ácidas para amigos: sai uma carta preta (pergunta), cada um responde com cartas brancas e a mesa vota na resposta mais absurda. Projeto não oficial, com baralho PT-BR embutido (~600 cartas), lobby configurável (duração, privada/pública, mão 4–6, cronômetros), mesa com chat, pódio e mão em leque, galeria de cartas e partidas ao vivo. Modo local: auth e salas no navegador + sync no servidor Vite por código de 6 dígitos — multiplayer no mesmo PC (outras abas/navegadores). Stack React 18 + TypeScript + Vite, Chakra UI, Framer Motion e React Query.",
      en: "A spicy card game for friends: a black card (prompt) is played, everyone answers with white cards, and the table votes for the most absurd reply. Unofficial project with a built-in PT-BR deck (~600 cards), configurable lobby (duration, private/public, hand size 4–6, timers), a table with chat, podium and fan-style hand, card gallery and live matches. Local mode: auth and rooms in the browser plus Vite-server sync via a 6-digit code — multiplayer on the same machine (other tabs/browsers). Stack: React 18 + TypeScript + Vite, Chakra UI, Framer Motion, and React Query.",
    },
    context: {
      pt: "Projeto pessoal / open source para jogar em português com amigos na mesma rede (dev local). Repositório público no GitHub.",
      en: "Personal / open-source project to play in Portuguese with friends on the same network (local dev). Public repo on GitHub.",
    },
    participation: {
      pt: "Conceito, UI da mesa, lobby multiplayer local, baralho PT-BR, auth anônima ou e-mail/senha e sync da sala.",
      en: "Concept, table UI, local multiplayer lobby, PT-BR deck, anonymous or email/password auth, and room sync.",
    },
    technicalChallenges: {
      pt: "Estado de partida multiplayer no mesmo browser/servidor Vite, UX de mão/leque e votos, baralho grande com busca/filtros e visual de feltro sem travar a jogatina.",
      en: "Multiplayer match state across tabs/Vite server, hand fan and voting UX, large deck with search/filters, and a felt aesthetic that stays snappy in play.",
    },
    categoryId: "cat-personal",
    areaId: "area-fs",
    creationDate: "2025-01-01",
    technologyIds: [
      "react",
      "ts",
      "vite",
      "chakra",
      "sass",
      "motion",
      "router",
      "rq",
      "firebase",
    ],
    githubUrl:
      "https://github.com/gabriel-Dagostim/cartas-contra-a-humanidade",
    coverImageUrl: CCH("01-home.png"),
    thumbnailUrl: CCH("01-home.png"),
    galleryImages: [
      CCH("01-home.png"),
      CCH("02-auth.png"),
      CCH("03-lobby.png"),
      CCH("04-match.png"),
      CCH("05-cards.png"),
      CCH("06-matches.png"),
      CCH("07-cast.png"),
    ],
    featured: true,
    published: true,
    order: -10,
    status: "published",
  },
  {
    id: "proj-legacy-luna",
    slug: "luna-store",
    title: {
      pt: "Luna Store — Luna Network",
      en: "Luna Store — Luna Network",
    },
    shortDescription: {
      pt: "Loja online para rede de servidores Minecraft: código próprio, stack React + Node + MongoDB.",
      en: "Online store for a Minecraft server network — custom build with React, Node.js, and MongoDB.",
    },
    fullDescription: {
      pt: "Loja exclusiva desenvolvida para uma rede de servidores Minecraft, com conceito original. Código 100% autoral, sem templates genéricos de e-commerce, com interface pensada para itens e fluxos do jogo, usabilidade e segurança.",
      en: "An exclusive online store for a Minecraft server network, marked by an entirely original concept. The coding is 100% authentic, avoiding off-the-shelf store templates — specific functionality and items for the game, with a user-friendly and secure interface.",
    },
    context: {
      pt: "Projeto real publicado em lunanetwork.com.br.",
      en: "Live project at lunanetwork.com.br.",
    },
    participation: {
      pt: "Desenvolvimento front-end e integração com backend e banco de dados.",
      en: "Front-end development with backend and database integration.",
    },
    categoryId: "cat-ecom",
    areaId: "area-fs",
    creationDate: "2024-06-01",
    technologyIds: ["react", "ts", "tailwind", "node", "mongo"],
    githubUrl: "https://github.com/gabriel-Dagostim",
    liveUrl: "https://www.lunanetwork.com.br",
    coverImageUrl: LEG("lunaStore.jpeg"),
    thumbnailUrl: LEG("lunaStore.jpeg"),
    galleryImages: [],
    featured: false,
    published: true,
    order: 1,
    status: "published",
  },
  {
    id: "proj-legacy-debutante",
    slug: "site-debutante",
    title: {
      pt: "Site de debutante — Ana Luiza Clima",
      en: "Debutante site — Ana Luiza Clima",
    },
    shortDescription: {
      pt: "Site de XV com lista de presentes via Mercado Pago, PIX e galeria viva: convidados enviam fotos e a timeline do evento cresce em tempo real.",
      en: "XV site with Mercado Pago gift list, PIX, and a live gallery — guests upload photos and the event timeline grows in real time.",
    },
    fullDescription: {
      pt: "Site completo para a celebração de 15 anos: home com countdown e confirmação, informações do evento com mapa, lista de presentes com busca/filtro e checkout Mercado Pago (cartão, PIX, boleto) além de PIX com valor livre. Galeria viva do evento — banco de imagens onde convidados fazem upload e as fotos entram numa timeline/masonry da festa. Experiência pensada para o convidado presentear e compartilhar memórias sem fricção.",
      en: "Full site for a 15th birthday: home with countdown and RSVP, event info with map, gift list with search/filters and Mercado Pago checkout (card, PIX, boleto) plus free-amount PIX. Live event gallery — an image bank where guests upload and photos land in a masonry/timeline of the party. Built so guests can gift and share memories without friction.",
    },
    context: {
      pt: "Evento real (Ana Luiza Clima — Cascavel/PR). Site público com lista de presentes e galeria colaborativa.",
      en: "Real event (Ana Luiza Clima — Cascavel/PR). Public site with gift list and collaborative gallery.",
    },
    participation: {
      pt: "Desenvolvimento do site, integração Mercado Pago para presentes e banco de imagens / galeria viva com upload dos convidados.",
      en: "Built the site, Mercado Pago gift integration, and the image bank / live gallery with guest uploads.",
    },
    technicalChallenges: {
      pt: "Checkout Mercado Pago + PIX valor livre, catálogo de presentes, upload e timeline de fotos em escala de festa, UX elegante para convidados não técnicos.",
      en: "Mercado Pago checkout + free-amount PIX, gift catalog, party-scale photo upload/timeline, elegant UX for non-technical guests.",
    },
    categoryId: "cat-freelance",
    areaId: "area-fs",
    creationDate: "2025-12-06",
    technologyIds: ["react", "ts", "tailwind", "node", "rest", "mercadopago"],
    liveUrl: "https://ana-home-page.vercel.app",
    coverImageUrl: DEBUTANTE("01-home.png"),
    thumbnailUrl: DEBUTANTE("01-home.png"),
    galleryImages: [
      DEBUTANTE("01-home.png"),
      DEBUTANTE("02-evento.png"),
      DEBUTANTE("03-presentes.png"),
      DEBUTANTE("04-pix.png"),
      DEBUTANTE("05-galeria.png"),
      DEBUTANTE("06-mercadopago.png"),
    ],
    featured: true,
    published: true,
    order: 2,
    status: "published",
  },
]

const ESTRELA_SYSTEMS: Project[] = [
  {
    id: "proj-feirao",
    slug: "acompanhamento-feirao",
    title: {
      pt: "Acompanhamento do Feirão",
      en: "Feirão tracking platform",
    },
    shortDescription: {
      pt: "Plataforma interativa para acompanhar metas da rede e por filial em dias de alta venda, com gamificação Coiote e Papa-Léguas.",
      en: "Interactive platform to track network and branch goals on peak sales days, with Coyote & Road Runner gamification.",
    },
    fullDescription: {
      pt: "Sistema interno desenvolvido para o Feirão Maternidade (Rede Estrela): acompanhamento em tempo quase real do faturamento da rede e de cada filial, progresso de meta, pódio da corrida, painel rápido e modo TV para exibição nas lojas. A gamificação estilo Coiote e Papa-Léguas destaca lojas que ainda não bateram a meta e celebra quem estourou o alvo — engajando o time no dia de controle.",
      en: "Internal system for Feirão Maternidade (Rede Estrela): near real-time tracking of network and branch revenue, goal progress, race podium, quick panel, and TV mode for in-store displays. Coyote & Road Runner gamification highlights stores still chasing the goal and celebrates those who smash it — keeping the team engaged on control day.",
    },
    context: {
      pt: "Dia de altas vendas na Rede Estrela. Uso interno — sem link público; o portfólio mostra o produto pelas prints.",
      en: "Peak sales day at Rede Estrela. Internal use only — no public link; the portfolio showcases the product through screenshots.",
    },
    participation: {
      pt: "Concepção e desenvolvimento da plataforma interativa de acompanhamento (visão geral, filiais, histórico, modo TV e camada de gamificação).",
      en: "Design and development of the interactive tracking platform (overview, branches, history, TV mode, and gamification layer).",
    },
    technicalChallenges: {
      pt: "Leituras frequentes do servidor, UX legível em TV/dashboard, ranking por progresso de meta (não só faturamento bruto) e narrativa visual para motivar filiais.",
      en: "Frequent server polls, readable TV/dashboard UX, ranking by goal progress (not just raw revenue), and a visual narrative to motivate branches.",
    },
    categoryId: "cat-estrela",
    areaId: "area-fe",
    creationDate: "2026-07-10",
    technologyIds: ["react", "ts", "tailwind", "vite"],
    coverImageUrl: FEIRAO("01-visao-geral.png"),
    thumbnailUrl: FEIRAO("01-visao-geral.png"),
    galleryImages: [
      FEIRAO("01-visao-geral.png"),
      FEIRAO("02-podio-filiais.png"),
      FEIRAO("03-cards-filiais.png"),
      FEIRAO("04-corrida-coyote.png"),
      FEIRAO("05-meta-estourada.png"),
      FEIRAO("06-modo-tv.png"),
    ],
    featured: true,
    published: true,
    order: 0,
    status: "published",
  },
  {
    id: "proj-validade-conveniencia",
    slug: "gestao-validade-conveniencia",
    title: {
      pt: "Gestão de validade — Conveniência",
      en: "Expiry management — Convenience",
    },
    shortDescription: {
      pt: "Controle de produtos da conveniência a vencer: cadastro, alertas, cruzamento (procV) com vendas da loja e baixa/bonificação no caixa.",
      en: "Convenience products nearing expiry: catalog, alerts, VLOOKUP-style sales cross-check, and POS write-off / bonus control.",
    },
    fullDescription: {
      pt: "Sistema interno das Farmácias Estrela para a conveniência: o operador cadastra produtos próximos do vencimento e acompanha o estoque AV (a vencer). O módulo Vendas × AV cruza (procV) as vendas do PDV com o cadastro AV, para saber quando aquele produto vendeu e quanto baixar do estoque marcado. Inclui dashboard por loja, gestão de produtos, alertas de lotes vencidos/críticos, relatórios (Excel/PDF) e fluxo de revisão para o gerente — com controle de bonificação quando o caixa vende esses itens.",
      en: "Internal Farmácias Estrela system for convenience goods: operators register products nearing expiry and track AV (near-expiry) stock. The Sales × AV module cross-checks (VLOOKUP-style) POS sales against the AV register so the store knows when those items sold and how much to write off. Includes store dashboard, product management, expired/critical lot alerts, Excel/PDF reports, and a review flow for managers — plus bonus control when the cashier sells those products.",
    },
    context: {
      pt: "Operação diária da loja (conveniência). Uso interno — sem link público; o portfólio mostra o produto pelas prints.",
      en: "Day-to-day store operations (convenience). Internal use only — no public link; the portfolio showcases the product through screenshots.",
    },
    participation: {
      pt: "Desenvolvimento do sistema de gestão de validade: dashboard, produtos, alertas, cruzamento vendas × AV, relatórios e fluxo de baixa/bonificação.",
      en: "Built the expiry management system: dashboard, products, alerts, sales × AV cross-check, reports, and write-off / bonus flow.",
    },
    technicalChallenges: {
      pt: "Cruzamento confiável vendas PDV × lotes AV, alertas por urgência (vencido / 7 / 15 dias), multi-loja e UX clara para gerente baixar estoque sem erro.",
      en: "Reliable POS sales × AV lot matching, urgency-based alerts (expired / 7 / 15 days), multi-store scope, and a clear UX so managers write off stock without mistakes.",
    },
    categoryId: "cat-estrela",
    areaId: "area-fs",
    creationDate: "2025-05-12",
    technologyIds: ["react", "ts", "tailwind", "node", "mssql", "rest"],
    coverImageUrl: VALIDADE("01-dashboard.png"),
    thumbnailUrl: VALIDADE("01-dashboard.png"),
    galleryImages: [
      VALIDADE("01-dashboard.png"),
      VALIDADE("02-produtos.png"),
      VALIDADE("03-alertas.png"),
      VALIDADE("04-vendas-x-av.png"),
      VALIDADE("05-relatorios.png"),
    ],
    featured: false,
    published: true,
    order: 1,
    status: "published",
  },
  {
    id: "proj-consulta-comissao",
    slug: "consulta-comissao",
    title: {
      pt: "Consulta de Comissão — SIT Estrela",
      en: "Commission lookup — SIT Estrela",
    },
    shortDescription: {
      pt: "Integração com sistemas Linx / ERP → web: consulta comissão por produto (EAN ou código) e percentuais por cargo da loja.",
      en: "Linx systems / ERP → web integration: look up product commission (EAN or code) and percentages by store role.",
    },
    fullDescription: {
      pt: "Aplicação web do Setor de Inovação e Tecnologia (SIT Estrela) que consome dados do ERP para calcular e exibir a comissão da venda com base no produto. O consultor informa EAN ou código interno; o sistema retorna cadastro do item (descrição, fabricante, categoria, linha) e a grade de comissão por cargo — consultor de vendas, caixa, farmacêuticos e variações (MP, WhatsApp). Integração de dados de ERP em aplicação web enxuta, focada em consulta rápida no dia a dia da loja.",
      en: "Web app from the Innovation & Technology team (SIT Estrela) that pulls ERP data to calculate and show sales commission by product. The user enters EAN or internal code; the system returns the item master (description, manufacturer, category, line) and the commission grid by role — sales consultant, cashier, pharmacists, and variants (MP, WhatsApp). Lean ERP-to-web integration built for fast in-store lookups.",
    },
    context: {
      pt: "Consulta interna Farmácias Estrela / SIT. Sem link público — o portfólio mostra o fluxo pelas prints.",
      en: "Internal Farmácias Estrela / SIT lookup. No public link — the portfolio shows the flow through screenshots.",
    },
    participation: {
      pt: "Integração dos dados de comissão do ERP com a aplicação web de consulta por produto e cargo.",
      en: "Integrated ERP commission data into the web lookup by product and role.",
    },
    technicalChallenges: {
      pt: "Mapear regras de comissão do ERP (linha/cargo) para uma UI clara, consulta por EAN ou código interno e resposta rápida para uso na loja.",
      en: "Mapping ERP commission rules (line/role) into a clear UI, lookup by EAN or internal code, and fast responses for store use.",
    },
    categoryId: "cat-estrela",
    areaId: "area-fs",
    creationDate: "2025-11-01",
    technologyIds: ["react", "ts", "tailwind", "node", "mssql", "rest"],
    coverImageUrl: COMISSAO("02-resultado.png"),
    thumbnailUrl: COMISSAO("02-resultado.png"),
    galleryImages: [COMISSAO("01-consulta.png"), COMISSAO("02-resultado.png")],
    featured: false,
    published: true,
    order: 2,
    status: "published",
  },
  {
    id: "proj-relatorio-telefonia",
    slug: "relatorio-telefonia-goto",
    title: {
      pt: "Relatório Telefonia — GoTo",
      en: "Telephony report — GoTo",
    },
    shortDescription: {
      pt: "Integração GoTo para mapear ligações perdidas e atendidas por loja, com relatórios, horários e metas de Televendas.",
      en: "GoTo integration to map missed and answered calls per store, with reports, schedules, and Televendas goals.",
    },
    fullDescription: {
      pt: "Sistema web que consome a integração com GoTo para consolidar a telefonia de Televendas: meses abertos, relatório por loja com volume recebido, loja/WhatsApp que não atendeu, % de perda, ordenação por métricas e exportação Excel. Permite detalhar ligações, acompanhar horários e cruzar o desempenho com metas de ligações perdidas e atendidas — dando visibilidade operacional do que a rede deixa de atender.",
      en: "Web system fed by a GoTo integration to consolidate Televendas telephony: open months, per-store reports with received volume, unanswered store/WhatsApp, loss %, metric sorting, and Excel export. Drill into calls, track schedules, and compare performance against missed/answered call goals — so the network sees what it fails to answer.",
    },
    context: {
      pt: "Televendas / Farmácias Estrela. Uso interno — sem link público; prints do consolidado e do relatório mensal.",
      en: "Televendas / Farmácias Estrela. Internal use — no public link; screenshots of the month list and monthly report.",
    },
    participation: {
      pt: "Integração GoTo + aplicação de relatórios (consolidação mensal, métricas por loja, exportação e visão de perda).",
      en: "GoTo integration plus reporting app (monthly consolidation, per-store metrics, export, and loss view).",
    },
    technicalChallenges: {
      pt: "Normalizar eventos GoTo (recebidas/perdidas, WhatsApp), consolidar por loja/mês, ordenar por % perda/volume e expor drill-down sem perder performance.",
      en: "Normalizing GoTo events (answered/missed, WhatsApp), consolidating by store/month, sorting by loss %/volume, and drill-down without hurting performance.",
    },
    categoryId: "cat-estrela",
    areaId: "area-fs",
    creationDate: "2026-06-01",
    technologyIds: ["react", "ts", "tailwind", "node", "rest"],
    coverImageUrl: TELEFONIA("02-relatorio.png"),
    thumbnailUrl: TELEFONIA("02-relatorio.png"),
    galleryImages: [TELEFONIA("01-meses.png"), TELEFONIA("02-relatorio.png")],
    featured: false,
    published: true,
    order: 3,
    status: "published",
  },
  {
    id: "proj-farmacia-auth",
    slug: "farmacia-auth",
    title: {
      pt: "Farmácia Auth — Controle de acesso",
      en: "Farmácia Auth — Access control",
    },
    shortDescription: {
      pt: "Autenticação centralizada (RBAC + JWT + auditoria) para sites internos: quem acessa o quê, logs de ação e plugin que injeta a senha sem o usuário digitar.",
      en: "Centralized auth (RBAC + JWT + audit) for internal sites: who can access what, action logs, and a plugin that injects the password so users never type it.",
    },
    fullDescription: {
      pt: "Hub de autenticação e controle de acesso da Rede Estrela. Cadastramos usuários, cargos e permissões; via WebSocket/API os sites internos consomem essas regras para login e liberação de recursos específicos. Cada acesso e ação gera log auditável. Inclui painel admin (dashboard, usuários, cargos, permissões, logs), API REST documentada (login, validate, refresh, recover, reset) e um plugin que baixa/configura as senhas do usuário — setamos na aplicação e o plugin entrega a senha ao site alvo, sem anotação ou digitação. Em implantação: cerca de 70% da rede já coberta.",
      en: "Authentication and access-control hub for Rede Estrela. We register users, roles, and permissions; internal sites consume those rules over WebSocket/API for login and feature gates. Every access and action is audited. Includes an admin panel (dashboard, users, roles, permissions, logs), documented REST API (login, validate, refresh, recover, reset), and a plugin that downloads/configures user passwords — we set them in the app and the plugin injects the password into the target site so users never type or write it down. Rolling out: ~70% of the network already covered.",
    },
    context: {
      pt: "Segurança e SSO interno Farmácias Estrela (rede Sentinel). Uso interno — sem link público; prints do login, painel e docs da API.",
      en: "Internal Farmácias Estrela security / SSO (Sentinel network). No public link — screenshots of login, admin panel, and API docs.",
    },
    participation: {
      pt: "Concepção e desenvolvimento do Auth central (painel, API JWT, modelo RBAC, auditoria) e do fluxo de plugin de senhas para os sites consumidores.",
      en: "Designed and built the central Auth (panel, JWT API, RBAC model, audit) and the password-plugin flow for consumer sites.",
    },
    technicalChallenges: {
      pt: "Modelo RBAC multi-site, tokens JWT com refresh seguro, consumo em tempo real pelos apps, logs de ação e plugin de injeção de senha sem expor credenciais ao usuário final.",
      en: "Multi-site RBAC, JWT with safe refresh, real-time consumption by apps, action logs, and a password-injection plugin without exposing credentials to the end user.",
    },
    categoryId: "cat-estrela",
    areaId: "area-fs",
    creationDate: "2026-04-06",
    technologyIds: ["react", "ts", "tailwind", "node", "jwt", "rest"],
    coverImageUrl: AUTH("02-dashboard.png"),
    thumbnailUrl: AUTH("02-dashboard.png"),
    galleryImages: [
      AUTH("01-login.png"),
      AUTH("02-dashboard.png"),
      AUTH("03-cargos.png"),
      AUTH("04-usuarios.png"),
      AUTH("05-api-docs.png"),
      AUTH("06-api-tokens.png"),
    ],
    featured: true,
    published: true,
    order: 4,
    status: "published",
  },
]

const AUTO_PROJECTS: Project[] = [
  {
    id: "proj-imagens-ecommerce",
    slug: "gerenciamento-imagens-ecommerce",
    title: {
      pt: "Gerenciamento de Imagens — E-commerce",
      en: "Image management — E-commerce",
    },
    shortDescription: {
      pt: "Automação em destaque: busca imagens por EAN em farmácias pré-cadastradas, fila de aprovação, banco catalogado e aplicação no e-commerce via OpenClaw.",
      en: "Featured automation: fetch images by EAN from pre-registered pharmacies, approval queue, cataloged bank, and apply to e-commerce via OpenClaw.",
    },
    fullDescription: {
      pt: "Sistema auxiliar do e-commerce Estrela — que não oferece integração/banco para consultas. Confronta o ERP via integração com sistemas Linx com o que falta no e-commerce, dispara buscas por EAN em sites de farmácia já pré-cadastrados (Consulta Remédios, RaiaDrogasil, São João, Covabra, Amazon, etc.), baixa as imagens e abre fila de aprovação (lista + Swipe). Após aprovada, a imagem entra no banco organizado/catalogado (MinIO) e um extrator aplica automaticamente no e-commerce com OpenClaw. Automações periódicas buscam produtos novos e re-buscam gaps — garantindo que as fotos publicadas estejam corretas.",
      en: "Helper system for Estrela e-commerce — which has no integration/DB for lookups. It cross-checks the ERP through Linx systems integration against what's missing online, runs EAN searches on pre-registered pharmacy sites (Consulta Remédios, RaiaDrogasil, São João, Covabra, Amazon, etc.), downloads images, and opens an approval queue (list + Swipe). Once approved, images land in an organized catalog (MinIO) and an extractor applies them to e-commerce via OpenClaw. Periodic jobs hunt new products and re-search gaps — keeping published photos correct.",
    },
    context: {
      pt: "Operação de e-commerce / SIT Estrela. Uso interno — sem link público; prints do dashboard, consulta, revisão e banco aprovado.",
      en: "E-commerce ops / SIT Estrela. Internal use — no public link; screenshots of dashboard, query, review, and approved bank.",
    },
    participation: {
      pt: "Automação completa: confronto ERP × e-commerce, scrapers por EAN, fila de aprovação, banco de imagens e pipeline OpenClaw de publicação.",
      en: "Full automation: ERP × e-commerce gap check, EAN scrapers, approval queue, image bank, and OpenClaw publish pipeline.",
    },
    technicalChallenges: {
      pt: "E-commerce sem API/banco consultável; orquestrar fontes externas por EAN; qualidade/score; fila Swipe em volume alto; MinIO catalogado e aplicação automática via OpenClaw.",
      en: "E-commerce without a queryable API/DB; orchestrating external sources by EAN; quality scoring; high-volume Swipe queue; cataloged MinIO and automatic apply via OpenClaw.",
    },
    categoryId: "cat-auto-ops",
    areaId: "area-auto",
    creationDate: "2025-07-14",
    technologyIds: [
      "react",
      "ts",
      "tailwind",
      "node",
      "minio",
      "mssql",
      "playwright",
      "docker",
    ],
    coverImageUrl: IMAGENS("02-dashboard.png"),
    thumbnailUrl: IMAGENS("02-dashboard.png"),
    galleryImages: [
      IMAGENS("01-login.png"),
      IMAGENS("02-dashboard.png"),
      IMAGENS("03-revisao-ecommerce.png"),
      IMAGENS("04-nova-consulta.png"),
      IMAGENS("05-aprovadas.png"),
      IMAGENS("06-novidades.png"),
    ],
    featured: true,
    published: true,
    order: 0,
    status: "published",
  },
  {
    id: "proj-dba-bot",
    slug: "bot-especialista-dba",
    title: {
      pt: "Bot Especialista em DBA",
      en: "DBA Specialist bot",
    },
    shortDescription: {
      pt: "Cofre Obsidian com o banco semântico + IA: conversa informal no Telegram, gera SQL, executa e devolve o resultado (número, lista ou planilha).",
      en: "Obsidian vault with a semantic DB map + AI: informal Telegram chat, generates SQL, runs it, and returns the result (number, list, or spreadsheet).",
    },
    fullDescription: {
      pt: "Especialista DBA conversacional para a Rede Estrela. Foi montado um cofre Obsidian (.md) mapeando a estrutura semântica do banco (tabelas, relações, hubs como RC_CLI) — um grafo denso que a IA consulta sem carregar o schema inteiro a cada prompt. Em cima disso aplicamos treinamento/contexto e um modelo de IA. O bot Telegram entende pedidos informais (“vendas canceladas ontem na loja 1”, “cupons após 18h na filial 1”), confirma interpretação e SQL quando necessário, executa a consulta e devolve o melhor formato: resultado pontual, lista ou Excel com milhares de linhas. Feedback “sim/não” registra respostas boas para perguntas similares.",
      en: "Conversational DBA specialist for Rede Estrela. An Obsidian vault (.md) maps the database’s semantic structure (tables, relationships, hubs like RC_CLI) — a dense graph the AI queries without stuffing the full schema into every prompt. On top of that we applied training/context and an AI model. The Telegram bot understands informal asks (“canceled sales yesterday at store 1”, “coupons after 6pm at branch 1”), confirms interpretation and SQL when needed, runs the query, and returns the best shape: a single metric, a list, or an Excel with thousands of rows. Yes/no feedback stores good answers for similar questions.",
    },
    context: {
      pt: "Acesso a dados do ERP (SQL Server) via chat. Uso interno — sem link público; prints do grafo Obsidian e do bot Telegram.",
      en: "ERP data access (SQL Server) via chat. Internal use — no public link; screenshots of the Obsidian graph and Telegram bot.",
    },
    participation: {
      pt: "Modelagem semântica no Obsidian, pipeline de contexto/IA e bot Telegram (NL→SQL, confirmação, execução, exportação e feedback).",
      en: "Semantic modeling in Obsidian, AI/context pipeline, and Telegram bot (NL→SQL, confirm, execute, export, feedback).",
    },
    technicalChallenges: {
      pt: "Representar um ERP grande em notas linkadas sem estourar contexto da IA; NL→SQL confiável; confirmação antes de executar; exportação pesada (dezenas de milhares de linhas) e aprendizado com feedback.",
      en: "Representing a large ERP as linked notes without blowing the AI context; reliable NL→SQL; confirm-before-run; heavy exports (tens of thousands of rows); and learning from feedback.",
    },
    categoryId: "cat-auto-ops",
    areaId: "area-ai",
    creationDate: "2026-06-30",
    technologyIds: [
      "python",
      "mssql",
      "telegram",
      "obsidian",
      "openai",
      "node",
    ],
    coverImageUrl: DBA("04-telegram-planilha.png"),
    thumbnailUrl: DBA("03-grafo-completo.png"),
    galleryImages: [
      DBA("01-grafo-obsidian.png"),
      DBA("02-grafo-rc-cli.png"),
      DBA("03-grafo-completo.png"),
      DBA("04-telegram-planilha.png"),
      DBA("05-telegram-resultado.png"),
      DBA("06-telegram-confirmacao-sql.png"),
    ],
    featured: true,
    published: true,
    order: 1,
    status: "published",
  },
  {
    id: "proj-swipe-revisao",
    slug: "revisao-rapida-swipe",
    title: {
      pt: "Revisão rápida — Swipe (estilo Tinder)",
      en: "Quick review — Swipe (Tinder-style)",
    },
    shortDescription: {
      pt: "Aprovação de imagens em larga escala com UX gamificada: swipe, metas, filtros por feirão e verificação aberta de preço, nome e foto.",
      en: "Large-scale image approval with gamified UX: swipe, goals, Feirão code lists, and open verification of price, name, and photo.",
    },
    fullDescription: {
      pt: "Sistema de verificação aberta inspirado no Tinder para tornar massante o trabalho de revisar milhares de produtos. O operador vê card com imagem (fonte do site), preço, EAN, tabela e cadastro do ERP; aprova (coração) ou rejeita (X) com animações de swipe. Há metas/objetivos de sessão, filas (prioridade estoque, oferta na rede), escolha de lista de códigos para cada Feirão e confirmação de categoria no banco ao aprovar. Hoje configurado para o e-commerce interno Estrela — revisão rápida de imagem, nome e preço de forma divertida e eficiente.",
      en: "Open verification system inspired by Tinder to make reviewing thousands of products less draining. Operators see a card with the image (site source), price, EAN, list price, and ERP name; they approve (heart) or reject (X) with swipe animations. Session goals, queues (stock priority, network offers), Feirão-specific code lists, and a category confirm step on approve. Currently wired for Estrela’s internal e-commerce — fast, fun review of image, name, and price.",
    },
    context: {
      pt: "Operação de e-commerce / Feirões. Uso interno — sem link público; prints do swipe e do modal de aprovação.",
      en: "E-commerce / Feirão ops. Internal use — no public link; screenshots of swipe and the approve modal.",
    },
    participation: {
      pt: "UX gamificada de revisão em massa (swipe, filas, metas) integrada ao fluxo de imagens do e-commerce.",
      en: "Gamified mass-review UX (swipe, queues, goals) integrated with the e-commerce image flow.",
    },
    technicalChallenges: {
      pt: "Fila de dezenas de milhares de itens com sessão limitada; gestos/animações tipo Tinder; filtros por prioridade e lista de EANs de feirão; confirmação de categoria sem perder ritmo.",
      en: "Tens-of-thousands queue with capped sessions; Tinder-like gestures/animations; priority filters and Feirão EAN lists; category confirm without breaking flow.",
    },
    categoryId: "cat-auto-ops",
    areaId: "area-ux",
    creationDate: "2025-08-01",
    technologyIds: ["react", "ts", "tailwind", "motion", "node"],
    coverImageUrl: SWIPE("01-revisao-rapida.png"),
    thumbnailUrl: SWIPE("01-revisao-rapida.png"),
    galleryImages: [
      SWIPE("01-revisao-rapida.png"),
      SWIPE("02-aprovar-categoria.png"),
    ],
    featured: false,
    published: true,
    order: 2,
    status: "published",
  },
]

const INFRA_PROJECTS: Project[] = [
  {
    id: "proj-nexus-estrela",
    slug: "nexus-estrela",
    title: {
      pt: "Nexus Estrela — Centro de comando",
      en: "Nexus Estrela — Command center",
    },
    shortDescription: {
      pt: "Plataforma web + bot Telegram para monitorar infra da rede, SSH remoto, vendas em tempo real e dependências críticas (PIX, TEF, sistemas internos).",
      en: "Web platform + Telegram bot to monitor network infra, remote SSH, real-time sales, and critical dependencies (PIX, TEF, internal systems).",
    },
    fullDescription: {
      pt: "Centro de comando operacional da Rede Estrela: acompanha saúde de servidores e filiais (CPU, RAM, ping, Docker, banco, uptime), mapeia o CPD e as lojas em visão compacta/flow, e concentra alertas críticos. Via web é possível abrir SSH no browser, rodar comandos rápidos (restart, start, backup, logs, speed test) e agir na filial com confirmação. O bot Telegram (EstreleTI / Nexus) espelha consultas e ações — status, filiais, críticas, vendas, cupons, ping, docker, logs e testes em servidor — para operar de qualquer lugar. Vendas e cupons chegam conciliados quase em tempo real, com alertas visuais (e sonoros no painel) quando a operação para. Também mapeia dependências da rede (PIX, Rede TEF, sistemas internos) para detectar na hora quando um elo cai.",
      en: "Operational command center for Rede Estrela: tracks server and branch health (CPU, RAM, ping, Docker, DB, uptime), maps the data center and stores in compact/flow views, and centralizes critical alerts. From the web you can open SSH in the browser, run quick commands (restart, start, backup, logs, speed test), and act on a branch with confirmation. The Telegram bot (EstreleTI / Nexus) mirrors queries and actions — status, branches, criticals, sales, coupons, ping, docker, logs, and server tests — so you can operate from anywhere. Sales and coupons stream in near real time, with visual (and audible) alerts when operations stall. It also maps network dependencies (PIX, TEF, internal systems) to spot outages the moment a link fails.",
    },
    context: {
      pt: "Operação de TI da Rede Estrela (CPD + filiais). Uso interno — sem link público; prints do painel web e do bot Telegram.",
      en: "Rede Estrela IT operations (data center + branches). Internal use only — no public link; screenshots of the web panel and Telegram bot.",
    },
    participation: {
      pt: "Concepção e desenvolvimento do centro de comando web, integração com métricas de infra/vendas, SSH via web e bot Telegram de monitoramento e ações remotas.",
      en: "Designed and built the web command center, infra/sales metrics integration, browser SSH, and the Telegram bot for monitoring and remote actions.",
    },
    technicalChallenges: {
      pt: "Telemetria multi-filial em tempo quase real, SSH seguro pelo browser, ações remotas com confirmação, bot com consultas e comandos destrutivos guardados, e correlação infra × vendas/cupons para alertar queda operacional.",
      en: "Near real-time multi-branch telemetry, secure browser SSH, remote actions with confirmation, a bot mixing queries and gated destructive commands, and correlating infra with sales/coupons to alert on operational stalls.",
    },
    categoryId: "cat-infra",
    areaId: "area-infra",
    creationDate: "2026-03-01",
    technologyIds: [
      "react",
      "ts",
      "tailwind",
      "node",
      "linux",
      "docker",
      "mssql",
      "nginx",
    ],
    coverImageUrl: NEXUS("01-compacto.png"),
    thumbnailUrl: NEXUS("01-compacto.png"),
    galleryImages: [
      NEXUS("01-compacto.png"),
      NEXUS("02-flow.png"),
      NEXUS("03-filial-detalhe.png"),
      NEXUS("04-ssh-web.png"),
      NEXUS("05-telegram-comandos.png"),
      NEXUS("06-telegram-status.png"),
    ],
    featured: true,
    published: true,
    order: 0,
    status: "published",
  },
  {
    id: "proj-instalador-estrela",
    slug: "instalador-estrela",
    title: {
      pt: "Instalador Estrela — Automação de infra",
      en: "Instalador Estrela — Infra automation",
    },
    shortDescription: {
      pt: "CLI de TI: instala sistemas locais, padroniza a máquina, testa, auto-repara PDV (logs, COM, spooler) e dispara reparo remoto pelo painel.",
      en: "IT CLI: installs local systems, standardizes PCs, self-tests, auto-heals POS (logs, COM, spooler), and runs remote repair from the panel.",
    },
    fullDescription: {
      pt: "Central de TI em console (Instalador Estrela) para automação de serviços simples de infra. Instala e configura PDV, impressoras, TEF, módulos de integração com sistemas Linx, Orçamento, Depósito/WMS, DeskManager e convênios; formata a máquina aos padrões da empresa (apps, wallpaper, usuários, hostname, OS, Microsoft). Executa verificações sozinho e corrige para o padrão operacional. No PDV, bot de auto-cura na inicialização: limpa logs e temporários, detecta mudança de porta COM e reconfigura o caixa, identifica problemas conhecidos (spooler travado e outros que param o Windows/PDV). Quando o painel alerta e o caso já está mapeado, o reparo remoto inicia e o PC se corrige sozinho.",
      en: "Console IT hub (Instalador Estrela) for simple infra service automation. Installs and configures POS, printers, TEF, Linx systems integration modules, budgeting, warehouse/WMS, DeskManager, and insurers; formats PCs to company standards (apps, wallpaper, users, hostname, OS, Microsoft). Runs self-checks and heals back to the operational baseline. On POS boot, an auto-heal bot clears logs/temps, detects COM port changes and reconfigures the till, and recognizes known failures (stuck spooler and other Windows issues that stop the POS). When the panel alerts and the case is mapped, remote repair starts and the PC fixes itself.",
    },
    context: {
      pt: "Operação de campo / CPD Rede Estrela. Uso interno — sem link público; prints do menu CLI (sistemas, máquina, impressoras).",
      en: "Field / data-center ops at Rede Estrela. Internal use — no public link; screenshots of the CLI menus (systems, machine, printers).",
    },
    participation: {
      pt: "Desenvolvimento do instalador/central de TI, galhos estáveis, rotinas de instalação e o fluxo de auto-cura / reparo remoto do PDV.",
      en: "Built the IT installer hub, stable branches, install routines, and the POS auto-heal / remote-repair flow.",
    },
    technicalChallenges: {
      pt: "Menus por tecla sem Enter, instalação idempotente multi-filial, detecção de COM/spooler, logs por máquina e reparo remoto seguro quando o problema já está catalogado.",
      en: "Keypress menus (no Enter), idempotent multi-branch installs, COM/spooler detection, per-machine logs, and safe remote repair when the issue is already cataloged.",
    },
    categoryId: "cat-infra",
    areaId: "area-infra",
    creationDate: "2025-09-01",
    technologyIds: ["winserver", "powershell", "python", "docker"],
    coverImageUrl: INSTALADOR("01-menu-principal.png"),
    thumbnailUrl: INSTALADOR("01-menu-principal.png"),
    galleryImages: [
      INSTALADOR("01-menu-principal.png"),
      INSTALADOR("02-sistemas-estrela.png"),
      INSTALADOR("03-maquina.png"),
      INSTALADOR("04-impressoras.png"),
    ],
    featured: false,
    published: true,
    order: 1,
    status: "published",
  },
]

const WORKING_PROJECTS: Project[] = [
  {
    id: "proj-fluxo-n8n",
    slug: "fluxo-n8n",
    title: {
      pt: "Fluxo n8n",
      en: "n8n Flow",
    },
    shortDescription: {
      pt: "Em andamento: automatizando processos com IA, com foco em soluções financeiras e fiscais para reduzir trabalho manual.",
      en: "In progress: automating processes with AI, focused on financial and fiscal solutions to cut manual work.",
    },
    fullDescription: {
      pt: "Projeto em andamento de automação de processos com n8n e IA. O objetivo é orquestrar fluxos que conectam sistemas, dados e decisões — com ênfase em soluções financeiras e fiscais — para reduzir retrabalho, erros e tempo operacional. Inclui integração com sistemas Linx e familiaridade com integrações ERP para puxar, validar e acionar informações no momento certo.",
      en: "Ongoing process-automation project with n8n and AI. The goal is to orchestrate flows that connect systems, data, and decisions — with emphasis on financial and fiscal solutions — to reduce rework, errors, and operational time. It includes Linx systems integration and familiarity with ERP integrations to pull, validate, and trigger information at the right moment.",
    },
    context: {
      pt: "Automação operacional em evolução — ainda sem demo pública; o portfólio registra o foco e o estágio do trabalho.",
      en: "Operational automation in progress — no public demo yet; the portfolio records the focus and current stage.",
    },
    participation: {
      pt: "Desenho e implementação dos fluxos n8n, integração com dados/ERP e aplicação de IA para apoiar decisões financeiras e fiscais.",
      en: "Designing and implementing n8n flows, data/ERP integration, and applying AI to support financial and fiscal decisions.",
    },
    technicalChallenges: {
      pt: "Orquestrar integrações confiáveis, tratar dados sensíveis financeiros/fiscais e usar IA com contexto operacional sem aumentar complexidade para o usuário.",
      en: "Orchestrating reliable integrations, handling sensitive financial/fiscal data, and using AI with operational context without adding complexity for the user.",
    },
    categoryId: "cat-auto",
    areaId: "area-auto",
    creationDate: "2026-07-01",
    technologyIds: ["n8n", "openai", "node", "python", "mssql", "rest"],
    coverImageUrl: "/projects/fluxo-n8n.svg",
    thumbnailUrl: "/projects/fluxo-n8n.svg",
    galleryImages: ["/projects/fluxo-n8n.svg"],
    featured: false,
    published: true,
    order: 0,
    status: "published",
    workingOn: true,
  },
]

export const SEED_PROJECTS: Project[] = [
  ...WORKING_PROJECTS,
  ...AUTO_PROJECTS,
  ...ESTRELA_SYSTEMS,
  ...INFRA_PROJECTS,
  ...LEGACY_FROM_PORTFOLIO,
]
