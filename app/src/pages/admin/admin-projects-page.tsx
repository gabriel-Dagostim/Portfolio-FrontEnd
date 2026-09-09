import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { ArrowDown, ArrowUp, Pencil, Plus, Search, Trash2 } from "lucide-react"
import {
  AdminPage,
  EmptyState,
  useConfirmedDelete,
} from "@/components/admin/admin-ui"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { usePortfolioStore } from "@/app/portfolio-store"
import { pickLocalized } from "@/lib/i18n-utils"
import { cn } from "@/lib/utils"

export function AdminProjectsPage() {
  const { t, i18n } = useTranslation()
  const { projects, categories, deleteProject, reorderProjects } =
    usePortfolioStore()
  const confirmDelete = useConfirmedDelete()
  const [search, setSearch] = useState("")
  const lang = i18n.language

  const ordered = useMemo(
    () => [...projects].sort((a, b) => a.order - b.order),
    [projects],
  )

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return ordered
    return ordered.filter(
      (p) =>
        p.slug.includes(query) ||
        pickLocalized(p.title, lang).toLowerCase().includes(query),
    )
  }, [ordered, search, lang])

  /** Reordering swaps neighbours in the full list, never the filtered view. */
  function move(id: string, direction: -1 | 1) {
    const index = ordered.findIndex((p) => p.id === id)
    const target = index + direction
    if (index === -1 || target < 0 || target >= ordered.length) return
    const next = [...ordered]
    ;[next[index], next[target]] = [next[target], next[index]]
    reorderProjects(next.map((p) => p.id))
  }

  return (
    <AdminPage
      title={t("admin.projects")}
      lead={t("admin.projectsLead")}
      actions={
        <Link to="/admin/projects/new" className={cn(buttonVariants({ size: "sm" }))}>
          <Plus className="size-3.5" />
          {t("admin.newProject")}
        </Link>
      }
    >
      <label className="mb-4 flex max-w-sm items-center gap-2 border border-rule px-3 py-1.5 focus-within:border-primary">
        <Search className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="sr-only">{t("common.search")}</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t("common.search")}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </label>

      {visible.length === 0 ? (
        <EmptyState message={t("admin.empty")} />
      ) : (
        <ul className="border border-rule bg-surface">
          {visible.map((project, index) => {
            const category = categories.find((c) => c.id === project.categoryId)
            const title = pickLocalized(project.title, lang) || project.slug
            return (
              <li
                key={project.id}
                className="flex items-center gap-3 border-b border-rule px-3 py-2.5 last:border-b-0"
              >
                <img
                  src={project.thumbnailUrl}
                  alt=""
                  loading="lazy"
                  className="hidden h-9 w-14 shrink-0 border border-rule object-cover object-top sm:block"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{title}</p>
                  <p className="type-data truncate text-xs text-muted-foreground">
                    {project.slug}
                    {category
                      ? ` · ${pickLocalized(category.name, lang)}`
                      : ""}
                  </p>
                </div>

                <div className="hidden shrink-0 items-center gap-1.5 md:flex">
                  {project.workingOn ? (
                    <Badge variant="signal">{t("admin.workingOn")}</Badge>
                  ) : null}
                  {project.featured ? (
                    <Badge variant="secondary">{t("admin.featured")}</Badge>
                  ) : null}
                  <Badge variant={project.published ? "muted" : "outline"}>
                    {project.published
                      ? t("admin.statusPublished")
                      : t("admin.statusDraft")}
                  </Badge>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={index === 0}
                    onClick={() => move(project.id, -1)}
                    aria-label={`${t("admin.order")} −`}
                  >
                    <ArrowUp className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={index === visible.length - 1}
                    onClick={() => move(project.id, 1)}
                    aria-label={`${t("admin.order")} +`}
                  >
                    <ArrowDown className="size-3.5" />
                  </Button>
                  <Link
                    to={`/admin/projects/${project.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon-sm" }),
                    )}
                    aria-label={t("admin.editProject")}
                  >
                    <Pencil className="size-3.5" />
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() =>
                      confirmDelete(title, () => deleteProject(project.id))
                    }
                    aria-label={t("common.delete")}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </AdminPage>
  )
}
