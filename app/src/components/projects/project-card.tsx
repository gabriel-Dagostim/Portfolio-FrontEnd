import { useTranslation } from "react-i18next"
import { Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { pickLocalized } from "@/lib/i18n-utils"
import type { Category, Project, Technology } from "@/types"
import { cn } from "@/lib/utils"

type Props = {
  project: Project
  category?: Category
  techs: Technology[]
  onOpen: () => void
  className?: string
}

/**
 * A flat, bordered record rather than a floating card. Each one owns its own
 * border and sits in a real gap, so nothing reads as glued to its neighbour.
 */
export function ProjectCard({
  project,
  category,
  techs,
  onOpen,
  className,
}: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const year = project.creationDate.slice(0, 4)
  const internal = Boolean(category?.showcaseOnly)

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group flex h-full w-full flex-col border border-rule bg-surface text-left transition-colors hover:border-primary/50",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-rule bg-surface-sunken">
        <img
          src={project.thumbnailUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-top"
        />
        {project.workingOn || internal ? (
          <div className="absolute left-0 top-0 flex">
            {project.workingOn ? (
              <span className="type-data flex items-center gap-1.5 bg-signal px-2.5 py-1.5 text-[0.6875rem] text-signal-foreground">
                <span className="signal-live size-1.5 rounded-full bg-signal-foreground" />
                {t("projects.workingBadge")}
              </span>
            ) : null}
            {internal ? (
              <span className="type-data flex items-center gap-1.5 bg-foreground px-2.5 py-1.5 text-[0.6875rem] text-background">
                <Lock className="size-3" />
                {t("projects.internalSystem")}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="type-title text-lg leading-snug group-hover:underline group-hover:decoration-primary group-hover:underline-offset-4">
            {pickLocalized(project.title, lang)}
          </h3>
          <span className="type-data shrink-0 text-xs text-muted-foreground">
            {year}
          </span>
        </div>

        {category ? (
          <p className="mt-2.5 text-xs text-muted-foreground">
            {pickLocalized(category.name, lang)}
          </p>
        ) : null}

        <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">
          {pickLocalized(project.shortDescription, lang)}
        </p>

        {techs.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {techs.slice(0, 4).map((techItem) => (
              <li key={techItem.id}>
                <Badge variant="data">{techItem.name}</Badge>
              </li>
            ))}
            {techs.length > 4 ? (
              <li>
                <Badge variant="data">+{techs.length - 4}</Badge>
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>
    </button>
  )
}
