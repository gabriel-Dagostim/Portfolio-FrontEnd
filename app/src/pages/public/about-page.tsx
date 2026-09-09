import { useTranslation } from "react-i18next"
import { CareerRecord } from "@/components/about/career-record"
import { CvDownload } from "@/components/cv/cv-download"
import {
  PageContainer,
  PageHeader,
  SectionHeading,
} from "@/components/site/page-header"
import { useSiteContent } from "@/app/portfolio-store"
import { pickLocalized } from "@/lib/i18n-utils"

function ageFrom(isoDate: string) {
  const birth = new Date(isoDate)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const monthDiff = now.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age -= 1
  }
  return age
}

export function AboutPage() {
  const { t, i18n } = useTranslation()
  const { profile, career, languages } = useSiteContent()
  const lang = i18n.language

  return (
    <PageContainer className="pb-8">
      <PageHeader
        title={t("about.title")}
        lead={t("about.lead", { age: ageFrom(profile.birthDate) })}
      />

      <section className="grid gap-8 py-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-12">
        <div>
          <img
            src={profile.photoUrl}
            alt={t("about.photoAlt")}
            width={560}
            height={700}
            className="aspect-[4/5] w-full border border-rule object-cover object-top"
          />
          <p className="type-title mt-4 text-lg">{profile.fullName}</p>
          <p className="type-data mt-1 text-xs text-muted-foreground">
            {pickLocalized(profile.role, lang)}
          </p>
          <p className="type-data mt-0.5 text-xs text-muted-foreground">
            {pickLocalized(profile.location, lang)}
          </p>

          <dl className="mt-6 border-t border-rule pt-4">
            <dt className="type-data text-xs text-muted-foreground">
              {t("about.languagesTitle")}
            </dt>
            {languages.map((language) => (
              <dd
                key={language.id}
                className="mt-3 flex items-center justify-between gap-3"
              >
                <span className="text-sm">
                  <span className="text-foreground">
                    {pickLocalized(language.name, lang)}
                  </span>
                  <span className="ml-2 text-muted-foreground">
                    {pickLocalized(language.level, lang)}
                  </span>
                </span>
                <span
                  className="flex shrink-0 gap-0.5"
                  aria-hidden
                  title={`${language.proficiency}/5`}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        i < language.proficiency
                          ? "h-3 w-1 bg-primary"
                          : "h-3 w-1 bg-rule"
                      }
                    />
                  ))}
                </span>
              </dd>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="type-title text-2xl sm:text-[1.75rem]">
            {t("about.howTitle")}
          </h2>
          <p className="measure mt-4 text-base leading-8 text-muted-foreground">
            {t("about.howBody")}
          </p>
          <p className="measure mt-4 text-base leading-8 text-muted-foreground">
            {pickLocalized(profile.summary, lang)}
          </p>

          <div className="mt-10 border-t border-rule pt-6">
            <h2 className="type-title text-xl">{t("about.cvTitle")}</h2>
            <p className="measure mt-2 text-sm leading-6 text-muted-foreground">
              {t("about.cvLead")}
            </p>
            <CvDownload className="mt-4" />
          </div>
        </div>
      </section>

      <section className="pb-6">
        <SectionHeading
          title={t("about.recordTitle")}
          lead={t("about.recordLead")}
        />
        <div className="mt-8">
          <CareerRecord entries={career} />
        </div>
      </section>
    </PageContainer>
  )
}
