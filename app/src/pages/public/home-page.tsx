import { useTranslation } from "react-i18next"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMemo, useRef, useState } from "react"
import {
  ArrowRight,
  Building2,
  Cpu,
  Bot,
  UserRound,
  MessageCircle,
  Sparkles,
} from "lucide-react"
import { Link } from "react-router-dom"
import { HeroSection } from "@/components/home/hero-section"
import { HomeTechBackdrop } from "@/components/home/home-tech-backdrop"
import { HomeDevFlowSection } from "@/components/home/home-dev-flow-section"
import { SectionReveal } from "@/components/motion/section-reveal"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectDetailSheet } from "@/components/projects/project-detail-sheet"
import { RouterLinkButton } from "@/components/ui/link-button"
import { Badge } from "@/components/ui/badge"
import { usePortfolioStore } from "@/app/portfolio-store"
import { cn } from "@/lib/utils"

const FEATURED_IDS = [
  "proj-imagens-ecommerce",
  "proj-nexus-estrela",
  "proj-feirao",
  "proj-dba-bot",
  "proj-farmacia-auth",
  "proj-legacy-debutante",
] as const

const EXPLORE = [
  {
    to: "/sistemas",
    icon: Building2,
    titleKey: "home.exploreEstrelaTitle",
    bodyKey: "home.exploreEstrelaBody",
  },
  {
    to: "/infra",
    icon: Cpu,
    titleKey: "home.exploreInfraTitle",
    bodyKey: "home.exploreInfraBody",
  },
  {
    to: "/automations",
    icon: Bot,
    titleKey: "home.exploreAutoTitle",
    bodyKey: "home.exploreAutoBody",
  },
  {
    to: "/about",
    icon: UserRound,
    titleKey: "home.exploreAboutTitle",
    bodyKey: "home.exploreAboutBody",
  },
] as const

export function HomePage() {
  const { t } = useTranslation()
  const { scrollYProgress } = useScroll()
  const featuredRef = useRef<HTMLElement>(null)
  const { scrollYProgress: featuredProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  })
  const featuredParallaxY = useTransform(featuredProgress, [0, 1], [28, -16])
  const headerShift = useTransform(featuredProgress, [0, 0.5, 1], [0, -6, 0])

  const { projects, categories, areas, technologies } = usePortfolioStore()
  const [sheetProjectId, setSheetProjectId] = useState<string | null>(null)

  const published = useMemo(
    () =>
      projects.filter((p) => p.published && p.status === "published"),
    [projects],
  )

  const featuredList = useMemo(() => {
    const byId = new Map(published.map((p) => [p.id, p]))
    const picked = FEATURED_IDS.map((id) => byId.get(id)).filter(
      Boolean,
    ) as typeof published
    if (picked.length >= 3) return picked
    const rest = published
      .filter((p) => !FEATURED_IDS.includes(p.id as (typeof FEATURED_IDS)[number]))
      .sort((a, b) => a.order - b.order)
    return [...picked, ...rest].slice(0, 6)
  }, [published])

  const stats = useMemo(() => {
    const estrela = published.filter((p) => p.categoryId === "cat-estrela").length
    const infra = published.filter((p) => p.categoryId === "cat-infra").length
    const auto = published.filter((p) => p.categoryId === "cat-auto-ops").length
    return { total: published.length, estrela, infra, auto }
  }, [published])

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

        {/* Snapshot / atalhos úteis */}
        <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6 md:px-8">
          <SectionReveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {[
                {
                  label: t("home.statProjects"),
                  value: String(stats.total),
                },
                {
                  label: t("home.statEstrela"),
                  value: String(stats.estrela),
                },
                {
                  label: t("home.statInfra"),
                  value: String(stats.infra),
                },
                {
                  label: t("home.statAuto"),
                  value: String(stats.auto),
                },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={cn(
                    "rounded-2xl border border-border/70 bg-card/50 px-4 py-3 backdrop-blur-sm",
                    i === 1 && "sm:translate-y-2",
                    i === 2 && "lg:-translate-y-1",
                    i === 3 && "sm:translate-y-3 lg:translate-y-2",
                  )}
                >
                  <p className="text-2xl font-semibold tracking-tight">
                    {s.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </section>

        {/* Explorar áreas */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:max-w-7xl">
          <SectionReveal>
            <div className="mb-10 flex flex-col gap-2 sm:-ml-3 sm:flex-row sm:items-end sm:justify-between md:-ml-6">
              <div className="max-w-xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  {t("home.exploreEyebrow")}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  {t("home.exploreTitle")}
                </h2>
                <p className="mt-3 max-w-lg text-muted-foreground">
                  {t("home.exploreSubtitle")}
                </p>
              </div>
            </div>
          </SectionReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {EXPLORE.map((item, i) => {
              const Icon = item.icon
              return (
                <SectionReveal key={item.to} delay={0.04 * i}>
                  <Link
                    to={item.to}
                    className={cn(
                      "group flex h-full gap-4 rounded-3xl border border-border/70 bg-card/50 p-5 backdrop-blur-sm sm:p-6",
                      "transition-all hover:border-primary/35 hover:bg-card hover:shadow-md",
                      i % 2 === 1 && "sm:translate-y-4",
                      i === 2 && "lg:-translate-y-2",
                    )}
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary transition-colors group-hover:bg-primary/18">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold tracking-tight">
                          {t(item.titleKey)}
                        </h3>
                        <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {t(item.bodyKey)}
                      </p>
                    </div>
                  </Link>
                </SectionReveal>
              )
            })}
          </div>
        </section>

        <HomeDevFlowSection />

        {/* Quem sou — faixa compacta */}
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <SectionReveal>
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-primary/12 via-card/60 to-transparent">
              <div className="grid items-center gap-6 p-6 sm:grid-cols-[auto_1fr_auto] sm:p-8">
                <img
                  src="/profile/perfil.png"
                  alt={t("about.photoAlt")}
                  className="mx-auto size-24 rounded-2xl object-cover object-top shadow-md ring-1 ring-border sm:mx-0 sm:size-28"
                  width={112}
                  height={112}
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
                      {t("home.whoEyebrow")}
                    </p>
                  </div>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                    {t("common.fullName")}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t("home.whoBody")}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="secondary">{t("about.langPt")}</Badge>
                    <Badge variant="secondary">{t("about.langEn")}</Badge>
                    <Badge variant="outline">{t("common.role")}</Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:items-stretch">
                  <RouterLinkButton to="/about">
                    {t("home.whoCtaAbout")}
                  </RouterLinkButton>
                  <RouterLinkButton to="/skills" variant="outline">
                    {t("home.whoCtaSkills")}
                  </RouterLinkButton>
                </div>
              </div>
            </div>
          </SectionReveal>
        </section>

        {/* Destaques — vários projetos */}
        <section
          ref={featuredRef}
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20"
        >
          <SectionReveal>
            <motion.div
              style={{ y: headerShift }}
              className="mb-10 flex flex-col gap-4 sm:-ml-4 sm:flex-row sm:items-end sm:justify-between md:-ml-6"
            >
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  {t("home.featuredTitle")}
                </h2>
                <p className="mt-3 max-w-lg text-muted-foreground">
                  {t("home.featuredSubtitle")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:translate-x-2">
                <RouterLinkButton to="/projects" variant="outline">
                  {t("home.ctaProjects")}
                </RouterLinkButton>
                <RouterLinkButton to="/sistemas" variant="ghost">
                  {t("nav.systems")}
                </RouterLinkButton>
              </div>
            </motion.div>
          </SectionReveal>

          <motion.div
            style={{ y: featuredParallaxY }}
            className="grid gap-6 will-change-transform sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          >
            {featuredList.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                category={categories.find((c) => c.id === p.categoryId)}
                techs={technologies.filter((x) =>
                  p.technologyIds.includes(x.id),
                )}
                onOpen={() => setSheetProjectId(p.id)}
              />
            ))}
          </motion.div>
        </section>

        {/* Contato rápido */}
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <SectionReveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border/70 bg-card/50 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:p-8">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {t("home.contactBandTitle")}
                </h2>
                <p className="mt-2 max-w-xl text-muted-foreground">
                  {t("home.contactBandBody")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <RouterLinkButton
                  to="/contact"
                  size="lg"
                  className="gap-2"
                >
                  <MessageCircle className="size-4" />
                  {t("home.ctaContact")}
                </RouterLinkButton>
                <a
                  href="https://wa.me/5545984127626"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex"
                >
                  <span className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                    WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </SectionReveal>
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
