import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import {
  Code2,
  Server,
  Network,
  Bot,
  Database,
  Sparkles,
} from "lucide-react"
import { SectionReveal } from "@/components/motion/section-reveal"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type PillarKey =
  | "frontend"
  | "backend"
  | "infra"
  | "automation"
  | "dataAi"
  | "delivery"

const PILLARS: { key: PillarKey; icon: typeof Code2 }[] = [
  { key: "frontend", icon: Code2 },
  { key: "backend", icon: Server },
  { key: "infra", icon: Network },
  { key: "automation", icon: Bot },
  { key: "dataAi", icon: Database },
  { key: "delivery", icon: Sparkles },
]

export function SkillsPage() {
  const { t } = useTranslation()

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionReveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {t("skills.eyebrow")}
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {t("skills.headline")}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("skills.lead")}
          </p>
        </SectionReveal>

        <SectionReveal className="mt-12" delay={0.05}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: t("skills.statFrontend"), value: "6" },
              { label: t("skills.statBackend"), value: "4" },
              {
                label: t("skills.statDataAi"),
                value: t("skills.statDataAiValue"),
              },
              {
                label: t("skills.statFocus"),
                value: t("skills.statFocusValue"),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/70 bg-card/50 px-5 py-4 backdrop-blur-sm"
              >
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </SectionReveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon
            const items = t(`skills.pillar.${pillar.key}.items`, {
              returnObjects: true,
            }) as string[]
            return (
              <SectionReveal key={pillar.key} delay={0.04 * index}>
                <motion.article
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className={cn(
                    "h-full rounded-3xl border border-border/70 bg-card/55 p-6 backdrop-blur-sm",
                    "shadow-sm transition-shadow hover:shadow-md",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold tracking-tight">
                        {t(`skills.pillar.${pillar.key}.title`)}
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {t(`skills.pillar.${pillar.key}.body`)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {Array.isArray(items)
                      ? items.map((item) => (
                          <Badge
                            key={item}
                            variant="secondary"
                            className="font-normal"
                          >
                            {item}
                          </Badge>
                        ))
                      : null}
                  </div>
                </motion.article>
              </SectionReveal>
            )
          })}
        </div>

        <SectionReveal className="mt-16" delay={0.08}>
          <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-primary/12 via-background to-transparent p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">
              {t("skills.howTitle")}
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
              {t("skills.howBody")}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {(
                [
                  "skills.how1",
                  "skills.how2",
                  "skills.how3",
                  "skills.how4",
                ] as const
              ).map((key) => (
                <li
                  key={key}
                  className="rounded-2xl border border-border/60 bg-card/40 px-4 py-3 text-sm leading-relaxed text-foreground/90"
                >
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>
    </div>
  )
}
