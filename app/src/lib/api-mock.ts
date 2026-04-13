import type { Project, ProjectStatus } from "@/types"

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export type ProjectListFilters = {
  categoryId?: string
  technologyId?: string
  search?: string
  includeUnpublished?: boolean
}

export async function fetchPublishedProjects(
  projects: Project[],
  filters: ProjectListFilters = {},
): Promise<Project[]> {
  await delay(180)
  let list = projects.filter((p) => p.published && p.status === "published")
  if (filters.includeUnpublished) {
    list = [...projects]
  }
  if (filters.categoryId) {
    list = list.filter((p) => p.categoryId === filters.categoryId)
  }
  const techId = filters.technologyId
  if (techId) {
    list = list.filter((p) => p.technologyIds.includes(techId))
  }
  if (filters.search?.trim()) {
    const q = filters.search.trim().toLowerCase()
    list = list.filter(
      (p) =>
        p.title.pt.toLowerCase().includes(q) ||
        p.title.en.toLowerCase().includes(q) ||
        p.shortDescription.pt.toLowerCase().includes(q) ||
        p.shortDescription.en.toLowerCase().includes(q),
    )
  }
  return [...list].sort((a, b) => a.order - b.order)
}

export async function fetchProjectBySlug(
  projects: Project[],
  slug: string,
  opts?: { includeDrafts?: boolean },
): Promise<Project | null> {
  await delay(120)
  const p = projects.find((x) => x.slug === slug)
  if (!p) return null
  if (!opts?.includeDrafts && (!p.published || p.status !== "published")) {
    return null
  }
  return p
}

export async function mockLogin(password: string): Promise<boolean> {
  await delay(400)
  return password === "demo"
}

export function nextProjectId(projects: Project[]): string {
  const n = projects.reduce((max, p) => {
    const m = Number.parseInt(p.id.replace(/\D/g, ""), 10)
    return Number.isFinite(m) ? Math.max(max, m) : max
  }, 0)
  return `proj-${n + 1}`
}

export const PROJECT_STATUSES: ProjectStatus[] = [
  "draft",
  "published",
  "archived",
]
