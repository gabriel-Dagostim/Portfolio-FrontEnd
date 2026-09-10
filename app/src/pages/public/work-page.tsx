import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Search, X } from "lucide-react"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectDialog } from "@/components/projects/project-dialog"
import { PageContainer, PageHeader } from "@/components/site/page-header"
import { Button } from "@/components/ui/button"
import { usePortfolioStore } from "@/app/portfolio-store"
import { useProjectDialog } from "@/hooks/use-project-dialog"
import { selectProjects } from "@/lib/api-mock"
import { pickLocalized } from "@/lib/i18n-utils"
import { cn } from "@/lib/utils"

type Tab = "published" | "working"

export function WorkPage() {
  const { t, i18n } = useTranslation()
  const { projects, categories, technologies } = usePortfolioStore()
  const dialog = useProjectDialog()

  const [tab, setTab] = useState<Tab>("published")
  const [categoryId, setCategoryId] = useState("all")
  const [search, setSearch] = useState("")

  const list = useMemo(
    () =>
      selectProjects(projects, {
        categoryId: categoryId === "all" ? undefined : categoryId,
        search,
        workingOn: tab === "working",
      }),
    [projects, categoryId, search, tab],
  )

  /** Only offer categories that actually have something in this tab. */
  const usedCategories = useMemo(() => {
    const inTab = selectProjects(projects, { workingOn: tab === "working" })
    const ids = new Set(inTab.map((p) => p.categoryId))
    return categories.filter((c) => ids.has(c.id))
  }, [projects, categories, tab])

  const filtered = categoryId !== "all" || search.trim().length > 0

  return (
    <>
      <PageContainer>
        <PageHeader
          title={t("projects.title")}
          lead={t("projects.lead")}
          aside={
            <div className="inline-flex border border-rule">
              {(
                [
                  { id: "published", label: t("projects.tabPublished") },
                  { id: "working", label: t("projects.tabWorking") },
                ] as const
              ).map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setTab(item.id)
                    setCategoryId("all")
                  }}
                  aria-pressed={tab === item.id}
                  className={cn(
                    "px-4 py-2 text-sm transition-colors",
                    index > 0 && "border-l border-rule",
                    tab === item.id
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-surface-sunken hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          }
        />

        <div className="flex flex-col gap-4 border-b border-rule py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            <FilterChip
              active={categoryId === "all"}
              onClick={() => setCategoryId("all")}
            >
              {t("common.all")}
            </FilterChip>
            {usedCategories.map((category) => (
              <FilterChip
                key={category.id}
                active={categoryId === category.id}
                onClick={() => setCategoryId(category.id)}
              >
                {pickLocalized(category.name, i18n.language)}
              </FilterChip>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 border border-rule px-3 py-1.5 focus-within:border-primary">
              <Search className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="sr-only">{t("common.search")}</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("common.search")}
                className="w-36 bg-transparent text-sm outline-none placeholder:text-muted-foreground sm:w-48"
              />
            </label>
            <span className="type-data whitespace-nowrap text-xs text-muted-foreground">
              {t("projects.resultCount", { count: list.length })}
            </span>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-muted-foreground">
              {tab === "working"
                ? t("projects.workingEmpty")
                : t("projects.empty")}
            </p>
            {filtered ? (
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setCategoryId("all")
                  setSearch("")
                }}
              >
                <X className="size-3.5" />
                {t("projects.clearFilters")}
              </Button>
            ) : null}
          </div>
        ) : (
          <div className="my-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-7 lg:grid-cols-3">
            {list.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                category={categories.find((c) => c.id === project.categoryId)}
                techs={technologies.filter((x) =>
                  project.technologyIds.includes(x.id),
                )}
                onOpen={() => dialog.openProject(project.id)}
              />
            ))}
          </div>
        )}
      </PageContainer>

      <ProjectDialog
        project={dialog.project}
        open={dialog.open}
        onOpenChange={dialog.onOpenChange}
        category={dialog.category}
        area={dialog.area}
        techs={dialog.techs}
      />
    </>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-sm border px-2.5 py-1 text-xs transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-rule text-muted-foreground hover:border-rule-strong hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}
