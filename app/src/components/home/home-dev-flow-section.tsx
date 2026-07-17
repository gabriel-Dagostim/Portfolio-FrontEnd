import { useTranslation } from "react-i18next"
import { SectionReveal } from "@/components/motion/section-reveal"
import { DevFlowBoard } from "@/components/dev-flow/dev-flow-board"
import { Badge } from "@/components/ui/badge"

export function HomeDevFlowSection() {
  const { t } = useTranslation()

  return (
    <section
      id="dev-flow"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20"
    >
      <SectionReveal>
        <div className="mb-8 max-w-2xl sm:-ml-3 md:-ml-6 md:max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {t("flow.homeEyebrow")}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            {t("flow.homeTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("flow.homeLead")}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{t("flow.badgeVibe")}</Badge>
            <Badge variant="outline">{t("flow.badgeTests")}</Badge>
            <Badge variant="outline">{t("flow.badgeSecurity")}</Badge>
            <Badge variant="outline">{t("flow.badgeOps")}</Badge>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.04}>
        <DevFlowBoard compact />
      </SectionReveal>
    </section>
  )
}
