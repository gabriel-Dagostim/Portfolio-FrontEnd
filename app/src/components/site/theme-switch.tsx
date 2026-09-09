import { useTranslation } from "react-i18next"
import { Monitor, Moon, Sun } from "lucide-react"
import { useThemeMode, type ThemeMode } from "@/app/theme-provider"
import { cn } from "@/lib/utils"

const MODES: { mode: ThemeMode; icon: typeof Sun; labelKey: string }[] = [
  { mode: "light", icon: Sun, labelKey: "common.themeLight" },
  { mode: "dark", icon: Moon, labelKey: "common.themeDark" },
  { mode: "system", icon: Monitor, labelKey: "common.themeSystem" },
]

export function ThemeSwitch({ className }: { className?: string }) {
  const { t } = useTranslation()
  const { mode, setMode } = useThemeMode()

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border border-rule",
        className,
      )}
      role="group"
      aria-label={t("common.theme")}
    >
      {MODES.map((item, index) => {
        const Icon = item.icon
        const active = mode === item.mode
        return (
          <button
            key={item.mode}
            type="button"
            onClick={() => setMode(item.mode)}
            aria-pressed={active}
            title={t(item.labelKey)}
            className={cn(
              "p-1.5 transition-colors",
              index > 0 && "border-l border-rule",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-surface-sunken hover:text-foreground",
            )}
          >
            <Icon className="size-3.5" />
            <span className="sr-only">{t(item.labelKey)}</span>
          </button>
        )
      })}
    </div>
  )
}
