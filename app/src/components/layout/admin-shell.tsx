import { useState } from "react"
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  Briefcase,
  Contact,
  FolderKanban,
  GitBranch,
  LayoutDashboard,
  ExternalLink,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  Tags,
  UserRound,
  X,
} from "lucide-react"
import { LanguageSwitch } from "@/components/site/language-switch"
import { ThemeSwitch } from "@/components/site/theme-switch"
import { Button } from "@/components/ui/button"
import { useAdminSession } from "@/hooks/use-admin-session"
import { cn } from "@/lib/utils"

/**
 * Three groups, named for what they change: the words on the site, the
 * project catalogue, and the switches behind both.
 */
const NAV_GROUPS = [
  {
    labelKey: "admin.sectionContent",
    items: [
      { to: "/admin", end: true, icon: LayoutDashboard, labelKey: "admin.overview" },
      { to: "/admin/profile", icon: UserRound, labelKey: "admin.profile" },
      { to: "/admin/career", icon: Briefcase, labelKey: "admin.career" },
      { to: "/admin/skills", icon: Sparkles, labelKey: "admin.skillsNav" },
      { to: "/admin/flow", icon: GitBranch, labelKey: "admin.flowNav" },
      { to: "/admin/contact", icon: Contact, labelKey: "admin.contactNav" },
    ],
  },
  {
    labelKey: "admin.sectionCatalogue",
    items: [
      { to: "/admin/projects", icon: FolderKanban, labelKey: "admin.projects" },
      { to: "/admin/taxonomy", icon: Tags, labelKey: "admin.categories" },
    ],
  },
  {
    labelKey: "admin.sectionSystem",
    items: [{ to: "/admin/settings", icon: Settings, labelKey: "admin.settings" }],
  },
] as const

export function AdminShell() {
  const { t } = useTranslation()
  const { authed, logout } = useAdminSession()
  const navigate = useNavigate()
  const [navOpen, setNavOpen] = useState(false)

  if (!authed) return <Navigate to="/admin/login" replace />

  function signOut() {
    logout()
    navigate("/admin/login")
  }

  const nav = (
    <nav className="space-y-6">
      {NAV_GROUPS.map((group) => (
        <div key={group.labelKey}>
          <p className="type-data px-3 pb-2 text-[0.6875rem] text-muted-foreground">
            {t(group.labelKey)}
          </p>
          <ul>
            {group.items.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={"end" in item ? item.end : undefined}
                    onClick={() => setNavOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2.5 border-l-2 px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "border-primary bg-surface-sunken text-foreground"
                          : "border-transparent text-muted-foreground hover:bg-surface-sunken hover:text-foreground",
                      )
                    }
                  >
                    <Icon className="size-4 shrink-0" />
                    {t(item.labelKey)}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )

  return (
    <div className="flex min-h-svh bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-rule bg-surface md:flex">
        <div className="border-b border-rule px-4 py-4">
          <p className="type-title text-base">{t("admin.signInTitle")}</p>
          <p className="type-data mt-0.5 text-[0.6875rem] text-muted-foreground">
            Gabriel Dagostim
          </p>
        </div>
        <div className="flex-1 overflow-y-auto py-5">{nav}</div>
        <div className="space-y-2 border-t border-rule p-3">
          <NavLink
            to="/"
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ExternalLink className="size-4" />
            {t("admin.backToSite")}
          </NavLink>
          <Button variant="ghost" className="w-full justify-start" onClick={signOut}>
            <LogOut className="size-4" />
            {t("admin.signOut")}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-rule bg-background/92 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
            <button
              type="button"
              onClick={() => setNavOpen((v) => !v)}
              aria-expanded={navOpen}
              className="rounded-sm border border-rule p-1.5 text-muted-foreground md:hidden"
            >
              {navOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              <span className="sr-only">
                {navOpen ? t("common.closeMenu") : t("common.openMenu")}
              </span>
            </button>
            <div className="ml-auto flex items-center gap-2">
              <LanguageSwitch />
              <ThemeSwitch />
              <Button size="sm" variant="outline" onClick={signOut} className="md:hidden">
                {t("admin.signOut")}
              </Button>
            </div>
          </div>
          {navOpen ? (
            <div className="border-t border-rule bg-surface py-4 md:hidden">{nav}</div>
          ) : null}
        </header>

        <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
