import { useTranslation } from "react-i18next"
import { SectionReveal } from "@/components/motion/section-reveal"

export function AboutPage() {
  const { t } = useTranslation()
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <SectionReveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("about.title")}
        </h1>
      </SectionReveal>
      <SectionReveal className="mt-8 space-y-6 text-muted-foreground" delay={0.08}>
        <p className="text-lg leading-relaxed text-foreground/90">
          {t("about.body1")}
        </p>
        <p className="leading-relaxed">{t("about.body2")}</p>
        <div className="rounded-xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("about.focus")}
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {t("about.focusText")}
          </p>
        </div>
      </SectionReveal>
    </div>
  )
}
