import { useState, type ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { AlertCircle, Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { emptyLocalized } from "@/lib/i18n-utils"
import type { Localized } from "@/types"
import { cn } from "@/lib/utils"

/* ── Page frame ─────────────────────────────────────────────────────────── */

export function AdminPage({
  title,
  lead,
  actions,
  children,
}: {
  title: string
  lead?: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="flex flex-col gap-4 border-b border-rule pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="type-title text-2xl sm:text-[1.75rem]">{title}</h1>
          {lead ? (
            <p className="measure mt-2 text-sm leading-6 text-muted-foreground">
              {lead}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>
        ) : null}
      </header>
      <div className="py-8">{children}</div>
    </div>
  )
}

/** A titled group of fields — this is what keeps the admin readable. */
export function Panel({
  title,
  description,
  actions,
  children,
  className,
}: {
  title?: string
  description?: string
  actions?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn("border border-rule bg-surface", className)}>
      {title ? (
        <header className="flex items-start justify-between gap-4 border-b border-rule bg-surface-sunken px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold">{title}</h2>
            {description ? (
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </header>
      ) : null}
      <div className="space-y-5 p-4 sm:p-5">{children}</div>
    </section>
  )
}

export function Field({
  label,
  hint,
  htmlFor,
  children,
  className,
}: {
  label: string
  hint?: string
  htmlFor?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="block text-xs font-medium text-foreground"
      >
        {label}
      </label>
      {children}
      {hint ? (
        <p className="text-xs leading-5 text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

export function FieldGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>
}

/* ── Three-language editing ─────────────────────────────────────────────── */

const LANGS = [
  { key: "en", labelKey: "admin.fieldEn" },
  { key: "pt", labelKey: "admin.fieldPt" },
  { key: "es", labelKey: "admin.fieldEs" },
] as const

type LangKey = (typeof LANGS)[number]["key"]

/**
 * One label, one box, three tabs. A dot on a tab means that language is still
 * empty — the fastest way to see what is missing without opening each one.
 */
export function LocalizedField({
  label,
  hint,
  value,
  onChange,
  multiline = false,
  rows = 4,
}: {
  label: string
  hint?: string
  value: Localized | undefined
  onChange: (next: Localized) => void
  multiline?: boolean
  rows?: number
}) {
  const { t } = useTranslation()
  const [lang, setLang] = useState<LangKey>("en")
  const current = value ?? emptyLocalized()

  const set = (next: string) => onChange({ ...current, [lang]: next })

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-medium text-foreground">{label}</span>
        <div className="inline-flex border border-rule">
          {LANGS.map((item, index) => {
            const missing = !current[item.key]?.trim()
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setLang(item.key)}
                aria-pressed={lang === item.key}
                className={cn(
                  "type-data flex items-center gap-1.5 px-2 py-1 text-[0.6875rem] transition-colors",
                  index > 0 && "border-l border-rule",
                  lang === item.key
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-surface-sunken hover:text-foreground",
                )}
              >
                {item.key.toUpperCase()}
                {missing ? (
                  <span
                    className="size-1.5 rounded-full bg-signal"
                    title={t("admin.missingTranslation", {
                      lang: t(item.labelKey),
                    })}
                  />
                ) : null}
              </button>
            )
          })}
        </div>
      </div>

      {multiline ? (
        <Textarea
          rows={rows}
          value={current[lang]}
          onChange={(event) => set(event.target.value)}
          lang={lang === "pt" ? "pt-BR" : lang}
        />
      ) : (
        <Input
          value={current[lang]}
          onChange={(event) => set(event.target.value)}
          lang={lang === "pt" ? "pt-BR" : lang}
        />
      )}

      {hint ? (
        <p className="text-xs leading-5 text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

/** Edits an array of Localized values (tags, mostly). */
export function LocalizedListField({
  label,
  values,
  onChange,
  addLabel,
}: {
  label: string
  values: Localized[]
  onChange: (next: Localized[]) => void
  addLabel: string
}) {
  return (
    <div className="space-y-3">
      <span className="text-xs font-medium text-foreground">{label}</span>
      {values.map((item, index) => (
        <div key={index} className="flex items-end gap-2">
          <div className="flex-1">
            <LocalizedField
              label={`${index + 1}`}
              value={item}
              onChange={(next) =>
                onChange(values.map((v, i) => (i === index ? next : v)))
              }
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onChange(values.filter((_, i) => i !== index))}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...values, emptyLocalized()])}
      >
        <Plus className="size-3.5" />
        {addLabel}
      </Button>
    </div>
  )
}

/* ── Misc ───────────────────────────────────────────────────────────────── */

export function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description?: string
  checked: boolean
  onChange: (next: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 border border-rule px-3 py-2.5 transition-colors hover:bg-surface-sunken">
      <span>
        <span className="block text-sm">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 size-4 shrink-0 accent-[var(--primary)]"
      />
    </label>
  )
}

export function EmptyState({
  message,
  action,
}: {
  message: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-3 border border-dashed border-rule-strong px-6 py-12 text-center">
      <AlertCircle className="size-5 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{message}</p>
      {action}
    </div>
  )
}

/** Fires onChange after the browser confirms a destructive action. */
export function useConfirmedDelete() {
  const { t } = useTranslation()
  return (name: string, run: () => void) => {
    if (window.confirm(t("admin.deleteConfirm", { name }))) run()
  }
}
