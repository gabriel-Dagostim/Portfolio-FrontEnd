import { useState } from "react"
import { getTechIconUrl } from "@/lib/tech-icons"
import { cn } from "@/lib/utils"

/**
 * Logos come from a public CDN. If one is blocked or missing the badge should
 * simply lose its icon, never show a broken-image glyph.
 */
export function TechIcon({
  techId,
  className,
}: {
  techId: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const src = getTechIconUrl(techId)

  if (!src || failed) return null

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("size-3.5 shrink-0", className)}
    />
  )
}
