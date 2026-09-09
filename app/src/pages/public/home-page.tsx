import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { HeroSection } from "@/components/home/hero-section"
import { WorkingMethod } from "@/components/home/working-method"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectDialog } from "@/components/projects/project-dialog"
import {
  PageContainer,
  SectionHeading,
} from "@/components/site/page-header"
import { buttonVariants } from "@/components/ui/button"
import { usePortfolioStore } from "@/app/portfolio-store"
import { useProjectDialog } from "@/hooks/use-project-dialog"
import { pickLocalized } from "@/lib/i18n-utils"
import { selectProjects } from "@/lib/api-mock"
import { cn } from "@/lib/utils"

const COLLECTIONS = [
  { to: "/systems", titleKey: "nav.systems", blurbKey: "home.systemsBlurb", categoryId: "cat-estrela" },
  { to: "/infrastructure", titleKey: "nav.infra", blurbKey: "home.infraBlurb", categoryId: "cat-infra" },
  { to: "/automations", titleKey: "nav.automations", blurbKey: "home.autoBlurb", categoryId: "cat-auto-ops" },
] as const

/** Career start — used for the "years in operations" count in the hero. */
const CAREER_START_YEAR = 2022

export function HomePage() {
  const { t, i18n } = useTranslation()
  const { projects, categories, technologies, settings, content } =
    usePortfolioStore()
  const dialog = useProjectDialog()

  const published = useMemo(() => selectProjects(projects), [projects])

  const featured = useMemo(() => {
    const byId = new Map(published.map((p) => [p.id, p]))
    const picked = settings.homeFeaturedIds
      .map((id) => byId.get(id))
      .filter((p): p is (typeof published)[number] => Boolean(p))
    if (picked.length >= 3) return picked
    const rest = published.filter((p) => !picked.includes(p))
    return [...picked, ...rest].slice(0, 6)
  }, [published, settings.homeFeaturedIds])

  const counts = useMemo(() => {
    const byCategory = (id: string) =>
      published.filter((p) => p.categoryId === id).length
    return {
      total: projects.filter((p) => p.published && p.status === "published")
        .length,
      systems:
        byCategory("cat-estrela") +
        byCategory("cat-infra") +
        byCategory("cat-auto-ops"),
      years: new Date().getFullYear() - CAREER_START_YEAR,
      byCategory,
    }
  }, [projects, published])

  return (
    <>
      <HeroSection
        projectCount={counts.total}
        systemCount={counts.systems}
        yearsInOperations={counts.years}
      />

      <PageContainer className="py-14 sm:py-16">
        <SectionHeading
          title={t("home.workTitle")}
          lead={t("home.workLead")}
          aside={
            <Link
              to="/work"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              {t("home.workAll", { count: counts.total })}
            </Link>
          }
        />
        <div className="mt-8 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              category={categories.find((c) => c.id === project.categoryId)}
              techs={technologies.filter((x) =>
                project.technologyIds.includes(x.id),
              )}
              onOpen={() => dialog.openProject(project.id)}
              className="border-0"
            />
          ))}
        </div>
      </PageContainer>

      <PageContainer className="pb-14 sm:pb-16">
        <SectionHeading
          title={t("home.collectionsTitle")}
          lead={t("home.collectionsLead")}
        />
        <ul className="mt-8 grid grid-cols-1 gap-px border border-rule bg-rule md:grid-cols-3">
          {COLLECTIONS.map((item) => (
            <li key={item.to} className="bg-surface">
              <Link
                to={item.to}
                className="group flex h-full flex-col p-5 transition-colors hover:bg-surface-sunken sm:p-6"
              >
                <span className="type-data text-2xl text-primary">
                  {counts.byCategory(item.categoryId)}
                </span>
                <h3 className="type-title mt-2 text-lg group-hover:underline group-hover:decoration-primary group-hover:underline-offset-4">
                  {t(item.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t(item.blurbKey)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </PageContainer>

      <WorkingMethod steps={content.flow} />

      <PageContainer className="pb-14 sm:pb-16">
        <SectionHeading title={t("home.profileTitle")} />
        <div className="mt-8 grid gap-6 border border-rule bg-surface p-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8 sm:p-8">
          <img
            src={content.profile.photoUrl}
            alt={t("about.photoAlt")}
            width={160}
            height={200}
            className="h-40 w-32 border border-rule object-cover object-top sm:h-48 sm:w-40"
          />
          <div>
            <p className="type-title text-xl">{content.profile.fullName}</p>
            <p className="type-data mt-1 text-xs text-muted-foreground">
              {pickLocalized(content.profile.role, i18n.language)}
            </p>
            <p className="measure mt-4 text-[0.9375rem] leading-7 text-muted-foreground">
              {t("about.howBody")}
            </p>
            <Link
              to="/about"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-5")}
            >
              {t("home.profileCta")}
            </Link>
          </div>
        </div>
      </PageContainer>

      <PageContainer className="pb-16">
        <div className="flex flex-col gap-5 border-t border-rule pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="type-title text-2xl sm:text-[1.75rem]">
              {t("home.contactTitle")}
            </h2>
            <p className="measure mt-3 text-[0.9375rem] leading-7 text-muted-foreground">
              {t("home.contactLead")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/contact" className={cn(buttonVariants({ size: "lg" }))}>
              {t("home.ctaContact")}
            </Link>
            <a
              href={`https://wa.me/${content.contact.whatsappE164}`}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              WhatsApp
            </a>
          </div>
        </div>
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
