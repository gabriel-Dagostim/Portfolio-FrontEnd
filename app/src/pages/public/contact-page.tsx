import { useTranslation } from "react-i18next"
import { Mail, Code2, Briefcase, MessageCircle } from "lucide-react"
import { SectionReveal } from "@/components/motion/section-reveal"
import { AnchorButton } from "@/components/ui/anchor-button"

const WHATSAPP_E164 = "5545984127626"
const WHATSAPP_DISPLAY = "+55 45 98412-7626"
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}`

export function ContactPage() {
  const { t } = useTranslation()
  const email = "contato@exemplo.com"

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
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle className="mr-2 size-4" />
          {t("contact.whatsapp")}
        </AnchorButton>
        <p className="text-sm text-muted-foreground">{WHATSAPP_DISPLAY}</p>
        <AnchorButton size="lg" variant="outline" href={`mailto:${email}`}>
          <Mail className="mr-2 size-4" />
          {t("contact.emailCta")}
        </AnchorButton>
        <div className="flex flex-wrap justify-center gap-3">
          <AnchorButton
            variant="outline"
            href="https://github.com/gabriel-Dagostim"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 className="mr-2 size-4" />
            {t("contact.github")}
          </AnchorButton>
          <AnchorButton
            variant="outline"
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
          >
            <Briefcase className="mr-2 size-4" />
            {t("contact.linkedin")}
          </AnchorButton>
        </div>
      </SectionReveal>
    </div>
  )
}
