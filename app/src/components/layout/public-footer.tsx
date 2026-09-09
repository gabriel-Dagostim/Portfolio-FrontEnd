import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSiteContent } from "@/app/portfolio-store"
import { pickLocalized } from "@/lib/i18n-utils"

export function PublicFooter() {
  const { t, i18n } = useTranslation()
  const { profile, contact } = useSiteContent()

  const links = [
    { href: `mailto:${contact.email}`, label: contact.email },
    { href: contact.githubUrl, label: "GitHub" },
    { href: contact.linkedinUrl, label: "LinkedIn" },
    { href: `https://wa.me/${contact.whatsappE164}`, label: "WhatsApp" },
  ]

  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto grid max-w-[84rem] gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="type-title text-lg">{profile.fullName}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {pickLocalized(profile.role, i18n.language)} ·{" "}
            {pickLocalized(profile.location, i18n.language)}
          </p>
        </div>
        <ul className="flex flex-wrap items-start gap-x-5 gap-y-2 text-sm md:justify-end">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="text-muted-foreground underline decoration-rule-strong decoration-1 underline-offset-4 transition-colors hover:text-foreground hover:decoration-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-[84rem] flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <p className="type-data text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.shortName}
          </p>
          <Link
            to="/admin/login"
            className="type-data text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.admin")}
          </Link>
        </div>
      </div>
    </footer>
  )
}
