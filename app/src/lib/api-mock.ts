import type { Project, ProjectStatus } from "@/types"

export type ProjectFilters = {
  categoryId?: string
  areaId?: string
  technologyId?: string
  search?: string
  /** true = only work in progress; false/undefined = everything else. */
  workingOn?: boolean
}

function matchesSearch(project: Project, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const haystack = [
    project.title.en,
    project.title.pt,
    project.title.es,
    project.shortDescription.en,
    project.shortDescription.pt,
    project.shortDescription.es,
    project.slug,
  ]
  return haystack.some((value) => value.toLowerCase().includes(q))
}

/** Pure, synchronous filtering — the data already lives in the store. */
export function selectProjects(
  projects: Project[],
  filters: ProjectFilters = {},
): Project[] {
  return projects
    .filter((p) => p.published && p.status === "published")
    .filter((p) => (filters.workingOn === true ? p.workingOn : !p.workingOn))
    .filter((p) => !filters.categoryId || p.categoryId === filters.categoryId)
    .filter((p) => !filters.areaId || p.areaId === filters.areaId)
    .filter(
      (p) =>
        !filters.technologyId ||
        p.technologyIds.includes(filters.technologyId),
    )
    .filter((p) => matchesSearch(p, filters.search ?? ""))
    .sort((a, b) => a.order - b.order)
}

export function findProjectBySlug(
  projects: Project[],
  slug: string,
): Project | null {
  const project = projects.find((p) => p.slug === slug)
  if (!project || !project.published || project.status !== "published") {
    return null
  }
  return project
}

/**
 * The admin is a local content editor, not a security boundary — the site is
 * static and every visitor already has the whole dataset in their bundle.
 */
export const ADMIN_PASSWORD = "GHDSSUPREMO"

export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function nextProjectId(projects: Project[]): string {
  const max = projects.reduce((acc, p) => {
    const n = Number.parseInt(p.id.replace(/\D/g, ""), 10)
    return Number.isFinite(n) ? Math.max(acc, n) : acc
  }, 0)
  return `proj-${max + 1}`
}

export const PROJECT_STATUSES: ProjectStatus[] = [
  "draft",
  "published",
  "archived",
]
