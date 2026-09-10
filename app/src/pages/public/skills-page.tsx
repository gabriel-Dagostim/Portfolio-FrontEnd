import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { PageContainer, PageHeader } from "@/components/site/page-header"
import { Badge } from "@/components/ui/badge"
import { usePortfolioStore } from "@/app/portfolio-store"
import { selectProjects } from "@/lib/api-mock"
import { pickLocalized } from "@/lib/i18n-utils"
import { TechIcon } from "@/components/site/tech-icon"

export function SkillsPage() {
  const { t, i18n } = useTranslation()
  const { content, projects, technologies } = usePortfolioStore()
  const lang = i18n.language

  /** How many published projects each named technology actually appears in. */
  const usage = useMemo(() => {
    const published = selectProjects(projects)
    const withWip = [
      ...published,
      ...selectProjects(projects, { workingOn: true }),
    ]
    const byName = new Map<string, { id: string; count: number }>()
    for (const tech of technologies) {
      const count = withWip.filter((p) =>
        p.technologyIds.includes(tech.id),
      ).length
      byName.set(tech.name.toLowerCase(), { id: tech.id, count })
    }
    return byName
  }, [projects, technologies])

  return (
    <PageContainer className="pb-16">
      <PageHeader title={t("skills.title")} lead={t("skills.lead")} />

      <div className="my-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {content.skills.map((group) => (
          <section key={group.id} className="border border-rule bg-surface p-6 sm:p-9">
            <h2 className="type-title text-xl">
              {pickLocalized(group.title, lang)}
            </h2>
            <p className="measure mt-4 text-[0.9375rem] leading-8 text-muted-foreground">
              {pickLocalized(group.body, lang)}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {group.items.map((item) => {
                const match = usage.get(item.toLowerCase())
                return (
                  <li key={item}>
                    <Badge variant="data" className="gap-1.5 py-1">
                      {match ? <TechIcon techId={match.id} /> : null}
                      {item}
                      {match && match.count > 0 ? (
                        <span
                          className="text-foreground"
                          title={t("skills.appliedCount", {
                            count: match.count,
                          })}
                        >
                          {match.count}
                        </span>
                      ) : null}
                    </Badge>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </PageContainer>
  )
}
