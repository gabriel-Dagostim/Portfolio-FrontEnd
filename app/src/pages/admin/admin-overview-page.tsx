import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import {
  Briefcase,
  Contact,
  ExternalLink,
  FolderKanban,
  GitBranch,
  Pencil,
  Plus,
  Sparkles,
  UserRound,
} from "lucide-react"
import { AdminPage, Panel } from "@/components/admin/admin-ui"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { usePortfolioStore } from "@/app/portfolio-store"
import { pickLocalized } from "@/lib/i18n-utils"
import { cn } from "@/lib/utils"

const SHORTCUTS = [
  { to: "/admin/profile", icon: UserRound, labelKey: "admin.profile" },
  { to: "/admin/career", icon: Briefcase, labelKey: "admin.career" },
  { to: "/admin/skills", icon: Sparkles, labelKey: "admin.skillsNav" },
  { to: "/admin/flow", icon: GitBranch, labelKey: "admin.flowNav" },
  { to: "/admin/contact", icon: Contact, labelKey: "admin.contactNav" },
  { to: "/admin/projects", icon: FolderKanban, labelKey: "admin.projects" },
] as const

export function AdminOverviewPage() {
  const { t, i18n } = useTranslation()
  const { projects, content } = usePortfolioStore()

  const published = projects.filter(
    (p) => p.published && p.status === "published",
  )
  const drafts = projects.filter((p) => !p.published || p.status === "draft")

  const stats = [
    { label: t("admin.statTotal"), value: projects.length },
    { label: t("admin.statPublished"), value: published.length },
    { label: t("admin.statDrafts"), value: drafts.length },
    {
      label: t("admin.statFeatured"),
      value: projects.filter((p) => p.featured).length,
    },
    { label: t("admin.statCareer"), value: content.career.length },
    { label: t("admin.statSkills"), value: content.skills.length },
  ]

  const recent = [...projects].sort((a, b) => a.order - b.order).slice(0, 6)

  return (
    <AdminPage
      title={t("admin.overviewTitle")}
      lead={t("admin.overviewLead")}
      actions={
        <>
          <Link to="/admin/projects/new" className={cn(buttonVariants({ size: "sm" }))}>
            <Plus className="size-3.5" />
            {t("admin.newProject")}
          </Link>
          <Link
            to="/"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <ExternalLink className="size-3.5" />
            {t("admin.backToSite")}
          </Link>
        </>
      }
    >
      <div className="space-y-6">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface px-4 py-3">
              <dd className="type-data text-2xl">{stat.value}</dd>
              <dt className="mt-1 text-xs leading-4 text-muted-foreground">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        <Panel title={t("admin.jumpTo")}>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-7 lg:grid-cols-3">
            {SHORTCUTS.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.to} className="border border-rule bg-surface">
                  <Link
                    to={item.to}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm transition-colors hover:bg-surface-sunken"
                  >
                    <Icon className="size-4 text-muted-foreground" />
                    {t(item.labelKey)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </Panel>

        <Panel title={t("admin.recent")}>
          <ul className="divide-y divide-rule">
            {recent.map((project) => (
              <li
                key={project.id}
                className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {pickLocalized(project.title, i18n.language)}
                  </p>
                  <p className="type-data truncate text-xs text-muted-foreground">
                    {project.slug}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {project.featured ? (
                    <Badge variant="secondary" className="hidden sm:inline-flex">
                      {t("admin.featured")}
                    </Badge>
                  ) : null}
                  <Badge variant={project.published ? "muted" : "outline"}>
                    {project.published
                      ? t("admin.statusPublished")
                      : t("admin.statusDraft")}
                  </Badge>
                  <Link
                    to={`/admin/projects/${project.id}`}
                    className="rounded-sm border border-rule p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={t("admin.editProject")}
                  >
                    <Pencil className="size-3.5" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AdminPage>
  )
}
