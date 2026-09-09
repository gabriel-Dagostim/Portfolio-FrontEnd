export type LocaleCode = "en" | "pt-BR" | "es"

/** Every visitor-facing string carries all three languages. */
export type Localized = {
  en: string
  pt: string
  es: string
}

/** Legacy alias — the store held two languages before Spanish was added. */
export type Bilingual = Localized

export type ProjectStatus = "draft" | "published" | "archived"

export type Project = {
  id: string
  slug: string
  title: Localized
  shortDescription: Localized
  fullDescription: Localized
  /** The case: client, setting, why it exists. */
  context?: Localized
  /** What Gabriel personally did on it. */
  participation?: Localized
  technicalChallenges?: Localized
  categoryId: string
  areaId: string
  creationDate: string
  technologyIds: string[]
  githubUrl?: string
  liveUrl?: string
  coverImageUrl: string
  thumbnailUrl: string
  galleryImages: string[]
  featured: boolean
  published: boolean
  order: number
  status: ProjectStatus
  /** Still being built — listed under the "In progress" tab. */
  workingOn?: boolean
}

export type Category = {
  id: string
  name: Localized
  /** Internal product with no public URL — screenshots carry the case. */
  showcaseOnly?: boolean
}

export type AreaOfWork = {
  id: string
  name: Localized
}

export type Technology = {
  id: string
  name: string
}

/* ── Editable site content ────────────────────────────────────────────────
   Everything below is seeded from the live copy and editable in the admin,
   so the site can be rewritten without touching code. */

export type ProfileContent = {
  fullName: string
  shortName: string
  birthDate: string
  location: Localized
  role: Localized
  headline: Localized
  summary: Localized
  photoUrl: string
}

export type ContactContent = {
  email: string
  phoneDisplay: string
  whatsappE164: string
  linkedinUrl: string
  githubUrl: string
  portfolioUrl: string
}

export type StatusLine = {
  id: string
  label: Localized
  value: Localized
  /** Drives the status glyph in the hero panel. */
  state: "live" | "shipped" | "building"
}

export type CareerEntry = {
  id: string
  kind: "work" | "education"
  org: string
  logoUrl: string
  logoFit: "contain" | "cover"
  period: Localized
  /** Sort key — higher is more recent. */
  startYear: number
  title: Localized
  body: Localized
  tags: Localized[]
  current?: boolean
}

export type SkillGroup = {
  id: string
  title: Localized
  body: Localized
  items: string[]
}

export type LanguageSkill = {
  id: string
  name: Localized
  level: Localized
  /** 1–5, rendered as a discrete meter. */
  proficiency: number
}

export type FlowStep = {
  id: string
  title: Localized
  role: Localized
  body: Localized
  practice: Localized
  /** Feeds the loop-back arrows on the pipeline. */
  loopsBack?: boolean
}

export type SiteContent = {
  profile: ProfileContent
  contact: ContactContent
  status: StatusLine[]
  career: CareerEntry[]
  skills: SkillGroup[]
  languages: LanguageSkill[]
  flow: FlowStep[]
}

export type SiteSettings = {
  defaultLocale: LocaleCode
  defaultTheme: "light" | "dark" | "system"
  featuredProjectId: string | null
  /** Project ids pinned to the home page, in order. */
  homeFeaturedIds: string[]
}
