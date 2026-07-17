import { useTranslation } from "react-i18next"
import {
  FolderKanban,
  Tags,
  Cpu,
  Plus,
  ExternalLink,
  Pencil,
  Sparkles,
  FileText,
  Star,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RouterLinkButton } from "@/components/ui/link-button"
import { Badge } from "@/components/ui/badge"
import { usePortfolioStore } from "@/app/portfolio-store"
import { pickBilingual } from "@/lib/i18n-utils"

export function AdminDashboardPage() {
  const { t, i18n } = useTranslation()
  const { projects, categories, technologies } = usePortfolioStore()

  const published = projects.filter(
    (p) => p.published && p.status === "published",
  ).length
  const drafts = projects.filter(
    (p) => !p.published || p.status === "draft",
  ).length
  const featured = projects.filter((p) => p.featured).length
  const recent = [...projects]
    .sort((a, b) => b.order - a.order)
    .slice(0, 6)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("admin.welcome")}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {t("admin.welcomeSub")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <RouterLinkButton to="/admin/projects/new">
            <Plus className="mr-1.5 size-4" />
            {t("admin.newProject")}
          </RouterLinkButton>
          <RouterLinkButton to="/" variant="outline">
            <ExternalLink className="mr-1.5 size-4" />
            {t("admin.openSite")}
          </RouterLinkButton>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border/70 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.projects")}
            </CardTitle>
            <FolderKanban className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">
              {projects.length}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {published} {t("admin.statPublished").toLowerCase()}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.statPublished")}
            </CardTitle>
            <Sparkles className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">{published}</p>
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.statDrafts")}
            </CardTitle>
            <FileText className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">{drafts}</p>
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.statFeatured")}
            </CardTitle>
            <Star className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">{featured}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/70 bg-card/60 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">{t("admin.quickActions")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <RouterLinkButton to="/admin/projects" variant="secondary">
              <FolderKanban className="mr-1.5 size-4" />
              {t("admin.manageProjects")}
            </RouterLinkButton>
            <RouterLinkButton to="/admin/categories" variant="outline">
              <Tags className="mr-1.5 size-4" />
              {t("admin.categories")} ({categories.length})
            </RouterLinkButton>
            <RouterLinkButton to="/admin/technologies" variant="outline">
              <Cpu className="mr-1.5 size-4" />
              {t("admin.technologies")} ({technologies.length})
            </RouterLinkButton>
            <RouterLinkButton to="/admin/settings" variant="ghost">
              {t("admin.settings")}
            </RouterLinkButton>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/60 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-base">{t("admin.recentProjects")}</CardTitle>
            <RouterLinkButton to="/admin/projects" variant="ghost" size="sm">
              {t("admin.projects")}
            </RouterLinkButton>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border/60">
              {recent.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {pickBilingual(p.title, i18n.language)}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {p.slug}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {p.featured ? (
                      <Badge variant="secondary" className="hidden sm:inline-flex">
                        {t("admin.featured")}
                      </Badge>
                    ) : null}
                    <Badge variant="outline">
                      {p.published ? t("admin.published") : t("admin.statDrafts")}
                    </Badge>
                    <Link
                      to={`/admin/projects/${p.id}/edit`}
                      className="inline-flex size-8 items-center justify-center rounded-md border border-border/70 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      aria-label={t("admin.editProject")}
                    >
                      <Pencil className="size-3.5" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
