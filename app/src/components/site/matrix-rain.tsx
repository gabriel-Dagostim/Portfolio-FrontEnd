import { useEffect, useRef } from "react"
import { useThemeMode } from "@/app/theme-provider"

/** Katakana is what makes the effect read as itself; digits keep it technical. */
const GLYPHS =
  "アカサタナハマヤラワイキシチニヒミリヰウクスツヌフムユルエケセテネヘメレヱオコソトノホモヨロヲ0123456789<>[]{}/\\=+*"

const FONT_SIZE = 14
const ROW_HEIGHT = FONT_SIZE * 1.35
/** Wide columns keep the field sparse enough to read through. */
const COLUMN_WIDTH = FONT_SIZE * 2.6
/** Frames per second. Lower than the display rate: the rain should drift. */
const FPS = 14

type Column = {
  /** Head position in rows, fractional so columns fall out of step. */
  y: number
  speed: number
  length: number
}

/**
 * A fixed canvas behind the whole page. Content sits on opaque surfaces, so
 * the rain reads in the gutters rather than under the text. It is deliberately
 * faint: the page has to stay readable first.
 */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolved } = useThemeMode()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduceMotion = window.matchMedia(
      "(prefers-motion: reduce), (prefers-reduced-motion: reduce)",
    ).matches
    if (reduceMotion) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const dark = resolved === "dark"
    const head = dark ? "rgba(150, 245, 205, 0.7)" : "rgba(16, 86, 66, 0.5)"
    const tail = dark ? "150, 245, 205" : "18, 92, 70"
    const fade = dark ? "rgba(20, 30, 40, 0.30)" : "rgba(243, 246, 247, 0.34)"

    let columns: Column[] = []
    let width = 0
    let height = 0
    let rows = 0
    let frame = 0
    let last = 0

    const newColumn = (seedAnywhere: boolean): Column => ({
      y: seedAnywhere ? Math.random() * rows : -Math.random() * rows * 0.6,
      speed: 0.2 + Math.random() * 0.38,
      length: 5 + Math.floor(Math.random() * 10),
    })

    function resize() {
      if (!canvas || !ctx) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `${FONT_SIZE}px "JetBrains Mono Variable", ui-monospace, monospace`
      ctx.textBaseline = "top"

      rows = Math.ceil(height / ROW_HEIGHT) + 2
      const count = Math.ceil(width / COLUMN_WIDTH)
      columns = Array.from({ length: count }, () => newColumn(true))
      ctx.clearRect(0, 0, width, height)
    }

    function draw(now: number) {
      frame = requestAnimationFrame(draw)
      if (document.hidden) return
      if (now - last < 1000 / FPS) return
      last = now
      if (!ctx) return

      // Painting a translucent wash over the previous frame is what leaves the
      // trail behind each head.
      ctx.fillStyle = fade
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < columns.length; i += 1) {
        const column = columns[i]
        const x = i * COLUMN_WIDTH
        const headRow = Math.floor(column.y)

        for (let n = 0; n < column.length; n += 1) {
          const row = headRow - n
          if (row < 0 || row > rows) continue
          const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          if (n === 0) {
            ctx.fillStyle = head
          } else {
            const alpha = (1 - n / column.length) * (dark ? 0.3 : 0.2)
            ctx.fillStyle = `rgba(${tail}, ${alpha.toFixed(3)})`
          }
          ctx.fillText(glyph, x, row * ROW_HEIGHT)
        }

        column.y += column.speed
        if (column.y - column.length > rows) {
          columns[i] = newColumn(false)
        }
      }
    }

    resize()
    frame = requestAnimationFrame(draw)

    let resizeTimer: number | undefined
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 180)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(resizeTimer)
      window.removeEventListener("resize", onResize)
    }
  }, [resolved])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.35] dark:opacity-[0.5]"
    />
  )
}
