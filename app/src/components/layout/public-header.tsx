import { Link, NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Moon, Sun, Monitor, Globe } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { setLocale } from "@/i18n"
import { useThemeMode } from "@/app/theme-provider"
import { RouterLinkButton } from "@/components/ui/link-button"
import { cn } from "@/lib/utils"

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm font-medium transition-colors hover:text-primary",
    isActive ? "text-foreground" : "text-muted-foreground",
  )

export function PublicHeader() {
  const { t } = useTranslation()
  const { setMode, resolved } = useThemeMode()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="font-semibold tracking-tight text-foreground"
        >
          {t("common.brand")}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" end className={navClass}>
            {t("nav.home")}
          </NavLink>
          <NavLink to="/projects" className={navClass}>
            {t("nav.projects")}
          </NavLink>
          <NavLink to="/about" className={navClass}>
            {t("nav.about")}
          </NavLink>
          <NavLink to="/skills" className={navClass}>
            {t("nav.skills")}
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            {t("nav.contact")}
          </NavLink>
        </nav>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              aria-label="Language"
            >
              <Globe className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLocale("pt-BR")}>
                Português (BR)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocale("en")}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
      <div className="flex border-t border-border/40 px-4 py-2 md:hidden">
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <NavLink to="/" end className={navClass}>
            {t("nav.home")}
          </NavLink>
          <NavLink to="/projects" className={navClass}>
            {t("nav.projects")}
          </NavLink>
          <NavLink to="/about" className={navClass}>
            {t("nav.about")}
          </NavLink>
          <NavLink to="/skills" className={navClass}>
            {t("nav.skills")}
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            {t("nav.contact")}
          </NavLink>
          <NavLink to="/admin/login" className={navClass}>
            {t("nav.admin")}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
