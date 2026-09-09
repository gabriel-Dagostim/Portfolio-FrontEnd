import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { PublicHeader } from "@/components/layout/public-header"
import { PublicFooter } from "@/components/layout/public-footer"

export function PublicShell() {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only rounded-sm bg-foreground px-3 py-2 text-sm text-background focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        {t("common.skipToContent")}
      </a>
      <PublicHeader />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  )
}
