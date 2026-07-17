import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import { SectionReveal } from "@/components/motion/section-reveal"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectDetailSheet } from "@/components/projects/project-detail-sheet"
import { usePortfolioStore } from "@/app/portfolio-store"
import { fetchPublishedProjects } from "@/lib/api-mock"

type Props = {
  titleKey: string
  subtitleKey: string
  emptyKey: string
  /** Filtra por categoryId (ex.: cat-estrela, cat-auto-ops, cat-infra). */
  categoryId?: string
  /** Filtra por areaId (ex.: area-infra). */
  areaId?: string
}

export function FilteredProjectsSection({
  titleKey,
  subtitleKey,
  emptyKey,
  categoryId,
  areaId,
}: Props) {
  const { t } = useTranslation()
  const { projects, categories, areas, technologies } = usePortfolioStore()
  const [sheetId, setSheetId] = useState<string | null>(null)

  const filters = useMemo(
    () => ({
      categoryId,
    }),
    [categoryId],
  )

  const { data: list = [], isLoading } = useQuery({
    queryKey: ["projects-filtered", projects, filters, areaId],
    queryFn: async () => {
      const base = await fetchPublishedProjects(projects, filters)
      if (!areaId) return base
      return base.filter((p) => p.areaId === areaId)
    },
  })

  const sheetProject = sheetId
    ? (projects.find((p) => p.id === sheetId) ?? null)
    : null
  const sheetCategory = sheetProject
    ? categories.find((c) => c.id === sheetProject.categoryId)
    : undefined
  const sheetArea = sheetProject
    ? areas.find((a) => a.id === sheetProject.areaId)
    : undefined
  const sheetTechs = sheetProject
    ? technologies.filter((x) => sheetProject.technologyIds.includes(x.id))
    : []

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionReveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t(titleKey)}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t(subtitleKey)}</p>
      </SectionReveal>

      {isLoading ? (
        <p className="mt-12 text-center text-muted-foreground">
          {t("common.loading")}
        </p>
      ) : list.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">{t(emptyKey)}</p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              category={categories.find((c) => c.id === p.categoryId)}
              techs={technologies.filter((x) => p.technologyIds.includes(x.id))}
              onOpen={() => setSheetId(p.id)}
            />
          ))}
        </div>
      )}

      <ProjectDetailSheet
        project={sheetProject}
        open={Boolean(sheetProject)}
        onOpenChange={(o) => {
          if (!o) setSheetId(null)
        }}
        category={sheetCategory}
        area={sheetArea}
        techs={sheetTechs}
      />
    </div>
  )
}
