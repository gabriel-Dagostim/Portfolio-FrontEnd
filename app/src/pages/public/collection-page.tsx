import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectDialog } from "@/components/projects/project-dialog"
import { PageContainer, PageHeader } from "@/components/site/page-header"
import { usePortfolioStore } from "@/app/portfolio-store"
import { useProjectDialog } from "@/hooks/use-project-dialog"
import { selectProjects } from "@/lib/api-mock"

type Props = {
  categoryId: string
  titleKey: string
  leadKey: string
  emptyKey: string
}

/** Systems, Infrastructure, and Automations are the same page, filtered. */
export function CollectionPage({
  categoryId,
  titleKey,
  leadKey,
  emptyKey,
}: Props) {
  const { t } = useTranslation()
  const { projects, categories, technologies } = usePortfolioStore()
  const dialog = useProjectDialog()

  const list = useMemo(
    () => selectProjects(projects, { categoryId }),
    [projects, categoryId],
  )

  return (
    <>
      <PageContainer>
        <PageHeader
          title={t(titleKey)}
          lead={t(leadKey)}
          aside={
            <span className="type-data text-xs text-muted-foreground">
              {t("projects.resultCount", { count: list.length })}
            </span>
          }
        />

        {list.length === 0 ? (
          <p className="py-24 text-center text-muted-foreground">
            {t(emptyKey)}
          </p>
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

export const SystemsPage = () => (
  <CollectionPage
    categoryId="cat-estrela"
    titleKey="collections.systemsTitle"
    leadKey="collections.systemsLead"
    emptyKey="collections.systemsEmpty"
  />
)

export const InfrastructurePage = () => (
  <CollectionPage
    categoryId="cat-infra"
    titleKey="collections.infraTitle"
    leadKey="collections.infraLead"
    emptyKey="collections.infraEmpty"
  />
)

export const AutomationsPage = () => (
  <CollectionPage
    categoryId="cat-auto-ops"
    titleKey="collections.autoTitle"
    leadKey="collections.autoLead"
    emptyKey="collections.autoEmpty"
  />
)
