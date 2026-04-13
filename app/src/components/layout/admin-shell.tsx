import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { LayoutDashboard, FolderKanban, Tags, Cpu, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAdminSession } from "@/hooks/use-admin-session"
import { cn } from "@/lib/utils"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-sidebar-accent text-sidebar-accent-foreground"
      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60",
  )

export function AdminShell() {
  const { t } = useTranslation()
  const { authed, logout } = useAdminSession()
  const navigate = useNavigate()

  if (!authed) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="flex min-h-svh bg-background">
      <aside className="hidden w-56 shrink-0 border-r border-border bg-sidebar text-sidebar-foreground md:flex md:flex-col">
        <div className="border-b border-sidebar-border px-4 py-4 text-sm font-semibold">
          {t("nav.admin")}
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-2">
          <NavLink to="/admin" end className={linkClass}>
            <LayoutDashboard className="size-4" />
            {t("admin.dashboard")}
          </NavLink>
          <NavLink to="/admin/projects" className={linkClass}>
            <FolderKanban className="size-4" />
            {t("admin.projects")}
          </NavLink>
          <NavLink to="/admin/categories" className={linkClass}>
            <Tags className="size-4" />
            {t("admin.categories")}
          </NavLink>
          <NavLink to="/admin/technologies" className={linkClass}>
            <Cpu className="size-4" />
            {t("admin.technologies")}
          </NavLink>
          <NavLink to="/admin/settings" className={linkClass}>
            <Settings className="size-4" />
            {t("admin.settings")}
          </NavLink>
        </nav>
        <div className="border-t border-sidebar-border p-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground"
            onClick={() => {
              logout()
              navigate("/admin/login")
            }}
          >
            <LogOut className="mr-2 size-4" />
            {t("admin.signOut")}
          </Button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
          <span className="text-sm font-semibold">{t("admin.dashboard")}</span>
          <Button size="sm" variant="outline" onClick={() => logout()}>
            {t("admin.signOut")}
          </Button>
        </header>
        <div className="flex flex-1 flex-col overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
