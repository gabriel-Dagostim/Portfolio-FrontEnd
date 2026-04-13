import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { useRef } from "react"

type Props = {
  eyebrow: string
  title: string
  body: string
}

/**
 * Faixa estilo Apple: área alta + conteúdo sticky; título começa em perspectiva 3D
 * e “acha” o plano 2D conforme o scroll avança.
 */
export function HomeStoryPanel({ eyebrow, title, body }: Props) {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.22, 0.55, 0.85, 1],
    reduce ? [0, 0, 0, 0, 0] : [26, 14, 6, 2, 0],
  )
  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.75, 1],
    reduce ? [1, 1, 1, 1] : [0.9, 0.96, 0.99, 1],
  )
  const translateZ = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    reduce ? [0, 0, 0] : [48, 18, 0],
  )
  const titleY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [0, 0, 0] : [36, 12, 0],
  )
  const fadeIn = useTransform(scrollYProgress, [0, 0.12], [0.35, 1])

  return (
    <section ref={sectionRef} className="relative h-[min(200vh,1400px)] px-4 sm:px-6">
      <div className="sticky top-0 flex min-h-[100dvh] items-center justify-center py-20">
        <div
          className="mx-auto w-full max-w-3xl [perspective:1400px]"
          style={{ perspectiveOrigin: "50% 40%" }}
        >
          <motion.div
            className="relative text-center [transform-style:preserve-3d]"
            style={{
              rotateX,
              scale,
              translateZ,
              y: titleY,
              opacity: fadeIn,
            }}
          >
            <div className="mb-4 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-primary/90 ring-1 ring-primary/15">
                <span
                  className="size-1.5 rounded-full bg-primary"
                  aria-hidden
                />
                {eyebrow}
              </span>
            </div>
            <h2 className="skills-ht-headline text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
