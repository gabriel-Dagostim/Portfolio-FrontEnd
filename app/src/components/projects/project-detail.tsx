import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ChevronLeft, ChevronRight, ExternalLink, Lock } from "lucide-react"
import { GithubIcon } from "@/components/site/brand-icons"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { pickLocalized } from "@/lib/i18n-utils"
import { TechIcon } from "@/components/site/tech-icon"
import type { AreaOfWork, Category, Project, Technology } from "@/types"
import { cn } from "@/lib/utils"

type Props = {
  project: Project
  category?: Category
  area?: AreaOfWork
  techs: Technology[]
  /** Defer image loading until a dialog is actually open. */
  loadGallery?: boolean
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="border-t border-rule py-4 first:border-t-0 first:pt-0">
      <h3 className="type-data text-xs text-muted-foreground">{label}</h3>
      <p className="measure mt-2 text-sm leading-6 text-foreground">{value}</p>
    </div>
  )
}

export function ProjectDetail({
  project,
  category,
  area,
  techs,
  loadGallery = true,
}: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const gallery = project.galleryImages.length
    ? project.galleryImages
    : [project.coverImageUrl]
  const [shown, setShown] = useState({ projectId: project.id, index: 0 })
  const index = shown.projectId === project.id ? shown.index : 0
  const setIndex = (next: number | ((current: number) => number)) =>
    setShown({
      projectId: project.id,
      index: typeof next === "function" ? next(index) : next,
    })

  const internal = Boolean(category?.showcaseOnly)
  const categoryName = pickLocalized(category?.name, lang)
  const step = (delta: number) =>
    setIndex((i) => (i + delta + gallery.length) % gallery.length)

  return (
    <article className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
      <div className="min-w-0 lg:sticky lg:top-4 lg:self-start">
        <div className="relative overflow-hidden border border-rule bg-surface-sunken">
          <img
            key={gallery[index]}
            src={loadGallery ? gallery[index] : undefined}
            alt={t("projects.screenshot", { index: index + 1 })}
            className="aspect-[16/10] w-full object-cover object-top"
            loading="lazy"
            decoding="async"
          />
          {gallery.length > 1 ? (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-rule bg-background/92 px-2 py-1.5 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => step(-1)}
                className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-surface-sunken hover:text-foreground"
              >
                <ChevronLeft className="size-4" />
                <span className="sr-only">{t("projects.prevScreenshot")}</span>
              </button>
              <span className="type-data text-xs text-muted-foreground">
                {index + 1} / {gallery.length}
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-surface-sunken hover:text-foreground"
              >
                <ChevronRight className="size-4" />
                <span className="sr-only">{t("projects.nextScreenshot")}</span>
              </button>
            </div>
          ) : null}
        </div>

        {gallery.length > 1 ? (
          <ul className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {gallery.map((src, i) => (
              <li key={src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={i === index}
                  className={cn(
                    "block overflow-hidden border transition-colors",
                    i === index
                      ? "border-primary"
                      : "border-rule hover:border-rule-strong",
                  )}
                >
                  <img
                    src={loadGallery ? src : undefined}
                    alt=""
                    loading="lazy"
                    className="h-14 w-24 object-cover object-top"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {categoryName ? (
            <Badge variant="secondary">{categoryName}</Badge>
          ) : null}
          {area && pickLocalized(area.name, lang) !== categoryName ? (
            <Badge variant="outline">{pickLocalized(area.name, lang)}</Badge>
          ) : null}
          <Badge variant="data">{project.creationDate.slice(0, 4)}</Badge>
        </div>

        <h2 className="type-title mt-4 text-2xl sm:text-[1.75rem]">
          {pickLocalized(project.title, lang)}
        </h2>
        <p className="measure mt-3 text-[0.9375rem] leading-7 text-muted-foreground">
          {pickLocalized(project.shortDescription, lang)}
        </p>

        {internal ? (
          <p className="type-data mt-4 flex items-center gap-2 border border-rule bg-surface-sunken px-3 py-2 text-xs text-muted-foreground">
            <Lock className="size-3.5 shrink-0" />
            {t("projects.internalOnly")}
          </p>
        ) : null}

        {project.githubUrl || project.liveUrl ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ size: "sm" }))}
              >
                <ExternalLink className="size-3.5" />
                {t("projects.live")}
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                <GithubIcon className="size-3.5" />
                {t("projects.github")}
              </a>
            ) : null}
          </div>
        ) : null}

        <div className="mt-8">
          <Field
            label={t("projects.context")}
            value={pickLocalized(project.context, lang)}
          />
          <Field
            label={t("projects.participation")}
            value={pickLocalized(project.participation, lang)}
          />
          <Field
            label={t("projects.challenges")}
            value={pickLocalized(project.technicalChallenges, lang)}
          />
          <Field
            label={t("projects.description")}
            value={pickLocalized(project.fullDescription, lang)}
          />
        </div>

        {techs.length > 0 ? (
          <div className="mt-2 border-t border-rule pt-4">
            <h3 className="type-data text-xs text-muted-foreground">
              {t("projects.technologies")}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {techs.map((techItem) => (
                <li key={techItem.id}>
                  <Badge variant="data" className="gap-1.5 py-1">
                    <TechIcon techId={techItem.id} />
                    {techItem.name}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  )
}
