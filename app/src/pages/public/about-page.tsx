import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import {
  Award,
  Briefcase,
  CalendarDays,
  Code2,
  Globe2,
  GraduationCap,
  MapPin,
  Server,
  Sparkles,
  Trophy,
  Wrench,
} from "lucide-react"
import { SectionReveal } from "@/components/motion/section-reveal"
import { Badge } from "@/components/ui/badge"
import { RouterLinkButton } from "@/components/ui/link-button"
import { CvDownloadButton } from "@/components/cv/cv-download-button"

const PROFILE_SRC = "/profile/perfil.png"
const UNIOESTE_SRC = "/profile/unioeste.png"
const ESTRELA_SRC = "/profile/estrela.png"
const CODIGO_KID_SRC = "/profile/codigo-kid.png"
const EUREKA_SRC = "/profile/eureka.png"
const FAG_SRC = "/profile/fag.jpg"
const WORKANA_SRC = "/profile/workana.jpeg"
const ELETROLIMP_SRC = "/profile/eletrolimp.jpeg"

function ageFromBirth(isoDate: string) {
  const birth = new Date(isoDate)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age -= 1
  return age
}

export function AboutPage() {
  const { t } = useTranslation()
  const age = ageFromBirth("2003-02-20")

  const stackExperience = [
    {
      icon: Code2,
      value: t("about.stackFrontendValue"),
      label: t("about.stackFrontendLabel"),
    },
    {
      icon: Server,
      value: t("about.stackBackendValue"),
      label: t("about.stackBackendLabel"),
    },
    {
      icon: Sparkles,
      value: t("about.stackDataAiValue"),
      label: t("about.stackDataAiLabel"),
    },
    {
      icon: Wrench,
      value: t("about.stackOpsValue"),
      label: t("about.stackOpsLabel"),
    },
  ] as const

  const educationTimeline = [
    {
      id: "pos",
      logo: FAG_SRC,
      logoClass: "bg-white p-1.5",
      period: t("about.eduPosPeriod"),
      title: t("about.eduPosTitle"),
      org: t("about.eduPosOrg"),
      body: t("about.eduPosBody"),
      tags: [
        t("about.tagPostgrad"),
        t("about.tagAiBusiness"),
        t("about.tagProduct"),
      ],
    },
    {
      id: "fag",
      logo: FAG_SRC,
      logoClass: "bg-white p-1.5",
      period: t("about.eduFagPeriod"),
      title: t("about.eduFagTitle"),
      org: t("about.eduFagOrg"),
      body: t("about.eduFagBody"),
      tags: [
        t("about.tagSoftwareEngineering"),
        t("about.tagWebSystems"),
        t("about.tagProduct"),
      ],
    },
    {
      id: "competitions",
      logo: FAG_SRC,
      logoClass: "bg-white p-1.5",
      period: t("about.eduCompetitionsPeriod"),
      title: t("about.eduCompetitionsTitle"),
      org: t("about.eduCompetitionsOrg"),
      body: t("about.eduCompetitionsBody"),
      tags: [
        t("about.tagHackathon"),
        t("about.tagAwards"),
        t("about.tagProduct"),
      ],
    },
    {
      id: "research",
      logo: EUREKA_SRC,
      logoClass: "bg-white p-1.5",
      period: t("about.eduResearchPeriod"),
      title: t("about.eduResearchTitle"),
      org: t("about.eduResearchOrg"),
      body: t("about.eduResearchBody"),
      tags: [
        t("about.tagElectronics"),
        t("about.tagPrototype"),
        t("about.tagInternational"),
      ],
    },
    {
      id: "codigo-kid",
      logo: CODIGO_KID_SRC,
      logoClass: "bg-transparent",
      cover: true,
      period: t("about.eduCodigoKidPeriod"),
      title: t("about.eduCodigoKidTitle"),
      org: t("about.eduCodigoKidOrg"),
      body: t("about.eduCodigoKidBody"),
      tags: [
        t("about.tagArduino"),
        t("about.tagElectronics"),
        t("about.tagLogic"),
      ],
    },
    {
      id: "high-school",
      logo: FAG_SRC,
      logoClass: "bg-white p-1.5",
      period: t("about.eduHighSchoolPeriod"),
      title: t("about.eduHighSchoolTitle"),
      org: t("about.eduHighSchoolOrg"),
      body: t("about.eduHighSchoolBody"),
      tags: [t("about.tagLogic")],
      hideLogo: true,
    },
  ] as const

  const timeline = [
    {
      id: "estrela",
      logo: ESTRELA_SRC,
      logoClass: "bg-white p-0 scale-[1.35]",
      period: t("about.jobEstrelaPeriod"),
      title: t("about.jobEstrelaTitle"),
      org: t("about.jobEstrelaOrg"),
      body: t("about.jobEstrelaBody"),
      tags: [
        t("about.tagInfra"),
        t("about.tagDev"),
        t("about.tagIntegrations"),
        t("about.tagAutomation"),
      ],
    },
    {
      id: "unioeste",
      logo: UNIOESTE_SRC,
      logoClass: "bg-white",
      cover: true,
      period: t("about.jobUnioestePeriod"),
      title: t("about.jobUnioesteTitle"),
      org: t("about.jobUnioesteOrg"),
      body: t("about.jobUnioesteBody"),
      tags: [
        t("about.tagNetworks"),
        t("about.tagAd"),
        t("about.tagCampuses"),
        t("about.tagDev"),
      ],
    },
    {
      id: "social",
      logo: ELETROLIMP_SRC,
      logoClass: "bg-white",
      cover: true,
      period: t("about.jobSocialPeriod"),
      title: t("about.jobSocialTitle"),
      org: t("about.jobSocialOrg"),
      body: t("about.jobSocialBody"),
      tags: [
        t("about.tagContent"),
        t("about.tagMarketing"),
        t("about.tagVisual"),
      ],
    },
    {
      id: "freelance",
      logo: WORKANA_SRC,
      logoClass: "bg-white",
      cover: true,
      period: t("about.jobFreelancePeriod"),
      title: t("about.jobFreelanceTitle"),
      org: t("about.jobFreelanceOrg"),
      body: t("about.jobFreelanceBody"),
      tags: [t("about.tagUi"), t("about.tagFigma"), t("about.tagContent")],
    },
  ] as const

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />
        <div className="absolute bottom-24 right-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 md:max-w-6xl">
        <SectionReveal>
          <section
            aria-labelledby="about-profile-heading"
            className="flex min-h-[calc(100dvh-5.5rem)] flex-col justify-center py-2 lg:min-h-[calc(100dvh-4.5rem)]"
          >
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-14">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto w-full max-w-[280px] sm:max-w-xs lg:max-w-sm"
              >
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/40 via-transparent to-primary/10 opacity-70 blur-md" />
                <div className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-xl">
                  <img
                    src={PROFILE_SRC}
                    alt={t("about.photoAlt")}
                    className="aspect-[4/5] max-h-[min(52vh,420px)] w-full object-cover object-top lg:max-h-[min(58vh,480px)]"
                    width={640}
                    height={800}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent p-4 pt-14 sm:p-5 sm:pt-16">
                    <p className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                      {t("common.fullName")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("common.role")}
                    </p>
                  </div>
                </div>
              </motion.div>

              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  {t("about.eyebrow")}
                </p>
                <h1
                  id="about-profile-heading"
                  className="mt-3 max-w-lg text-balance text-2xl font-semibold leading-[1.15] tracking-tight sm:mt-4 sm:text-3xl md:text-4xl xl:text-[2.75rem]"
                >
                  {t("about.headline")}
                </h1>
                <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base sm:leading-7">
                  {t("about.intro", { age })}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-2.5">
                  <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                    <CalendarDays className="size-3.5" />
                    {t("about.born")}
                  </Badge>
                  <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                    <MapPin className="size-3.5" />
                    {t("about.based")}
                  </Badge>
                  <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                    <Briefcase className="size-3.5" />
                    {t("about.yearsExp")}
                  </Badge>
                </div>

                <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-4">
                  <div className="rounded-2xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm sm:p-5">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground sm:mb-3">
                      <Globe2 className="size-4 text-primary" />
                      {t("about.languagesTitle")}
                    </div>
                    <ul className="space-y-1.5 text-sm leading-relaxed text-muted-foreground sm:space-y-2">
                      <li>{t("about.langPt")}</li>
                      <li>{t("about.langEn")}</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm sm:p-5">
                    <div className="mb-2 text-sm font-semibold text-foreground sm:mb-3">
                      {t("about.buildTitle")}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t("about.buildBody")}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 xl:grid-cols-4">
                  {stackExperience.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-border/70 bg-card/60 p-3.5 backdrop-blur-sm sm:p-4"
                      >
                        <div className="flex items-center gap-2 text-primary">
                          <Icon className="size-4 shrink-0" />
                          <p className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                            {item.value}
                          </p>
                        </div>
                        <p className="mt-1 text-sm leading-snug text-muted-foreground">
                          {item.label}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal className="mt-10 sm:mt-14" delay={0.04}>
          <div className="rounded-3xl border border-border/70 bg-card/50 p-6 backdrop-blur-sm sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
                {t("about.cvEyebrow")}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                {t("about.cvTitle")}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                {t("about.cvBody")}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 sm:mt-0 sm:justify-end">
              <CvDownloadButton variant="default" size="lg" />
              <RouterLinkButton to="/projects" variant="outline" size="lg">
                {t("home.ctaProjects")}
              </RouterLinkButton>
              <RouterLinkButton to="/contact" variant="outline" size="lg">
                {t("home.ctaContact")}
              </RouterLinkButton>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-24" delay={0.05}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-lg">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                {t("about.educationEyebrow")}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                {t("about.educationTitle")}
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
                {t("about.educationSubtitle")}
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              {
                icon: GraduationCap,
                title: t("about.profileWebTitle"),
                body: t("about.profileWebBody"),
              },
              {
                icon: Trophy,
                title: t("about.profileCompetitionTitle"),
                body: t("about.profileCompetitionBody"),
              },
              {
                icon: Award,
                title: t("about.profileResearchTitle"),
                body: t("about.profileResearchBody"),
              },
              {
                icon: Wrench,
                title: t("about.profileOpsTitle"),
                body: t("about.profileOpsBody"),
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur-sm sm:p-6"
                >
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Icon className="size-4 text-primary" />
                    {item.title}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:leading-7">
                    {item.body}
                  </p>
                </div>
              )
            })}
          </div>

          <ol className="relative mt-14 space-y-10 before:absolute before:left-[1.35rem] before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-border sm:before:left-[1.6rem] md:space-y-12">
            {educationTimeline.map((item) => (
              <li
                key={item.id}
                className="relative grid gap-4 pl-14 sm:pl-16 md:grid-cols-[140px_1fr] md:gap-8"
              >
                <div
                  className={`absolute left-0 top-1 flex size-11 items-center justify-center overflow-hidden rounded-full border border-border shadow-sm sm:size-12 ${
                    item.logoClass.includes("bg-white")
                      ? "bg-white"
                      : "bg-background"
                  }`}
                >
                  {"hideLogo" in item && item.hideLogo ? (
                    <GraduationCap className="size-5 text-primary" />
                  ) : (
                    <img
                      src={item.logo}
                      alt=""
                      className={
                        "cover" in item && item.cover
                          ? `size-full object-cover ${item.logoClass}`
                          : `size-full object-contain ${item.logoClass}`
                      }
                    />
                  )}
                </div>
                <div className="pt-1 text-sm font-medium text-primary md:pt-2">
                  {item.period}
                </div>
                <div className="rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur-sm sm:p-6">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.org}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                    {item.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </SectionReveal>

        <SectionReveal className="mt-24" delay={0.06}>
          <h2 className="max-w-md text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            {t("about.careerTitle")}
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground leading-relaxed">
            {t("about.careerSubtitle")}
          </p>

          <ol className="relative mt-14 space-y-10 before:absolute before:left-[1.35rem] before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-border sm:before:left-[1.6rem] md:space-y-12">
            {timeline.map((job, i) => (
              <li
                key={job.id}
                className="relative grid gap-4 pl-14 sm:pl-16 md:grid-cols-[140px_1fr] md:gap-8"
              >
                <div
                  className={`absolute left-0 top-1 flex size-11 items-center justify-center overflow-hidden rounded-full border border-border shadow-sm sm:size-12 ${
                    job.logoClass.includes("bg-white")
                      ? "bg-white"
                      : "bg-background"
                  }`}
                >
                  {"hideLogo" in job && job.hideLogo ? (
                    <Briefcase className="size-5 text-primary" />
                  ) : (
                    <img
                      src={job.logo}
                      alt=""
                      className={
                        "cover" in job && job.cover
                          ? `size-full object-cover ${job.logoClass}`
                          : `size-full object-contain ${job.logoClass}`
                      }
                    />
                  )}
                </div>
                <div className="pt-1 text-sm font-medium text-primary md:pt-2">
                  {job.period}
                </div>
                <div className="rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur-sm sm:p-6">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{job.org}</p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                    {job.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {i === 0 ? (
                    <p className="mt-4 text-xs text-muted-foreground">
                      {t("about.jobEstrelaNote")}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </SectionReveal>

        <SectionReveal className="mt-16" delay={0.08}>
          <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-primary/10 via-card/40 to-transparent p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">
              {t("about.focus")}
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
              {t("about.focusText")}
            </p>
          </div>
        </SectionReveal>
      </div>
    </div>
  )
}
