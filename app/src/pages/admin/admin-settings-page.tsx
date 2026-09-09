import { useTranslation } from "react-i18next"
import { AdminPage, Field, Panel, ToggleRow } from "@/components/admin/admin-ui"
import { Button } from "@/components/ui/button"
import { usePortfolioStore } from "@/app/portfolio-store"
import { SUPPORTED_LOCALES, setLocale } from "@/i18n"
import { useThemeMode, type ThemeMode } from "@/app/theme-provider"
import { pickLocalized } from "@/lib/i18n-utils"
import { selectProjects } from "@/lib/api-mock"
import type { LocaleCode } from "@/types"
import { cn } from "@/lib/utils"

const THEMES: { mode: ThemeMode; labelKey: string }[] = [
  { mode: "light", labelKey: "common.themeLight" },
  { mode: "dark", labelKey: "common.themeDark" },
  { mode: "system", labelKey: "common.themeSystem" },
]

export function AdminSettingsPage() {
  const { t, i18n } = useTranslation()
  const { settings, projects, patchSettings, resetStore } = usePortfolioStore()
  const { setMode } = useThemeMode()
  const lang = i18n.language

  const published = selectProjects(projects)

  function toggleHomeFeatured(id: string) {
    const current = settings.homeFeaturedIds
    patchSettings({
      homeFeaturedIds: current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id],
    })
  }

  return (
    <AdminPage title={t("admin.settings")} lead={t("admin.settingsLead")}>
      <div className="space-y-6">
        <Panel title={t("admin.settings")}>
          <Field label={t("admin.defaultLocale")}>
            <div className="inline-flex border border-rule">
              {SUPPORTED_LOCALES.map((locale, index) => (
                <button
                  key={locale.code}
                  type="button"
                  onClick={() =>
                    patchSettings({ defaultLocale: locale.code as LocaleCode })
                  }
                  aria-pressed={settings.defaultLocale === locale.code}
                  className={cn(
                    "px-3.5 py-2 text-sm transition-colors",
                    index > 0 && "border-l border-rule",
                    settings.defaultLocale === locale.code
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-surface-sunken hover:text-foreground",
                  )}
                >
                  {locale.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label={t("admin.defaultTheme")}>
            <div className="inline-flex border border-rule">
              {THEMES.map((theme, index) => (
                <button
                  key={theme.mode}
                  type="button"
                  onClick={() => patchSettings({ defaultTheme: theme.mode })}
                  aria-pressed={settings.defaultTheme === theme.mode}
                  className={cn(
                    "px-3.5 py-2 text-sm transition-colors",
                    index > 0 && "border-l border-rule",
                    settings.defaultTheme === theme.mode
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-surface-sunken hover:text-foreground",
                  )}
                >
                  {t(theme.labelKey)}
                </button>
              ))}
            </div>
          </Field>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setLocale(settings.defaultLocale)
              setMode(settings.defaultTheme)
            }}
          >
            {t("admin.applyDefaults")}
          </Button>
        </Panel>

        <Panel
          title={t("admin.homeFeatured")}
          description={t("admin.homeFeaturedHint")}
        >
          <ul className="space-y-2">
            {published.map((project) => (
              <li key={project.id}>
                <ToggleRow
                  label={pickLocalized(project.title, lang)}
                  description={project.slug}
                  checked={settings.homeFeaturedIds.includes(project.id)}
                  onChange={() => toggleHomeFeatured(project.id)}
                />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={t("admin.resetTitle")} description={t("admin.resetLead")}>
          <Button
            variant="destructive"
            onClick={() => {
              if (window.confirm(t("admin.resetLead"))) resetStore()
            }}
          >
            {t("admin.reset")}
          </Button>
        </Panel>
      </div>
    </AdminPage>
  )
}
