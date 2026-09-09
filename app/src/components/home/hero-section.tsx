import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { StatusPanel } from "@/components/home/status-panel"
import { PageContainer } from "@/components/site/page-header"
import { buttonVariants } from "@/components/ui/button"
import { useSiteContent } from "@/app/portfolio-store"
import { pickLocalized } from "@/lib/i18n-utils"
import { cn } from "@/lib/utils"

type Props = {
  projectCount: number
  systemCount: number
  yearsInOperations: number
}

export function HeroSection({
  projectCount,
  systemCount,
  yearsInOperations,
}: Props) {
  const { t, i18n } = useTranslation()
  const { profile, status } = useSiteContent()
  const lang = i18n.language

  const counts = [
    { value: projectCount, label: t("home.countProjects") },
    { value: systemCount, label: t("home.countSystems") },
    { value: yearsInOperations, label: t("home.countYears") },
  ]

  return (
    <section className="border-b border-rule">
      <PageContainer className="grid gap-12 pb-14 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
        <div className="flex flex-col justify-center">
          <p className="type-data text-xs text-muted-foreground">
            {pickLocalized(profile.role, lang)}
          </p>
          <h1 className="type-display measure-tight mt-4 text-[clamp(2.5rem,5.4vw,3.9rem)]">
            {pickLocalized(profile.headline, lang)}
          </h1>
          <p className="measure mt-6 text-base leading-7 text-muted-foreground sm:text-[1.0625rem] sm:leading-8">
            {pickLocalized(profile.summary, lang)}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/work" className={cn(buttonVariants({ size: "lg" }))}>
              {t("home.ctaWork")}
            </Link>
            <Link
              to="/contact"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {t("home.ctaContact")}
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-rule pt-6">
            {counts.map((count) => (
              <div key={count.label}>
                <dt className="sr-only">{count.label}</dt>
                <dd>
                  <span className="type-data text-2xl text-foreground">
                    {count.value}
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {count.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <StatusPanel lines={status} />
        </div>
      </PageContainer>
    </section>
  )
}
