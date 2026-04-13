import { useTranslation } from "react-i18next"
import { FolderKanban, Tags, Cpu } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RouterLinkButton } from "@/components/ui/link-button"
import { usePortfolioStore } from "@/app/portfolio-store"

export function AdminDashboardPage() {
  const { t } = useTranslation()
  const { projects, categories, technologies } = usePortfolioStore()
  const published = projects.filter((p) => p.published).length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("admin.welcome")}
        </h1>
        <p className="mt-2 text-muted-foreground">{t("admin.welcomeSub")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.projects")}
            </CardTitle>
            <FolderKanban className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{projects.length}</p>
            <p className="text-xs text-muted-foreground">
              {published} published
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.categories")}
            </CardTitle>
            <Tags className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{categories.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.technologies")}
            </CardTitle>
            <Cpu className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{technologies.length}</p>
          </CardContent>
        </Card>
      </div>
      <RouterLinkButton to="/admin/projects">{t("admin.projects")}</RouterLinkButton>
    </div>
  )
}
