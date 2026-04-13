import { useTranslation } from "react-i18next"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMemo, useRef, useState } from "react"
import { HeroSection } from "@/components/home/hero-section"
import { HomeStoryPanel } from "@/components/home/home-story-panel"
import { HomeTechBackdrop } from "@/components/home/home-tech-backdrop"
import { SectionReveal } from "@/components/motion/section-reveal"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectDetailSheet } from "@/components/projects/project-detail-sheet"
import { RouterLinkButton } from "@/components/ui/link-button"
import { usePortfolioStore } from "@/app/portfolio-store"

export function HomePage() {
  const { t } = useTranslation()
  const { scrollYProgress } = useScroll()
  const featuredRef = useRef<HTMLElement>(null)
  const { scrollYProgress: featuredProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  })
  const featuredParallaxY = useTransform(featuredProgress, [0, 1], [56, -32])
  const headerShift = useTransform(featuredProgress, [0, 0.5, 1], [0, -8, 0])

  const { projects, categories, areas, technologies, settings } =
    usePortfolioStore()
  const [sheetProjectId, setSheetProjectId] = useState<string | null>(null)

  const featuredId = settings.featuredProjectId
  const displayFeatured = useMemo(() => {
    const bySetting = projects.find((p) => p.id === featuredId)
    const published = projects.filter(
      (p) => p.published && p.status === "published",
    )
    return (
      bySetting && bySetting.published && bySetting.status === "published"
        ? bySetting
        : published.sort((a, b) => a.order - b.order)[0]
    ) ?? null
  }, [projects, featuredId])

  const sheetProject = sheetProjectId
    ? (projects.find((p) => p.id === sheetProjectId) ?? null)
    : null

  const sheetCategory = sheetProject
    ? categories.find((c) => c.id === sheetProject.categoryId)
    : undefined
  const sheetArea = sheetProject
    ? areas.find((a) => a.id === sheetProject.areaId)
    : undefined
  const sheetTechs = sheetProject
    ? technologies.filter((x) => sheetProject.technologyIds.includes(x.id))
    : []

  return (
    <>
      <HomeTechBackdrop pageProgress={scrollYProgress} />
      <div className="relative z-10">
        <HeroSection />
        <HomeStoryPanel
          eyebrow={t("home.story1Eyebrow")}
          title={t("home.story1Title")}
          body={t("home.story1Body")}
        />
        <HomeStoryPanel
          eyebrow={t("home.story2Eyebrow")}
          title={t("home.story2Title")}
          body={t("home.story2Body")}
        />
        <section
          ref={featuredRef}
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
        >
          <SectionReveal>
            <motion.div
              style={{ y: headerShift }}
              className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {t("home.featuredTitle")}
                </h2>
                <p className="mt-2 max-w-xl text-muted-foreground">
                  {t("home.featuredSubtitle")}
                </p>
              </div>
              <RouterLinkButton to="/projects" variant="outline">
                {t("home.ctaProjects")}
              </RouterLinkButton>
            </motion.div>
          </SectionReveal>
          {displayFeatured ? (
            <motion.div
              style={{ y: featuredParallaxY }}
              className="max-w-md will-change-transform"
            >
              <ProjectCard
                project={displayFeatured}
                category={categories.find(
                  (c) => c.id === displayFeatured.categoryId,
                )}
                techs={technologies.filter((x) =>
                  displayFeatured.technologyIds.includes(x.id),
                )}
                onOpen={() => setSheetProjectId(displayFeatured.id)}
              />
            </motion.div>
          ) : null}
        </section>
      </div>
      <ProjectDetailSheet
        project={sheetProject}
        open={Boolean(sheetProject)}
        onOpenChange={(o) => {
          if (!o) setSheetProjectId(null)
        }}
        category={sheetCategory}
        area={sheetArea}
        techs={sheetTechs}
      />
    </>
  )
}
