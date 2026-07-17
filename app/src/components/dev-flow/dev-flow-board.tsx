import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { AnimatePresence, motion } from "framer-motion"
import {
  Bot,
  Container,
  Eye,
  FlaskConical,
  MessageSquareCode,
  ServerCog,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react"
import {
  FLOW_EDGES,
  FLOW_STEPS,
  getFlowStep,
  type FlowStepDef,
  type FlowStepId,
} from "@/components/dev-flow/flow-steps"
import { cn } from "@/lib/utils"

const ICONS: Record<FlowStepId, LucideIcon> = {
  prompt: MessageSquareCode,
  vibe: Bot,
  review: Eye,
  tests: FlaskConical,
  security: ShieldCheck,
  ops: ServerCog,
  deploy: Container,
}

const NODE_W = 156
const NODE_H = 56
const STROKE = 3

type Props = {
  className?: string
  compact?: boolean
}

type Pt = { x: number; y: number }

function centerOf(step: FlowStepDef, w: number, h: number): Pt {
  return { x: (step.x / 100) * w, y: (step.y / 100) * h }
}

/** Connect right/left/top/bottom ports so lines meet the node edges. */
function edgePorts(
  from: FlowStepDef,
  to: FlowStepDef,
  w: number,
  h: number,
  feedback: boolean,
): { start: Pt; end: Pt; path: string } {
  const a = centerOf(from, w, h)
  const b = centerOf(to, w, h)
  const hw = NODE_W / 2
  const hh = NODE_H / 2

  if (feedback) {
    const start = { x: a.x, y: a.y - hh }
    const end = { x: b.x, y: b.y - hh }
    const midY = Math.min(start.y, end.y) - 28
    const path = `M ${start.x} ${start.y} L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`
    return { start, end, path }
  }

  // Same row → right port → left port
  if (Math.abs(a.y - b.y) < 12) {
    const start = { x: a.x + hw, y: a.y }
    const end = { x: b.x - hw, y: b.y }
    return {
      start,
      end,
      path: `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
    }
  }

  // Same column → bottom → top (or reverse)
  if (Math.abs(a.x - b.x) < 12) {
    if (b.y > a.y) {
      const start = { x: a.x, y: a.y + hh }
      const end = { x: b.x, y: b.y - hh }
      return {
        start,
        end,
        path: `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
      }
    }
    const start = { x: a.x, y: a.y - hh }
    const end = { x: b.x, y: b.y + hh }
    return {
      start,
      end,
      path: `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
    }
  }

  // Elbow: exit bottom/right then into top/left of target
  if (b.y > a.y) {
    const start = { x: a.x, y: a.y + hh }
    const end = { x: b.x - hw, y: b.y }
    const path = `M ${start.x} ${start.y} L ${start.x} ${end.y} L ${end.x} ${end.y}`
    return { start, end, path }
  }

  const start = { x: a.x + hw, y: a.y }
  const end = { x: b.x, y: b.y - hh }
  const path = `M ${start.x} ${start.y} L ${end.x} ${start.y} L ${end.x} ${end.y}`
  return { start, end, path }
}

export function DevFlowBoard({ className, compact = false }: Props) {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState<FlowStepId | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = boardRef.current
    if (!el) return
    const update = () => {
      const r = el.getBoundingClientRect()
      setSize({ w: r.width, h: r.height })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const nodesById = useMemo(
    () => new Map(FLOW_STEPS.map((s) => [s.id, s])),
    [],
  )

  const feedbackEdges = useMemo(() => {
    const list: Array<[FlowStepId, FlowStepId]> = []
    for (const step of FLOW_STEPS) {
      for (const target of step.loopsTo ?? []) {
        list.push([step.id, target])
      }
    }
    return list
  }, [])

  const active = activeId ? getFlowStep(activeId) : null
  const ActiveIcon = activeId ? ICONS[activeId] : null
  const ready = size.w > 0 && size.h > 0

  return (
    <div className={cn("relative", className)}>
      <div
        ref={boardRef}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border/70 bg-[#0f0f12]/[0.35] shadow-sm dark:bg-card/50",
          "bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-size-[16px_16px]",
          compact ? "min-h-[400px]" : "min-h-[480px]",
        )}
      >
        {ready ? (
          <svg
            className="pointer-events-none absolute inset-0 z-0"
            width={size.w}
            height={size.h}
            viewBox={`0 0 ${size.w} ${size.h}`}
            aria-hidden
          >
            <defs>
              <marker
                id="flow-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path d="M 0 1.2 L 8 5 L 0 8.8 Z" fill="#a1a1aa" />
              </marker>
            </defs>

            {FLOW_EDGES.map(([aId, bId]) => {
              const from = nodesById.get(aId)!
              const to = nodesById.get(bId)!
              const { path } = edgePorts(from, to, size.w, size.h, false)
              const related =
                !activeId || activeId === aId || activeId === bId
              return (
                <path
                  key={`${aId}-${bId}`}
                  d={path}
                  fill="none"
                  stroke={to.color}
                  strokeWidth={STROKE}
                  strokeOpacity={related ? 0.95 : 0.45}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd="url(#flow-arrow)"
                />
              )
            })}

            {feedbackEdges.map(([aId, bId], i) => {
              const from = nodesById.get(aId)!
              const to = nodesById.get(bId)!
              // Stagger loop height so multiple returns don’t overlap
              const a = centerOf(from, size.w, size.h)
              const b = centerOf(to, size.w, size.h)
              const hh = NODE_H / 2
              const start = { x: a.x, y: a.y - hh }
              const end = { x: b.x, y: b.y - hh }
              const lift = 24 + i * 14
              const midY = Math.min(start.y, end.y) - lift
              const d = `M ${start.x} ${start.y} L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`
              const related =
                !activeId || activeId === aId || activeId === bId
              return (
                <path
                  key={`fb-${aId}-${bId}`}
                  d={d}
                  fill="none"
                  stroke={from.color}
                  strokeWidth={STROKE}
                  strokeOpacity={related ? 0.7 : 0.3}
                  strokeDasharray="6 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )
            })}
          </svg>
        ) : null}

        {FLOW_STEPS.map((step) => {
          const Icon = ICONS[step.id]
          const selected = activeId === step.id
          return (
            <button
              key={step.id}
              type="button"
              onClick={() =>
                setActiveId((cur) => (cur === step.id ? null : step.id))
              }
              className="absolute z-10 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                left: `${step.x}%`,
                top: `${step.y}%`,
                width: NODE_W,
                height: NODE_H,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className={cn(
                  "relative flex h-full w-full items-center gap-2.5 rounded-md border bg-card px-2.5 py-1.5 font-sans transition-all",
                  selected
                    ? "border-primary ring-1 ring-primary/35"
                    : "border-border/80 hover:border-primary/45",
                )}
                style={{
                  boxShadow: selected
                    ? `0 0 0 1px ${step.color}55`
                    : `0 1px 0 0 color-mix(in oklab, ${step.color} 35%, transparent)`,
                }}
              >
                <span
                  className="absolute left-0 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-border bg-card"
                  style={{ borderColor: step.color }}
                  aria-hidden
                />
                <span
                  className="absolute right-0 top-1/2 size-2 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-border bg-card"
                  style={{ borderColor: step.color }}
                  aria-hidden
                />
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded"
                  style={{
                    backgroundColor: `${step.color}1f`,
                    color: step.color,
                  }}
                >
                  <Icon className="size-4" strokeWidth={2.25} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-semibold leading-tight tracking-tight text-foreground">
                    {t(`flow.steps.${step.id}.title`)}
                  </span>
                  <span className="mt-0.5 block truncate text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                    {t(`flow.steps.${step.id}.tag`)}
                  </span>
                </span>
              </span>
            </button>
          )
        })}

        <p className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-md border border-border/50 bg-background/85 px-2.5 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-sm">
          {t("flow.canvasHint")}
        </p>
      </div>

      <AnimatePresence>
        {active && ActiveIcon && activeId ? (
          <motion.aside
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="relative z-30 mt-4 rounded-2xl border border-border/70 bg-card/95 p-5 shadow-md backdrop-blur-md sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-md"
                  style={{
                    backgroundColor: `${active.color}22`,
                    color: active.color,
                  }}
                >
                  <ActiveIcon className="size-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("flow.activeLabel")}
                  </p>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {t(`flow.steps.${activeId}.title`)}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="rounded-md border border-border/70 p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label={t("common.close")}
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("flow.cardWhat")}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                  {t(`flow.steps.${activeId}.body`)}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("flow.cardHow")}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {t(`flow.steps.${activeId}.how`)}
                </p>
              </div>
            </div>
            <p className="mt-4 rounded-xl border border-border/60 bg-muted/25 px-3 py-2.5 text-sm text-foreground/85">
              {t(`flow.steps.${activeId}.check`)}
            </p>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
