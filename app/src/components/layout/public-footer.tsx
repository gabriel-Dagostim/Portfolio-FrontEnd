import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export function PublicFooter() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-border/60 py-10 text-center text-sm text-muted-foreground">
      <p>
        © {new Date().getFullYear()} {t("common.brand")} — {t("common.role")}
      </p>
      <p className="mt-2">
        <Link to="/admin/login" className="underline-offset-4 hover:underline">
          {t("nav.admin")}
        </Link>
      </p>
    </footer>
  )
}
