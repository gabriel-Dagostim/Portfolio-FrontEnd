import { useTranslation } from "react-i18next"
import { Mail, Code2, Briefcase, MessageCircle } from "lucide-react"
import { SectionReveal } from "@/components/motion/section-reveal"
import { AnchorButton } from "@/components/ui/anchor-button"
import { CvDownloadButton } from "@/components/cv/cv-download-button"
import { CONTACT } from "@/lib/contact"

export function ContactPage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <SectionReveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("contact.title")}
        </h1>
        <p className="mt-4 text-muted-foreground">{t("contact.subtitle")}</p>
      </SectionReveal>
      <SectionReveal
        className="mt-12 flex flex-col items-center gap-4"
        delay={0.08}
      >
        <AnchorButton
          size="lg"
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle className="mr-2 size-4" />
          {t("contact.whatsapp")}
        </AnchorButton>
        <p className="text-sm text-muted-foreground">{CONTACT.phoneDisplay}</p>
        <AnchorButton
          size="lg"
          variant="outline"
          href={`mailto:${CONTACT.email}`}
        >
          <Mail className="mr-2 size-4" />
          {t("contact.emailCta")}
        </AnchorButton>
        <p className="text-sm text-muted-foreground">{CONTACT.email}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <AnchorButton
            variant="outline"
            href={CONTACT.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Code2 className="mr-2 size-4" />
            {t("contact.github")}
          </AnchorButton>
          <AnchorButton
            variant="outline"
            href={CONTACT.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Briefcase className="mr-2 size-4" />
            {t("contact.linkedin")}
          </AnchorButton>
        </div>
        <div className="mt-6 w-full max-w-md rounded-2xl border border-border/70 bg-card/50 p-5">
          <p className="mb-4 text-sm text-muted-foreground">{t("contact.cvHint")}</p>
          <CvDownloadButton className="w-full justify-center" />
        </div>
      </SectionReveal>
    </div>
  )
}
