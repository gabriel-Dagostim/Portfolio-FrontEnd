import { Link, NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Moon, Sun, Monitor } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { setLocale, type LocaleCode } from "@/i18n"
import { useThemeMode } from "@/app/theme-provider"
import { RouterLinkButton } from "@/components/ui/link-button"
import { cn } from "@/lib/utils"

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm font-medium transition-colors hover:text-primary",
    isActive ? "text-foreground" : "text-muted-foreground",
  )

const NAV_LINKS = [
  { to: "/", end: true, key: "nav.home" },
  { to: "/projects", key: "nav.projects" },
  { to: "/estrela", key: "nav.estrela" },
  { to: "/infra", key: "nav.infra" },
  { to: "/automations", key: "nav.automations" },
  { to: "/about", key: "nav.about" },
  { to: "/skills", key: "nav.skills" },
  { to: "/contact", key: "nav.contact" },
] as const

function normalizeLocale(language: string): LocaleCode {
  return language.toLowerCase().startsWith("pt") ? "pt-BR" : "en"
}

export function PublicHeader() {
  const { t, i18n } = useTranslation()
  const { setMode, resolved } = useThemeMode()
  const locale = normalizeLocale(i18n.language)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="shrink-0 font-semibold tracking-tight text-foreground"
        >
          {t("common.brand")}
        </Link>
        <nav className="hidden items-center gap-4 lg:flex xl:gap-5">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={"end" in item ? item.end : undefined}
              className={navClass}
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <div
            className="mr-1 inline-flex items-center rounded-lg border border-border/70 bg-background/80 p-0.5 text-xs font-medium"
            role="group"
            aria-label={t("common.language")}
          >
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={cn(
                "rounded-md px-2.5 py-1 transition-colors",
                locale === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("pt-BR")}
              className={cn(
                "rounded-md px-2.5 py-1 transition-colors",
                locale === "pt-BR"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-pressed={locale === "pt-BR"}
            >
              PT-BR
            </button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              aria-label="Theme"
            >
              {resolved === "dark" ? (
                <Moon className="size-4" />
              ) : (
                <Sun className="size-4" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setMode("light")}>
                <Sun className="mr-2 size-4" /> {t("admin.themeLight")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMode("dark")}>
                <Moon className="mr-2 size-4" /> {t("admin.themeDark")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMode("system")}>
                <Monitor className="mr-2 size-4" /> {t("admin.themeSystem")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <RouterLinkButton
            to="/admin/login"
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {t("nav.admin")}
          </RouterLinkButton>
        </div>
      </div>
      <div className="border-t border-border/40 px-4 py-2 lg:hidden">
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={"end" in item ? item.end : undefined}
              className={navClass}
            >
              {t(item.key)}
            </NavLink>
          ))}
          <NavLink to="/admin/login" className={navClass}>
            {t("nav.admin")}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
