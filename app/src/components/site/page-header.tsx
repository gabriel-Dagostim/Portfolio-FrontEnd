import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Props = {
  title: string
  lead?: string
  /** Machine-readable counts and filters sit on the right of the rule. */
  aside?: ReactNode
  className?: string
}

/**
 * Every inner page opens the same way: a hairline, the title set in the
 * display voice, and a single sentence of lead under 62 characters wide.
 */
export function PageHeader({ title, lead, aside, className }: Props) {
  return (
    <header className={cn("border-b border-rule pb-8 pt-12 sm:pt-16", className)}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="type-display text-[clamp(2.25rem,6vw,3.75rem)]">
            {title}
          </h1>
          {lead ? (
            <p className="measure mt-5 text-[0.9375rem] leading-7 text-muted-foreground sm:text-base">
              {lead}
            </p>
          ) : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
    </header>
  )
}

export function PageContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto max-w-[84rem] px-5 sm:px-8", className)}>
      {children}
    </div>
  )
}

/**
 * A section heading that carries its own hairline. The heading and its rule
 * are one unit so section spacing can never drift apart.
 */
export function SectionHeading({
  title,
  lead,
  aside,
  className,
  id,
}: {
  title: string
  lead?: string
  aside?: ReactNode
  className?: string
  id?: string
}) {
  return (
    <div className={cn("border-t border-rule pt-6", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 id={id} className="type-title text-2xl sm:text-[1.75rem]">
          {title}
        </h2>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
      {lead ? (
        <p className="measure mt-3 text-[0.9375rem] leading-7 text-muted-foreground">
          {lead}
        </p>
      ) : null}
    </div>
  )
}
