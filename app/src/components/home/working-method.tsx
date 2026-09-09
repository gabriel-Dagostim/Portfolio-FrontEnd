import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { CornerUpLeft } from "lucide-react"
import { PageContainer, SectionHeading } from "@/components/site/page-header"
import { pickLocalized } from "@/lib/i18n-utils"
import type { FlowStep } from "@/types"
import { cn } from "@/lib/utils"

/**
 * The pipeline is genuinely a sequence, so it is numbered and drawn as one.
 * The arcs underneath are the point: three steps can send the work backwards,
 * and that is what separates this from "ask the model and paste the answer".
 */
export function WorkingMethod({ steps }: { steps: FlowStep[] }) {
  const { t, i18n } = useTranslation()
  const [activeId, setActiveId] = useState(steps[0]?.id ?? "")
  const lang = i18n.language

  const active = useMemo(
    () => steps.find((s) => s.id === activeId) ?? steps[0],
    [steps, activeId],
  )
  const activeIndex = steps.findIndex((s) => s.id === active?.id)
  /** Every loop-back returns to the human review step. */
  const returnIndex = Math.max(
    0,
    steps.findIndex((s) => s.id === "flow-review"),
  )

  if (!active) return null

  const columnWidth = 100 / steps.length

  return (
    <section className="border-y border-rule bg-surface-sunken">
      <PageContainer className="py-14 sm:py-16">
        <SectionHeading
          title={t("home.flowTitle")}
          lead={t("home.flowLead")}
          className="border-t-0 pt-0"
        />

        <div className="mt-10">
          <ol className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-4 lg:grid-cols-7">
            {steps.map((step, index) => {
              const isActive = step.id === active.id
              return (
                <li key={step.id} className="bg-background">
                  <button
                    type="button"
                    onClick={() => setActiveId(step.id)}
                    aria-current={isActive}
                    className={cn(
                      "flex h-full w-full flex-col items-start gap-1 px-3 py-3 text-left transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-surface-sunken",
                    )}
                  >
                    <span
                      className={cn(
                        "type-data text-xs",
                        isActive
                          ? "text-primary-foreground/75"
                          : "text-muted-foreground",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium leading-snug">
                      {pickLocalized(step.title, lang)}
                    </span>
                    {step.loopsBack ? (
                      <CornerUpLeft
                        className={cn(
                          "mt-auto size-3.5",
                          isActive
                            ? "text-primary-foreground/70"
                            : "text-signal",
                        )}
                        aria-hidden
                      />
                    ) : null}
                  </button>
                </li>
              )
            })}
          </ol>

          {/* Loop-back arcs — drawn only where the desktop rail is one row. */}
          <svg
            className="hidden h-16 w-full lg:block"
            viewBox="0 0 100 16"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <marker
                id="loop-arrow"
                viewBox="0 0 6 6"
                refX="3"
                refY="3"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
                markerUnits="strokeWidth"
              >
                <path d="M 0 0 L 6 3 L 0 6 z" fill="var(--signal)" />
              </marker>
            </defs>
            {steps.map((step, index) => {
              if (!step.loopsBack || index <= returnIndex) return null
              const from = columnWidth * (index + 0.5)
              const to = columnWidth * (returnIndex + 0.5)
              const depth = 4 + (index - returnIndex) * 2.6
              return (
                <path
                  key={step.id}
                  d={`M ${from} 0 C ${from} ${depth}, ${to} ${depth}, ${to} 1.6`}
                  fill="none"
                  stroke="var(--signal)"
                  strokeWidth="1.4"
                  strokeDasharray="4 3"
                  vectorEffect="non-scaling-stroke"
                  markerEnd="url(#loop-arrow)"
                />
              )
            })}
          </svg>

          <div className="border border-rule bg-background p-5 sm:p-7">
            <p className="type-data text-xs text-muted-foreground">
              {t("home.flowStep", {
                index: activeIndex + 1,
                total: steps.length,
              })}{" "}
              · {pickLocalized(active.role, lang)}
            </p>
            <h3 className="type-title mt-2 text-xl sm:text-2xl">
              {pickLocalized(active.title, lang)}
            </h3>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <p className="text-[0.9375rem] leading-7 text-foreground">
                {pickLocalized(active.body, lang)}
              </p>
              <div className="border-t border-rule pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <h4 className="type-data text-xs text-muted-foreground">
                  {t("home.flowPractice")}
                </h4>
                <p className="mt-2 text-[0.9375rem] leading-7 text-muted-foreground">
                  {pickLocalized(active.practice, lang)}
                </p>
                {active.loopsBack ? (
                  <p className="type-data mt-4 flex items-center gap-2 text-xs text-signal">
                    <CornerUpLeft className="size-3.5" />
                    {t("home.flowLoop")}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
