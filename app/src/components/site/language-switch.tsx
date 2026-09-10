import { useTranslation } from "react-i18next"
import { SUPPORTED_LOCALES, setLocale } from "@/i18n"
import { normalizeLocale } from "@/lib/i18n-utils"
import { cn } from "@/lib/utils"

/**
 * Three languages sit side by side rather than behind a dropdown, the
 * switch is part of the site's promise, so it should be visible.
 */
export function LanguageSwitch({ className }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const current = normalizeLocale(i18n.language)

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border border-rule",
        className,
      )}
      role="group"
      aria-label={t("common.language")}
    >
      {SUPPORTED_LOCALES.map((locale, index) => (
        <button
          key={locale.code}
          type="button"
          onClick={() => setLocale(locale.code)}
          aria-pressed={current === locale.code}
          title={locale.label}
          className={cn(
            "type-data px-2 py-1 text-[0.6875rem] transition-colors",
            index > 0 && "border-l border-rule",
            current === locale.code
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:bg-surface-sunken hover:text-foreground",
          )}
        >
          {locale.short}
        </button>
      ))}
    </div>
  )
}
