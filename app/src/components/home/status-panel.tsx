import { useTranslation } from "react-i18next"
import { pickLocalized } from "@/lib/i18n-utils"
import type { StatusLine } from "@/types"
import { cn } from "@/lib/utils"

const STATE_STYLE: Record<StatusLine["state"], string> = {
  live: "bg-positive",
  building: "bg-signal",
  shipped: "bg-muted-foreground",
}

const STATE_LABEL: Record<StatusLine["state"], string> = {
  live: "home.stateLive",
  building: "home.stateBuilding",
  shipped: "home.stateShipped",
}

/**
 * The one bold element on the site: a readout shaped like the monitoring
 * panels Gabriel builds for a living. Rows resolve once on first paint,
 * the only motion on the page that nobody asked for.
 */
export function StatusPanel({ lines }: { lines: StatusLine[] }) {
  const { t, i18n } = useTranslation()

  return (
    <div className="border border-rule-strong bg-surface">
      <div className="flex items-center justify-between border-b border-rule-strong bg-surface-sunken px-4 py-2.5">
        <span className="type-data text-xs text-foreground">
          {t("home.panelTitle")}
        </span>
        <span className="type-data text-xs text-muted-foreground">
          {t("home.panelUpdated", { year: new Date().getFullYear() })}
        </span>
      </div>

      <dl>
        {lines.map((line, index) => (
          <div
            key={line.id}
            className="panel-row-in grid grid-cols-[7.5rem_1fr] items-start gap-3 border-b border-rule px-4 py-3 last:border-b-0 sm:grid-cols-[9rem_1fr]"
            style={{ animationDelay: `${120 + index * 90}ms` }}
          >
            <dt className="type-data flex items-center gap-2 pt-0.5 text-xs text-muted-foreground">
              <span
                aria-hidden
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  STATE_STYLE[line.state],
                  line.state === "live" && "signal-live",
                )}
              />
              {pickLocalized(line.label, i18n.language)}
            </dt>
            <dd className="text-sm leading-6 text-foreground">
              {pickLocalized(line.value, i18n.language)}
              <span className="sr-only">, {t(STATE_LABEL[line.state])}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
