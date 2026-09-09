import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Check, Copy, Mail, MessageCircle } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/site/brand-icons"
import { CvDownload } from "@/components/cv/cv-download"
import { PageContainer, PageHeader } from "@/components/site/page-header"
import { useSiteContent } from "@/app/portfolio-store"
import { cn } from "@/lib/utils"

export function ContactPage() {
  const { t } = useTranslation()
  const { contact } = useSiteContent()
  const [copied, setCopied] = useState<string | null>(null)

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
      window.setTimeout(() => setCopied(null), 1800)
    } catch {
      /* clipboard blocked — the value is visible and selectable anyway */
    }
  }

  const channels = [
    {
      id: "email",
      icon: Mail,
      label: t("contact.emailLabel"),
      value: contact.email,
      href: `mailto:${contact.email}`,
      copyable: true,
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: t("contact.whatsappLabel"),
      value: contact.phoneDisplay,
      href: `https://wa.me/${contact.whatsappE164}`,
      copyable: true,
    },
    {
      id: "linkedin",
      icon: LinkedinIcon,
      label: t("contact.linkedinLabel"),
      value: contact.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ""),
      href: contact.linkedinUrl,
      copyable: false,
    },
    {
      id: "github",
      icon: GithubIcon,
      label: t("contact.githubLabel"),
      value: contact.githubUrl.replace(/^https?:\/\/(www\.)?/, ""),
      href: contact.githubUrl,
      copyable: false,
    },
  ]

  return (
    <PageContainer className="pb-16">
      <PageHeader title={t("contact.title")} lead={t("contact.lead")} />

      <ul className="my-10 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
        {channels.map((channel) => {
          const Icon = channel.icon
          const isCopied = copied === channel.value
          return (
            <li
              key={channel.id}
              className="flex items-center gap-4 bg-surface p-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center border border-rule text-muted-foreground">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="type-data text-xs text-muted-foreground">
                  {channel.label}
                </p>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="block truncate text-[0.9375rem] text-foreground underline decoration-rule-strong decoration-1 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  {channel.value}
                </a>
              </div>
              {channel.copyable ? (
                <button
                  type="button"
                  onClick={() => copy(channel.value)}
                  className={cn(
                    "shrink-0 rounded-sm border border-rule p-2 transition-colors",
                    isCopied
                      ? "border-positive text-positive"
                      : "text-muted-foreground hover:border-rule-strong hover:text-foreground",
                  )}
                >
                  {isCopied ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  <span className="sr-only">
                    {isCopied ? t("contact.copied") : t("contact.copy")}
                  </span>
                </button>
              ) : null}
            </li>
          )
        })}
      </ul>

      <p className="text-sm text-muted-foreground">{t("contact.responseNote")}</p>

      <div className="mt-10 border-t border-rule pt-6">
        <h2 className="type-title text-xl">{t("about.cvTitle")}</h2>
        <p className="measure mt-2 text-sm leading-6 text-muted-foreground">
          {t("about.cvLead")}
        </p>
        <CvDownload className="mt-4" />
      </div>
    </PageContainer>
  )
}
