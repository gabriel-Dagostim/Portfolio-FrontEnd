import { useTranslation } from "react-i18next"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { useRef } from "react"
import { ChevronDown } from "lucide-react"
import { RouterLinkButton } from "@/components/ui/link-button"

export function HeroSection() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])
  const yFloat = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.12])

  const heroRotateX = useTransform(
    scrollYProgress,
    [0, 0.35, 0.72, 1],
    reduce ? [0, 0, 0, 0] : [22, 10, 3, 0],
  )
  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    reduce ? [1, 1, 1] : [0.93, 0.98, 1],
  )
  const heroZ = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [0, 0, 0] : [56, 20, 0],
  )

  return (
    <section
      ref={ref}
      className="relative min-h-[min(100dvh,900px)] overflow-hidden px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24"
    >
      <motion.div
        style={{ y: yBg, opacity }}
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl dark:bg-primary/18" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" />
      </motion.div>

      <div className="mx-auto flex min-h-[calc(min(100dvh,900px)-8rem)] max-w-4xl items-center justify-center [perspective:1600px]">
        <motion.div
          style={{
            y: yFloat,
            rotateX: heroRotateX,
            scale: heroScale,
            translateZ: heroZ,
          }}
          className="w-full text-center [transform-style:preserve-3d]"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary"
          >
            {t("common.role")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            {t("home.headline")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground"
          >
            {t("home.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <RouterLinkButton to="/projects" size="lg">
              {t("home.ctaProjects")}
            </RouterLinkButton>
            <RouterLinkButton to="/contact" size="lg" variant="outline">
              {t("home.ctaContact")}
            </RouterLinkButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 flex flex-col items-center gap-1 text-xs text-muted-foreground"
          >
            <span>{t("home.scroll")}</span>
            <ChevronDown className="size-4 animate-bounce" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
