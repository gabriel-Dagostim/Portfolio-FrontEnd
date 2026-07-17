import { motion } from "framer-motion"

/** Atmosfera de Sistemas — painéis / apps internos flutuando. */
export function SystemsAtmosphere() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,oklch(from_var(--primary)_l_c_h/0.16),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_40%,oklch(0.7_0.12_250/0.08),transparent_50%)]" />

      {[
        { top: "12%", left: "6%", w: "18%", h: "14%", delay: 0 },
        { top: "28%", right: "8%", w: "22%", h: "16%", delay: 0.4 },
        { top: "58%", left: "12%", w: "16%", h: "12%", delay: 0.8 },
        { top: "70%", right: "14%", w: "20%", h: "15%", delay: 1.1 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-2xl border border-border/40 bg-card/20 shadow-sm backdrop-blur-[1px]"
          style={{
            top: p.top,
            left: "left" in p ? p.left : undefined,
            right: "right" in p ? p.right : undefined,
            width: p.w,
            height: p.h,
          }}
          animate={{ y: [0, -10, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{
            duration: 7 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          <div className="m-2 h-1.5 w-1/3 rounded-full bg-primary/30" />
          <div className="mx-2 mt-2 space-y-1.5">
            <div className="h-1 w-full rounded-full bg-muted-foreground/15" />
            <div className="h-1 w-4/5 rounded-full bg-muted-foreground/10" />
            <div className="h-1 w-2/3 rounded-full bg-muted-foreground/10" />
          </div>
        </motion.div>
      ))}

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />
    </div>
  )
}

/** Atmosfera de Infra — rede, nós e links. */
export function InfraAtmosphere() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_10%,oklch(0.65_0.14_200/0.14),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_80%,oklch(from_var(--primary)_l_c_h/0.12),transparent_55%)]" />

      <svg
        className="absolute inset-0 h-full w-full opacity-40 dark:opacity-50"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="infra-link" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.7 0.12 200)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="oklch(0.65 0.18 290)" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        {[
          "M 8 22 L 32 38 L 55 20 L 78 42",
          "M 12 70 L 40 55 L 62 72 L 88 48",
          "M 30 15 L 48 48 L 70 60",
          "M 20 45 L 50 50 L 85 28",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#infra-link)"
            strokeWidth="0.35"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0.2, opacity: 0.3 }}
            animate={{ pathLength: [0.25, 1, 0.25], opacity: [0.25, 0.7, 0.25] }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
        {[
          [8, 22],
          [32, 38],
          [55, 20],
          [78, 42],
          [40, 55],
          [62, 72],
          [48, 48],
          [85, 28],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="0.9"
            className="fill-cyan-400/70 dark:fill-cyan-300/80"
            animate={{ opacity: [0.35, 1, 0.35], r: [0.7, 1.15, 0.7] }}
            transition={{
              duration: 3.2 + (i % 4) * 0.4,
              repeat: Infinity,
              delay: i * 0.25,
            }}
          />
        ))}
      </svg>

      <div className="absolute right-[6%] top-[18%] hidden w-28 flex-col gap-1 opacity-30 sm:flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-3 rounded-sm border border-cyan-500/30 bg-cyan-500/10"
            style={{ width: `${70 + ((i * 13) % 30)}%` }}
          />
        ))}
      </div>
    </div>
  )
}

const CODE_BITS = [
  "async fn deploy()",
  "SELECT * FROM ops",
  "kubectl apply -f",
  "queue.push(job)",
  "if (ready) ship()",
  "n8n.trigger()",
  "auth.verify()",
  "stream.pipe()",
]

/** Atmosfera de Automações — código colorido e fluxos de dados. */
export function AutomationsAtmosphere() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.7_0.18_145/0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_60%,oklch(from_var(--primary)_l_c_h/0.14),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_80%,oklch(0.75_0.16_40/0.1),transparent_45%)]" />

      {CODE_BITS.map((bit, i) => {
        const left = 4 + ((i * 17) % 88)
        const top = 8 + ((i * 23) % 78)
        const colors = [
          "text-emerald-400/50",
          "text-violet-400/50",
          "text-amber-400/45",
          "text-cyan-400/50",
          "text-rose-400/45",
          "text-sky-400/50",
        ]
        return (
          <motion.span
            key={bit}
            className={`absolute font-mono text-[10px] tracking-tight sm:text-xs ${colors[i % colors.length]}`}
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{
              y: [0, -28 - (i % 3) * 8, 0],
              x: [0, (i % 2 === 0 ? 12 : -10), 0],
              opacity: [0.15, 0.55, 0.15],
            }}
            transition={{
              duration: 9 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.35,
            }}
          >
            {bit}
          </motion.span>
        )
      })}

      <svg
        className="absolute inset-x-0 top-1/3 h-40 w-full opacity-50"
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 40 C 60 10, 100 70, 160 40 S 260 10, 320 45 S 380 70, 400 35"
          fill="none"
          stroke="oklch(0.72 0.16 145 / 0.45)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          animate={{ strokeDashoffset: [0, -40] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M0 55 C 80 80, 120 20, 200 50 S 300 75, 400 30"
          fill="none"
          stroke="oklch(0.7 0.18 290 / 0.35)"
          strokeWidth="1.2"
          strokeDasharray="4 10"
          animate={{ strokeDashoffset: [0, 48] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  )
}
