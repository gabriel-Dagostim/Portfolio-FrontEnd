import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePortfolioStore } from "@/app/portfolio-store"
import { setLocale } from "@/i18n"
import { useThemeMode } from "@/app/theme-provider"
import type { LocaleCode } from "@/types"
import { pickBilingual } from "@/lib/i18n-utils"

export function AdminSettingsPage() {
  const { t, i18n } = useTranslation()
  const { settings, projects, patchSettings } = usePortfolioStore()
  const { setMode } = useThemeMode()

  const published = projects.filter((p) => p.published && p.status === "published")

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t("admin.settings")}
      </h1>
      <div className="space-y-6 rounded-lg border border-border p-6">
        <div className="space-y-2">
          <Label>{t("admin.defaultLocale")}</Label>
          <Select
            value={settings.defaultLocale}
            onValueChange={(v) => {
              if (v != null) patchSettings({ defaultLocale: v as LocaleCode })
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt-BR">pt-BR</SelectItem>
              <SelectItem value="en">en</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("admin.defaultTheme")}</Label>
          <Select
            value={settings.defaultTheme}
            onValueChange={(v) => {
              if (v != null)
                patchSettings({
                  defaultTheme: v as "light" | "dark" | "system",
                })
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">{t("admin.themeLight")}</SelectItem>
              <SelectItem value="dark">{t("admin.themeDark")}</SelectItem>
              <SelectItem value="system">{t("admin.themeSystem")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("admin.featuredProject")}</Label>
          <Select
            value={settings.featuredProjectId ?? "none"}
            onValueChange={(v) => {
              if (v != null)
                patchSettings({
                  featuredProjectId: v === "none" ? null : v,
                })
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">{t("admin.none")}</SelectItem>
              {published.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {pickBilingual(p.title, i18n.language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setLocale(settings.defaultLocale)
            setMode(settings.defaultTheme)
          }}
        >
          Apply defaults to this browser
        </Button>
      </div>
    </div>
  )
}
