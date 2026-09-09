import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ArrowLeft } from "lucide-react"
import { ProjectDetail } from "@/components/projects/project-detail"
import { PageContainer } from "@/components/site/page-header"
import { buttonVariants } from "@/components/ui/button"
import { usePortfolioStore } from "@/app/portfolio-store"
import { findProjectBySlug } from "@/lib/api-mock"
import { cn } from "@/lib/utils"

const BACK_BY_CATEGORY: Record<string, { to: string; key: string }> = {
  "cat-estrela": { to: "/systems", key: "nav.systems" },
  "cat-infra": { to: "/infrastructure", key: "nav.infra" },
  "cat-auto-ops": { to: "/automations", key: "nav.automations" },
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const { projects, categories, areas, technologies } = usePortfolioStore()

  const project = useMemo(
    () => findProjectBySlug(projects, slug ?? ""),
    [projects, slug],
  )

  if (!project) {
    return (
      <PageContainer className="py-24 text-center">
        <p className="text-muted-foreground">{t("projects.notFound")}</p>
        <Link
          to="/work"
          className={cn(buttonVariants({ variant: "outline" }), "mt-6")}
        >
          {t("projects.backToWork")}
        </Link>
      </PageContainer>
    )
  }

  const category = categories.find((c) => c.id === project.categoryId)
  const back = BACK_BY_CATEGORY[project.categoryId] ?? {
    to: "/work",
    key: "nav.work",
  }

  return (
    <PageContainer className="py-10 sm:py-14">
      <Link
        to={back.to}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("common.backTo", { page: t(back.key) })}
      </Link>
      <div className="mt-8 border-t border-rule pt-8">
        <ProjectDetail
          project={project}
          category={category}
          area={areas.find((a) => a.id === project.areaId)}
          techs={technologies.filter((x) =>
            project.technologyIds.includes(x.id),
          )}
        />
      </div>
    </PageContainer>
  )
}
