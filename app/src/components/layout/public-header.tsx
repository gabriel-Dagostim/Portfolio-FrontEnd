import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Menu, X } from "lucide-react"
import { LanguageSwitch } from "@/components/site/language-switch"
import { ThemeSwitch } from "@/components/site/theme-switch"
import { useSiteContent } from "@/app/portfolio-store"
import { pickLocalized } from "@/lib/i18n-utils"
import { cn } from "@/lib/utils"

const NAV = [
  { to: "/", end: true, key: "nav.home" },
  { to: "/work", key: "nav.work" },
  { to: "/systems", key: "nav.systems" },
  { to: "/infrastructure", key: "nav.infra" },
  { to: "/automations", key: "nav.automations" },
  { to: "/about", key: "nav.about" },
  { to: "/skills", key: "nav.skills" },
  { to: "/contact", key: "nav.contact" },
] as const

/**
 * Two tiers. The masthead carries the name and the utility controls with room
 * to breathe and scrolls away; only the slim nav rail sticks. No scroll
 * listener is involved, so nothing can judder: the outer header is static and
 * the inner rail is position: sticky.
 */
export function PublicHeader() {
  const { t, i18n } = useTranslation()
  const { profile } = useSiteContent()
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-50">
      <div className="border-b border-rule bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[84rem] items-center justify-between gap-8 px-6 py-6 sm:px-10 sm:py-7">
          <Link to="/" className="group min-w-0">
            <span className="type-title block text-lg tracking-tight sm:text-xl">
              {profile.shortName}
            </span>
            <span className="type-data mt-1.5 block truncate text-[0.6875rem] text-muted-foreground">
              {pickLocalized(profile.role, i18n.language)}
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <LanguageSwitch />
            <ThemeSwitch className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="inline-flex items-center justify-center rounded-sm border border-rule p-2 text-muted-foreground transition-colors hover:border-rule-strong hover:text-foreground lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
              <span className="sr-only">
                {open ? t("common.closeMenu") : t("common.openMenu")}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-50 hidden border-b border-rule bg-background/92 backdrop-blur-md lg:block">
        <nav className="mx-auto flex max-w-[84rem] items-center gap-9 px-10">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={"end" in item ? item.end : undefined}
              className={({ isActive }) =>
                cn(
                  "-mb-px border-b-2 py-4 text-[0.9375rem] transition-colors",
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-b border-rule bg-background lg:hidden"
        >
          <ul className="mx-auto max-w-[84rem] px-6 sm:px-10">
            {NAV.map((item) => (
              <li key={item.to} className="border-b border-rule/60 last:border-0">
                <NavLink
                  to={item.to}
                  end={"end" in item ? item.end : undefined}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block py-3.5 text-[0.9375rem]",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )
                  }
                >
                  {t(item.key)}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-[84rem] px-6 py-5 sm:px-10">
            <ThemeSwitch />
          </div>
        </nav>
      ) : null}
    </header>
  )
}
