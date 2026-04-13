import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { SectionReveal } from "@/components/motion/section-reveal"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectDetailSheet } from "@/components/projects/project-detail-sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePortfolioStore } from "@/app/portfolio-store"
import { fetchPublishedProjects } from "@/lib/api-mock"
import { pickBilingual } from "@/lib/i18n-utils"

export function ProjectsPage() {
  const { t, i18n } = useTranslation()
  const { projects, categories, areas, technologies } = usePortfolioStore()
  const [categoryId, setCategoryId] = useState<string>("all")
  const [technologyId, setTechnologyId] = useState<string>("all")
  const [search, setSearch] = useState("")
  const [sheetId, setSheetId] = useState<string | null>(null)

  const filters = useMemo(
    () => ({
      categoryId: categoryId === "all" ? undefined : categoryId,
      technologyId: technologyId === "all" ? undefined : technologyId,
      search: search.trim() || undefined,
    }),
    [categoryId, technologyId, search],
  )

  const { data: list = [], isLoading } = useQuery({
    queryKey: ["projects", projects, filters],
    queryFn: () => fetchPublishedProjects(projects, filters),
  })

  const sheetProject = sheetId
    ? projects.find((p) => p.id === sheetId) ?? null
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
          {t("projects.title")}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {t("projects.subtitle")}
        </p>
      </SectionReveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="search">{t("common.search")}</Label>
          <Input
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="…"
          />
        </div>
        <div className="space-y-2">
          <Label>{t("projects.category")}</Label>
          <Select
            value={categoryId}
            onValueChange={(v) => v && setCategoryId(v)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.all")}</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {pickBilingual(c.name, i18n.language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("projects.stack")}</Label>
          <Select
            value={technologyId}
            onValueChange={(v) => v && setTechnologyId(v)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.all")}</SelectItem>
              {technologies.map((tech) => (
                <SelectItem key={tech.id} value={tech.id}>
                  {tech.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <p className="mt-12 text-center text-muted-foreground">
          {t("common.loading")}
        </p>
      ) : list.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          {t("projects.empty")}
        </p>
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
