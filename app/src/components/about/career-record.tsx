import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Badge } from "@/components/ui/badge"
import { pickLocalized } from "@/lib/i18n-utils"
import type { CareerEntry } from "@/types"
import { cn } from "@/lib/utils"

type Filter = "all" | "work" | "education"

/**
 * Work and study used to be two identical timelines. They are one record now,
 * ordered by when things actually happened, with a filter for the two views.
 * The spine is a real hairline — the years hang off it like a ledger.
 */
export function CareerRecord({ entries }: { entries: CareerEntry[] }) {
  const { t, i18n } = useTranslation()
  const [filter, setFilter] = useState<Filter>("all")
  const lang = i18n.language

  const sorted = useMemo(
    () =>
      [...entries]
        .sort((a, b) => b.startYear - a.startYear)
        .filter((entry) => filter === "all" || entry.kind === filter),
    [entries, filter],
  )

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t("about.filterAll") },
    { id: "work", label: t("about.filterWork") },
    { id: "education", label: t("about.filterEducation") },
  ]

  return (
    <div>
      <div className="inline-flex border border-rule">
        {filters.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            aria-pressed={filter === item.id}
            className={cn(
              "px-3.5 py-1.5 text-sm transition-colors",
              index > 0 && "border-l border-rule",
              filter === item.id
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-surface-sunken hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <ol className="mt-10 border-l border-rule-strong pl-6 sm:pl-10">
        {sorted.map((entry) => (
          <li key={entry.id} className="relative pb-10 last:pb-0">
            <span
              aria-hidden
              className={cn(
                "absolute -left-[1.6875rem] top-1.5 size-2 rounded-full sm:-left-[2.6875rem]",
                entry.current ? "bg-positive signal-live" : "bg-rule-strong",
              )}
            />

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="type-data text-sm text-primary">
                {pickLocalized(entry.period, lang)}
              </span>
              <Badge variant="muted">
                {entry.kind === "work"
                  ? t("about.filterWork")
                  : t("about.filterEducation")}
              </Badge>
              {entry.current ? (
                <Badge variant="signal">{t("about.current")}</Badge>
              ) : null}
            </div>

            <div className="mt-3 flex items-start gap-4">
              {entry.logoUrl ? (
                <img
                  src={entry.logoUrl}
                  alt=""
                  loading="lazy"
                  width={44}
                  height={44}
                  className={cn(
                    "size-11 shrink-0 border border-rule bg-white",
                    entry.logoFit === "cover"
                      ? "object-cover"
                      : "object-contain p-1",
                  )}
                />
              ) : null}
              <div className="min-w-0">
                <h3 className="type-title text-lg">
                  {pickLocalized(entry.title, lang)}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {entry.org}
                </p>
              </div>
            </div>

            <p className="measure mt-4 text-[0.9375rem] leading-7 text-muted-foreground">
              {pickLocalized(entry.body, lang)}
            </p>

            {entry.tags.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <li key={tag.en}>
                    <Badge variant="outline">{pickLocalized(tag, lang)}</Badge>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  )
}
