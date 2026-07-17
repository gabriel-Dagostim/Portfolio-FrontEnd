import { useTranslation } from "react-i18next"
import type { ReactNode } from "react"
import {
  Building2,
  CalendarDays,
  Code2,
  ExternalLink,
  Focus,
  History,
  Layers,
  Shield,
  Sparkles,
  Wrench,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RouterLinkButton } from "@/components/ui/link-button"
import { AnchorButton } from "@/components/ui/anchor-button"
import { SectionReveal } from "@/components/motion/section-reveal"
import { pickBilingual } from "@/lib/i18n-utils"
import type { Category, Project, Technology } from "@/types"
import { cn } from "@/lib/utils"

type Props = {
  project: Project
  category?: Category
  area?: { name: { pt: string; en: string } }
  techs: Technology[]
  /** When false, gallery URLs are not rendered (lazy). */
  loadGallery: boolean
  /** Compact mode inside the side sheet */
  compact?: boolean
  /** Hide "open full page" when already on the detail route */
  showFullPageLink?: boolean
}

function InfoBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof History
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/50 p-4 sm:p-5">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-tight">
        <span className="flex size-8 items-center justify-center rounded-xl bg-primary/12 text-primary">
          <Icon className="size-4" />
        </span>
        {title}
      </div>
      <div className="text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  )
}

export function ProjectDetailPanel({
  project,
  category,
  area,
  techs,
  loadGallery,
  compact = false,
  showFullPageLink = true,
}: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const showcaseOnly = Boolean(category?.showcaseOnly)
  const hasLinks = Boolean(project.githubUrl || project.liveUrl)
  const year = project.creationDate.slice(0, 10)
  const title = pickBilingual(project.title, lang)
  const gallery = project.galleryImages

  return (
    <div className={cn("space-y-8", compact && "space-y-6")}>
      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {showcaseOnly ? (
            <Badge className="gap-1.5 bg-primary/15 text-primary hover:bg-primary/20">
              <Shield className="size-3.5" />
              {t("projects.internalSystem")}
            </Badge>
          ) : null}
          {project.workingOn ? (
            <Badge className="gap-1.5 bg-amber-500/15 text-amber-700 hover:bg-amber-500/20 dark:text-amber-300">
              {t("projects.workingBadge")}
            </Badge>
          ) : null}
          {project.featured ? (
            <Badge variant="secondary" className="gap-1.5">
              <Sparkles className="size-3.5" />
              {t("common.featured")}
            </Badge>
          ) : null}
          {category ? (
            <Badge variant="outline">
              {pickBilingual(category.name, lang)}
            </Badge>
          ) : null}
        </div>

        <div>
          <h2
            className={cn(
              "font-semibold tracking-tight text-balance",
              compact ? "text-2xl" : "text-3xl sm:text-4xl",
            )}
          >
            {title}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {pickBilingual(project.shortDescription, lang)}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-primary" />
            {year}
          </span>
          {area ? (
            <span className="inline-flex items-center gap-1.5">
              <Layers className="size-3.5 text-primary" />
              {pickBilingual(area.name, lang)}
            </span>
          ) : null}
          {showcaseOnly ? (
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="size-3.5 text-primary" />
              {t("projects.noPublicDemo")}
            </span>
          ) : null}
        </div>
      </header>

      {/* Cover for non-showcase */}
      {!showcaseOnly ? (
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-muted/30">
          <div className="aspect-[16/10] w-full">
            <img
              src={project.coverImageUrl}
              alt=""
              loading={loadGallery ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ) : null}

      {/* Focus + overview */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Focus className="size-4 text-primary" />
          <h3 className="text-lg font-semibold tracking-tight">
            {t("projects.focus")}
          </h3>
        </div>
        <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-primary/10 via-card/40 to-transparent p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
            {pickBilingual(project.fullDescription, lang)}
          </p>
        </div>
      </section>

      {/* History / role / challenges */}
      <section
        className={cn(
          "grid gap-4",
          compact ? "grid-cols-1" : "md:grid-cols-2",
        )}
      >
        {project.context ? (
          <InfoBlock icon={History} title={t("projects.history")}>
            {pickBilingual(project.context, lang)}
          </InfoBlock>
        ) : null}
        {project.participation ? (
          <InfoBlock icon={Wrench} title={t("projects.participation")}>
            {pickBilingual(project.participation, lang)}
          </InfoBlock>
        ) : null}
        {project.technicalChallenges ? (
          <InfoBlock
            icon={Sparkles}
            title={t("projects.challenges")}
          >
            {pickBilingual(project.technicalChallenges, lang)}
          </InfoBlock>
        ) : null}
        {showcaseOnly ? (
          <InfoBlock icon={Shield} title={t("projects.deliveryNoteTitle")}>
            {t("projects.deliveryNoteBody")}
          </InfoBlock>
        ) : null}
      </section>

      {/* Technologies */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Code2 className="size-4 text-primary" />
          <h3 className="text-lg font-semibold tracking-tight">
            {t("projects.technologies")}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("projects.technologiesHint")}
        </p>
        <div className="flex flex-wrap gap-2">
          {techs.map((x) => (
            <Badge
              key={x.id}
              variant="secondary"
              className="px-3 py-1.5 text-sm font-medium"
            >
              {x.name}
            </Badge>
          ))}
        </div>
      </section>

      {/* Gallery — uniform frames */}
      {loadGallery && gallery.length > 0 ? (
        <section className="space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                {t("projects.gallery")}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {showcaseOnly
                  ? t("projects.showcaseHint")
                  : t("projects.galleryHint")}
              </p>
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("projects.galleryCount", { count: gallery.length })}
            </p>
          </div>

          <div
            className={cn(
              "grid gap-4",
              compact ? "grid-cols-1" : "sm:grid-cols-2",
            )}
          >
            {gallery.map((url, i) => (
              <SectionReveal key={url} delay={i * 0.03}>
                <figure className="overflow-hidden rounded-2xl border border-border/70 bg-muted/25 shadow-sm">
                  <div className="relative aspect-[16/10] w-full bg-background/40">
                    <img
                      src={url}
                      alt={`${title} — ${t("projects.screenshot")} ${String(i + 1).padStart(2, "0")}`}
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-contain object-center p-2"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between border-t border-border/60 px-3 py-2 text-xs text-muted-foreground">
                    <span>
                      {t("projects.screenshot")}{" "}
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium text-foreground/70">
                      {String(i + 1)}/{gallery.length}
                    </span>
                  </figcaption>
                </figure>
              </SectionReveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* Actions */}
      <footer className="flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:flex-wrap sm:items-center">
        {showFullPageLink ? (
          <RouterLinkButton to={`/projects/${project.slug}`}>
            {t("common.viewFullPage")}
          </RouterLinkButton>
        ) : null}
        {!showcaseOnly && project.githubUrl ? (
          <AnchorButton
            variant="outline"
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Code2 className="mr-2 size-4" />
            {t("projects.github")}
          </AnchorButton>
        ) : null}
        {!showcaseOnly && project.liveUrl ? (
          <AnchorButton
            variant="outline"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink className="mr-2 size-4" />
            {t("projects.live")}
          </AnchorButton>
        ) : null}
        {showcaseOnly && !hasLinks ? (
          <p className="text-sm text-muted-foreground">
            {t("projects.internalOnly")}
          </p>
        ) : null}
      </footer>
    </div>
  )
}
