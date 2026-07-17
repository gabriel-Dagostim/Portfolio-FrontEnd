import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Lock } from "lucide-react"
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
        setError(t("admin.loginError"))
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden px-4">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-72 w-[28rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      </div>
      <div className="w-full max-w-sm space-y-6 rounded-2xl border border-border/70 bg-card/90 p-8 shadow-lg backdrop-blur-md">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
            <Lock className="size-5" />
          </span>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              {t("admin.loginTitle")}
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {t("admin.loginHint")}
            </p>
          </div>
        </div>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="password">{t("admin.password")}</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              {...form.register("password")}
            />
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
