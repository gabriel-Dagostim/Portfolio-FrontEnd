import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { ArrowLeft } from "lucide-react"
import { RouterLinkButton } from "@/components/ui/link-button"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ProjectDetailPanel } from "@/components/projects/project-detail-panel"
import { usePortfolioStore } from "@/app/portfolio-store"
import { fetchProjectBySlug } from "@/lib/api-mock"

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const { projects, categories, areas, technologies } = usePortfolioStore()

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", slug, projects],
    queryFn: () => fetchProjectBySlug(projects, slug ?? ""),
    enabled: Boolean(slug),
  })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">
        {t("common.loading")}
      </div>
    )
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-muted-foreground">{t("projects.empty")}</p>
        <RouterLinkButton to="/projects" className="mt-6">
          {t("nav.projects")}
        </RouterLinkButton>
      </div>
    )
  }

  const category = categories.find((c) => c.id === project.categoryId)
  const area = areas.find((a) => a.id === project.areaId)
  const techs = technologies.filter((x) => project.technologyIds.includes(x.id))

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        to="/projects"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mb-8 inline-flex gap-2 px-0",
        )}
      >
        <ArrowLeft className="size-4" />
        {t("nav.projects")}
      </Link>
      <ProjectDetailPanel
        project={project}
        category={category}
        area={area}
        techs={techs}
        loadGallery
      />
    </div>
  )
}
