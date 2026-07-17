import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  LayoutDashboard,
  FolderKanban,
  Tags,
  Cpu,
  Settings,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAdminSession } from "@/hooks/use-admin-session"
import { cn } from "@/lib/utils"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-primary/15 text-primary"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
  )

const navItems = [
  { to: "/admin", end: true, icon: LayoutDashboard, labelKey: "admin.dashboard" },
  { to: "/admin/projects", end: false, icon: FolderKanban, labelKey: "admin.projects" },
  { to: "/admin/categories", end: false, icon: Tags, labelKey: "admin.categories" },
  { to: "/admin/technologies", end: false, icon: Cpu, labelKey: "admin.technologies" },
  { to: "/admin/settings", end: false, icon: Settings, labelKey: "admin.settings" },
] as const

export function AdminShell() {
  const { t } = useTranslation()
  const { authed, logout } = useAdminSession()
  const navigate = useNavigate()

  if (!authed) {
    return <Navigate to="/admin/login" replace />
  }

  function handleLogout() {
    logout()
    navigate("/admin/login")
  }

  return (
    <div className="flex min-h-svh bg-background">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card/40 md:flex">
        <div className="border-b border-border px-4 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {t("nav.admin")}
          </p>
          <p className="mt-1 text-sm font-semibold tracking-tight">
            {t("common.brand")}
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClass}
              >
                <Icon className="size-4" />
                {t(item.labelKey)}
              </NavLink>
            )
          })}
        </nav>
        <div className="border-t border-border p-3">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 size-4" />
            {t("admin.signOut")}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 px-4 py-3 md:hidden">
            <span className="text-sm font-semibold">{t("admin.dashboard")}</span>
            <Button size="sm" variant="outline" onClick={handleLogout}>
              {t("admin.signOut")}
            </Button>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:hidden">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium",
                      isActive
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border text-muted-foreground",
                    )
                  }
                >
                  <Icon className="size-3.5" />
                  {t(item.labelKey)}
                </NavLink>
              )
            })}
          </nav>
        </header>
        <div className="flex flex-1 flex-col overflow-auto p-4 sm:p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
