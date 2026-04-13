import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAdminSession } from "@/hooks/use-admin-session"
import { mockLogin } from "@/lib/api-mock"

const schema = z.object({
  password: z.string().min(1),
})

type Form = z.infer<typeof schema>

export function AdminLoginPage() {
  const { t } = useTranslation()
  const { authed, login } = useAdminSession()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const form = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { password: "" },
  })

  if (authed) {
    return <Navigate to="/admin" replace />
  }

  async function onSubmit(values: Form) {
    setError(null)
    setPending(true)
    try {
      const ok = await mockLogin(values.password)
      if (ok) {
        login()
        navigate("/admin")
      } else {
        setError("Invalid password")
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 rounded-xl border border-border bg-card/80 p-8 shadow-sm backdrop-blur-sm">
        <div>
          <h1 className="text-xl font-semibold">{t("admin.loginTitle")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("admin.loginHint")}
          </p>
        </div>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="password">{t("admin.password")}</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              {...form.register("password")}
            />
            {form.formState.errors.password ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.password.message}
              </p>
            ) : null}
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {t("admin.signIn")}
          </Button>
        </form>
      </div>
    </div>
  )
}
