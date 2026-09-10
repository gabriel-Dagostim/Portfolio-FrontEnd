import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Props = {
  title: string
  lead?: string
  /** Counts and filters sit opposite the title, on the same baseline. */
  aside?: ReactNode
  className?: string
}

/**
 * Every inner page opens the same way: the title in the display voice, one
 * sentence of lead under 62 characters wide, and a hairline closing the block.
 */
export function PageHeader({ title, lead, aside, className }: Props) {
  return (
    <header
      className={cn("border-b border-rule pb-12 pt-16 sm:pt-20", className)}
    >
      <div className="text-scrim flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
        <div>
          <h1 className="type-display text-[clamp(2.25rem,6vw,3.75rem)]">
            {title}
          </h1>
          {lead ? (
            <p className="measure mt-6 text-[0.9375rem] leading-8 text-muted-foreground sm:text-base">
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
    <div className={cn("mx-auto max-w-[84rem] px-6 sm:px-10", className)}>
      {children}
    </div>
  )
}

/**
 * A section heading that carries its own hairline, so the heading and its rule
 * can never drift apart as spacing changes.
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
    <div className={cn("border-t border-rule pt-8", className)}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
        <h2 id={id} className="type-title text-2xl sm:text-3xl">
          {title}
        </h2>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
      {lead ? (
        <p className="measure mt-4 text-[0.9375rem] leading-8 text-muted-foreground">
          {lead}
        </p>
      ) : null}
    </div>
  )
}
