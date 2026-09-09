import { useCallback, useMemo, useState } from "react"
import { usePortfolioStore } from "@/app/portfolio-store"

/**
 * Every listing opens the same dialog, so the lookup lives here instead of
 * being repeated on each page.
 */
export function useProjectDialog() {
  const { projects, categories, areas, technologies } = usePortfolioStore()
  const [openId, setOpenId] = useState<string | null>(null)

  const close = useCallback(() => setOpenId(null), [])

  const selection = useMemo(() => {
    const project = openId ? (projects.find((p) => p.id === openId) ?? null) : null
    if (!project) {
      return { project: null, category: undefined, area: undefined, techs: [] }
    }
    return {
      project,
      category: categories.find((c) => c.id === project.categoryId),
      area: areas.find((a) => a.id === project.areaId),
      techs: technologies.filter((x) => project.technologyIds.includes(x.id)),
    }
  }, [openId, projects, categories, areas, technologies])

  return {
    ...selection,
    open: Boolean(selection.project),
    openProject: setOpenId,
    close,
    onOpenChange: (next: boolean) => {
      if (!next) close()
    },
  }
}
