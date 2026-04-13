import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion"

type Props = {
  pageProgress: MotionValue<number>
}

/** Fundo tech fixo em camadas — parallax ligado ao scroll da página. */
export function HomeTechBackdrop({ pageProgress }: Props) {
  const reduce = useReducedMotion()

  const yFar = useTransform(pageProgress, [0, 1], ["0%", "45%"])
  const yMid = useTransform(pageProgress, [0, 1], ["0%", "28%"])
  const yNear = useTransform(pageProgress, [0, 1], ["0%", "12%"])
  const rotateFloor = useTransform(
    pageProgress,
    [0, 0.5, 1],
    reduce ? [58, 58, 58] : [56, 62, 68],
  )
  const gridOpacity = useTransform(
    pageProgress,
    [0, 0.15, 0.5],
    [0.12, 0.22, 0.28],
  )
  const pulse = useTransform(
    pageProgress,
    [0, 0.3, 0.6, 1],
    [0.4, 0.7, 0.55, 0.85],
  )
  const ring1Y = useTransform(pageProgress, [0, 1], ["0%", "15%"])
  const ring2Y = useTransform(pageProgress, [0, 1], ["0%", "10%"])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-background" />

      <motion.div
        className="absolute -left-1/4 top-0 h-[80vh] w-[80vw] rounded-full bg-primary/20 blur-[100px] dark:bg-primary/25"
        style={{ y: yFar, opacity: pulse }}
      />
      <motion.div
        className="absolute -right-1/4 top-1/3 h-[60vh] w-[70vw] rounded-full bg-emerald-500/10 blur-[90px] dark:bg-emerald-400/15"
        style={{ y: yMid }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-[50vh] w-[90vw] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[100px] dark:bg-violet-400/12"
        style={{ y: yNear }}
      />

      <div className="absolute inset-0 flex items-end justify-center overflow-hidden pb-0">
        <motion.div
          className="h-[120%] w-[200%] origin-bottom [transform-style:preserve-3d]"
          style={{
            rotateX: rotateFloor,
            opacity: gridOpacity,
            scale: 1.05,
          }}
        >
          <div
            className="h-full w-full [mask-image:linear-gradient(to_top,black_0%,transparent_78%)]"
            style={{
              backgroundImage: `
                linear-gradient(to right, oklch(from var(--primary) l c h / 0.14) 1px, transparent 1px),
                linear-gradient(to bottom, oklch(from var(--primary) l c h / 0.1) 1px, transparent 1px),
                linear-gradient(to right, oklch(from var(--muted-foreground) l c h / 0.06) 1px, transparent 1px),
                linear-gradient(to bottom, oklch(from var(--muted-foreground) l c h / 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px, 80px 80px, 16px 16px, 16px 16px",
            }}
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute left-1/2 top-[18%] h-[min(100vw,640px)] w-[min(100vw,640px)] -translate-x-1/2 rounded-full border border-primary/10"
        style={{ y: ring1Y }}
      />
      <motion.div
        className="absolute left-1/2 top-[20%] h-[min(85vw,520px)] w-[min(85vw,520px)] -translate-x-1/2 rounded-full border border-dashed border-primary/15"
        style={{ y: ring2Y }}
      />

      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, oklch(from var(--foreground) l c h / 0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="skills-ht-scanlines absolute inset-0 opacity-[0.35]" />

      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
    </div>
  )
}
