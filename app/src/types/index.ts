export type LocaleCode = "pt-BR" | "en"

export type Bilingual = {
  pt: string
  en: string
}

export type ProjectStatus = "draft" | "published" | "archived"

export type Project = {
  id: string
  slug: string
  title: Bilingual
  shortDescription: Bilingual
  fullDescription: Bilingual
  /** Contexto do projeto (case / cliente) */
  context?: Bilingual
  /** Sua participação */
  participation?: Bilingual
  /** Desafios técnicos */
  technicalChallenges?: Bilingual
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
}

export type Category = {
  id: string
  name: Bilingual
}

export type AreaOfWork = {
  id: string
  name: Bilingual
}

export type Technology = {
  id: string
  name: string
}

export type SiteSettings = {
  defaultLocale: LocaleCode
  defaultTheme: "light" | "dark" | "system"
  featuredProjectId: string | null
}
