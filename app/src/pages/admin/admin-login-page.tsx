import { useState, type FormEvent } from "react"
import { Navigate, useNavigate, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAdminSession } from "@/hooks/use-admin-session"
import { checkAdminPassword } from "@/lib/api-mock"

export function AdminLoginPage() {
  const { t } = useTranslation()
  const { authed, login } = useAdminSession()
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  if (authed) return <Navigate to="/admin" replace />

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (checkAdminPassword(password)) {
      login()
      navigate("/admin")
    } else {
      setError(t("admin.signInError"))
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("admin.backToSite")}
        </Link>

        <div className="mt-6 border border-rule-strong bg-surface">
          <div className="border-b border-rule bg-surface-sunken px-4 py-2.5">
            <span className="type-data text-xs">{t("admin.signInTitle")}</span>
          </div>
          <form className="space-y-4 p-5" onSubmit={onSubmit}>
            <p className="text-sm leading-6 text-muted-foreground">
              {t("admin.signInLead")}
            </p>
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-medium">
                {t("admin.password")}
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setError(null)
                }}
                aria-invalid={Boolean(error)}
              />
            </div>
            {error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : null}
            <Button type="submit" className="w-full">
              {t("admin.signIn")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
