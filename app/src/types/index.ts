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
  /** Projeto em andamento — aparece na aba “Working on” de Projetos */
  workingOn?: boolean
}

export type Category = {
  id: string
  name: Bilingual
  /**
   * Projetos internos sem link público — o detalhe é a galeria
   * (prints em sequência conforme o visitante rola a página).
   */
  showcaseOnly?: boolean
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
