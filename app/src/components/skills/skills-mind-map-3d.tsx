import { useEffect, useRef, useState } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { useTranslation } from "react-i18next"
import { getTechIconUrl } from "@/lib/tech-icons"
import { cn } from "@/lib/utils"

export type SkillGroup = { key: string; ids: string[] }

type Tech = { id: string; name: string }

type Props = {
  groups: SkillGroup[]
  technologiesById: Record<string, Tech | undefined>
}

function TechIcon({ tech }: { tech: Tech }) {
  const [broken, setBroken] = useState(false)
  const src = getTechIconUrl(tech.id)

  if (!src || broken) {
    return (
      <div
        className="flex size-10 items-center justify-center rounded-xl border border-border/80 bg-muted/40 text-[10px] font-bold uppercase tracking-tighter text-muted-foreground shadow-inner"
        title={tech.name}
      >
        {tech.name.slice(0, 2)}
      </div>
    )
  }

  return (
    <div
      className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-background/80 p-1.5 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:border-primary/40"
      title={tech.name}
    >
      <img
        src={src}
        alt=""
        width={28}
        height={28}
        loading="lazy"
        decoding="async"
        className="size-7 object-contain"
        onError={() => setBroken(true)}
      />
    </div>
  )
}

function TechIconMotion({
  tech,
  index,
  mapProgress,
}: {
  tech: Tech
  index: number
  mapProgress: MotionValue<number>
}) {
  const y = useTransform(mapProgress, [0, 1], [8 + index * 2, 0])
  return (
    <motion.div style={{ y }}>
      <TechIcon tech={tech} />
    </motion.div>
  )
}

/**
 * Carrossel 3D: o pai aplica rotateY(scene). Cada painel fica em rotateY(θ)translateZ(R).
 * O billboard precisa de rotateY(-(θ + scene)) para a face continuar de frente à câmera.
 */
function MapPanel({
  techs,
  angleDeg,
  radius,
  label,
  mapProgress,
  sceneRotateY,
}: {
  techs: Tech[]
  angleDeg: number
  radius: number
  label: string
  mapProgress: MotionValue<number>
  sceneRotateY: MotionValue<number>
}) {
  const billboardY = useTransform(sceneRotateY, (A) => -(angleDeg + A))

  const panelOpacity = useTransform(
    mapProgress,
    [0, 0.08, 0.92, 1],
    [0.35, 1, 1, 0.4],
  )
  const panelScale = useTransform(
    mapProgress,
    [0, 0.12, 0.88, 1],
    [0.92, 1, 1, 0.94],
  )

  return (
    <div
      className="absolute left-1/2 top-1/2 [backface-visibility:hidden] [transform-style:preserve-3d]"
      style={{
        transform: `translate3d(-50%, -50%, 0) rotateY(${angleDeg}deg) translateZ(${radius}px)`,
        transformOrigin: "center center",
      }}
    >
      <motion.div
        className="[transform-style:preserve-3d]"
        style={{
          rotateY: billboardY,
          transformOrigin: "center center",
        }}
      >
        <motion.div
          className={cn(
            "relative w-[min(82vw,300px)] rounded-3xl border-2 p-4 shadow-2xl backdrop-blur-xl sm:w-[300px]",
            "border-primary/25 bg-gradient-to-br from-card/95 via-card/80 to-card/50",
            "dark:border-emerald-500/25 dark:shadow-[0_0_60px_-12px_rgba(52,211,153,0.22)]",
            "before:pointer-events-none before:absolute before:inset-0 before:rounded-[1.35rem] before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-60 dark:before:from-emerald-400/5",
          )}
          style={{
            opacity: panelOpacity,
            scale: panelScale,
            transformOrigin: "center center",
          }}
        >
          <div className="relative z-[1] mb-3 flex items-center gap-2 border-b border-border/50 pb-2">
            <span
              className="flex size-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]"
              aria-hidden
            />
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              {label}
            </h3>
          </div>
          <div className="relative z-[1] grid grid-cols-4 gap-2 sm:grid-cols-5">
            {techs.map((tech, i) => (
              <TechIconMotion
                key={tech.id}
                tech={tech}
                index={i}
                mapProgress={mapProgress}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export function SkillsMindMap3D({ groups, technologiesById }: Props) {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [orbitRadius, setOrbitRadius] = useState(300)

  useEffect(() => {
    const update = () =>
      setOrbitRadius(typeof window !== "undefined" && window.innerWidth < 640 ? 210 : 300)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const mapProgress = useTransform(scrollYProgress, [0.06, 0.78], [0, 1])

  const introOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0])
  const introScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.96])
  const introY = useTransform(scrollYProgress, [0, 0.18], [0, -48])
  const introBlur = useTransform(scrollYProgress, [0, 0.15], [0, 6])
  const titleFilter = useTransform(introBlur, (b) => `blur(${b}px)`)
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0.3])
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  /** Rotação única do carrossel — sem rotateX no mesmo nó (evita “torto”). */
  const sceneRotateY = useTransform(mapProgress, (p) =>
    reduceMotion ? 32 : p * -360,
  )

  const hubBillboardY = useTransform(sceneRotateY, (A) => -A)

  const sceneScale = useTransform(
    mapProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.92],
  )

  const bgY1 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"])
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 18])

  const stickyBgOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.5],
    [0.4, 0.9],
  )

  const hubScale = useTransform(
    mapProgress,
    [0, 0.2, 0.8, 1],
    [0.85, 1.05, 1.05, 0.95],
  )

  const n = groups.length

  const panels = groups.map((g, i) => {
    const angle = (360 / n) * i - 90
    const techs = g.ids
      .map((id) => technologiesById[id])
      .filter((x): x is Tech => Boolean(x))
    return {
      groupKey: g.key,
      angle,
      techs,
      label: t(`skills.${g.key}`),
    }
  })

  return (
    <div ref={containerRef} className="relative min-h-[280vh] w-full">
      <motion.section
        className="relative flex min-h-[62vh] flex-col items-center justify-center px-4 pt-10 pb-6 text-center sm:min-h-[58vh]"
        style={{ opacity: introOpacity, scale: introScale, y: introY }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <motion.div
            className="absolute left-1/2 top-1/3 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl"
            style={{ y: bgY1, rotate: bgRotate }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-400/15"
            style={{ y: bgY2 }}
          />
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <div className="skills-ht-scanlines absolute inset-0 -m-6 rounded-2xl opacity-50 sm:-m-10" />
          <motion.div style={{ filter: titleFilter }} className="relative">
            <p className="inline-block rounded border border-primary/35 bg-primary/5 px-3 py-1.5 font-mono text-[10px] font-medium tracking-[0.28em] text-primary sm:text-xs">
              {t("skills.techEyebrow")}
            </p>
            <h1 className="skills-ht-headline mt-8 text-4xl font-bold uppercase leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
              {t("skills.techHeadline")}
            </h1>
            <p className="mt-5 font-mono text-[11px] tracking-[0.22em] text-muted-foreground sm:text-sm">
              {t("skills.techHeadlineAccent")}
            </p>
          </motion.div>
        </div>

        <motion.p
          className="relative z-[1] mt-8 max-w-xl text-pretty text-base text-muted-foreground sm:mt-10 sm:text-lg"
          style={{ opacity: subtitleOpacity }}
        >
          {t("skills.mindSubtitle")}
        </motion.p>
        <motion.p
          className="relative z-[1] mt-8 text-xs font-medium uppercase tracking-[0.35em] text-primary/80"
          style={{ opacity: scrollHintOpacity }}
        >
          {t("skills.scrollExplore")}
        </motion.p>
      </motion.section>

      <div className="relative h-[200vh]">
        <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center overflow-hidden px-2">
          <div
            className="pointer-events-none absolute top-7 left-0 right-0 z-30 flex justify-center sm:top-10"
            aria-hidden
          >
            <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.4em] text-primary/90 sm:text-[11px]">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-primary/60 sm:w-10" />
              <span>{t("skills.hudLine")}</span>
              <span className="h-px w-6 bg-gradient-to-l from-transparent to-primary/60 sm:w-10" />
            </div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ opacity: stickyBgOpacity }}
            aria-hidden
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,var(--color-primary)/0.14,transparent_65%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
            <div
              className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
              style={{
                backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
                color: "var(--color-muted-foreground)",
              }}
            />
          </motion.div>

          {/*
            perspective no wrapper externo; rotação só em Y no anel.
            Inclinação fixa leve (rotateX) no estágio inteiro = mesmo vanishing point para todos.
          */}
          <div
            className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center [perspective:min(100vw,1200px)]"
            style={{ perspectiveOrigin: "50% 45%" }}
          >
            <div
              className="relative h-[min(72vw,420px)] w-[min(72vw,420px)] [transform-style:preserve-3d] sm:h-[480px] sm:w-[480px]"
              style={{
                transform: "rotateX(5deg)",
                transformOrigin: "center center",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="absolute inset-0 [transform-style:preserve-3d]"
                style={{
                  rotateY: sceneRotateY,
                  scale: sceneScale,
                  transformOrigin: "50% 50% 0",
                }}
              >
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(58vw,340px)] w-[min(58vw,340px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/20 sm:h-[400px] sm:w-[400px]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(50vw,280px)] w-[min(50vw,280px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 sm:h-[320px] sm:w-[320px]"
                  aria-hidden
                />

                {panels.map((p) => (
                  <MapPanel
                    key={p.groupKey}
                    techs={p.techs}
                    angleDeg={p.angle}
                    radius={orbitRadius}
                    label={p.label}
                    mapProgress={mapProgress}
                    sceneRotateY={sceneRotateY}
                  />
                ))}

                <div
                  className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <motion.div
                    style={{
                      translateZ: 28,
                      rotateY: hubBillboardY,
                      scale: hubScale,
                      transformOrigin: "center center",
                    }}
                    className={cn(
                      "flex size-[min(28vw,112px)] items-center justify-center rounded-2xl border-2 border-primary/35 bg-gradient-to-br from-primary/20 via-card to-card text-center shadow-[0_0_40px_-8px_var(--color-primary)] backdrop-blur-md sm:size-32",
                      "dark:border-emerald-400/30 dark:from-emerald-500/15 dark:shadow-[0_0_48px_-10px_rgba(52,211,153,0.35)]",
                    )}
                  >
                    <span className="px-2 text-xs font-bold uppercase tracking-[0.2em] text-foreground sm:text-sm">
                      {t("skills.mindHub")}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 w-[min(92vw,420px)] -translate-x-1/2 px-4">
            <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {t("skills.progressLabel")}
            </p>
            <div className="h-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full origin-left rounded-full bg-gradient-to-r from-primary to-emerald-500 dark:to-emerald-400"
                style={{ scaleX: mapProgress, width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
