import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { ChevronLeft, ChevronRight, Code2, ExternalLink, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RouterLinkButton } from "@/components/ui/link-button"
import { AnchorButton } from "@/components/ui/anchor-button"
import { getTechIconUrl } from "@/lib/tech-icons"
import { pickBilingual } from "@/lib/i18n-utils"
import type { Category, Project, Technology } from "@/types"
import { cn } from "@/lib/utils"

type Props = {
  project: Project
  category?: Category
  area?: { name: { pt: string; en: string } }
  techs: Technology[]
  loadGallery: boolean
  showFullPageLink?: boolean
}

function TechRow({ tech }: { tech: Technology }) {
  const src = getTechIconUrl(tech.id)
  return (
    <li className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-secondary/50 px-2.5 py-2">
      {src ? (
        <img
          src={src}
          alt=""
          className="size-5 shrink-0 object-contain"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="size-5 shrink-0 rounded-md bg-primary/30" aria-hidden />
      )}
      <span className="min-w-0 truncate text-sm font-medium text-foreground">
        {tech.name}
      </span>
    </li>
  )
}

export function ProjectDetailPanel({
  project,
  category,
  techs,
  loadGallery,
  showFullPageLink = true,
}: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const showcaseOnly = Boolean(category?.showcaseOnly)
  const hasLinks = Boolean(project.githubUrl || project.liveUrl)
  const title = pickBilingual(project.title, lang)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    setSlide(0)
  }, [project.id])

  const slides = useMemo(() => {
    if (!loadGallery) return []
    const fromGallery = project.galleryImages.filter(Boolean)
    if (fromGallery.length > 0) return fromGallery
    return [project.coverImageUrl || project.thumbnailUrl].filter(Boolean)
  }, [
    loadGallery,
    project.coverImageUrl,
    project.galleryImages,
    project.thumbnailUrl,
  ])

  const objective = pickBilingual(project.shortDescription, lang)
  const howBuilt = project.participation
    ? pickBilingual(project.participation, lang)
    : ""
  const implemented = pickBilingual(project.fullDescription, lang)

  const go = (dir: -1 | 1) => {
    setSlide((i) => {
      const next = i + dir
      if (next < 0) return slides.length - 1
      if (next >= slides.length) return 0
      return next
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-wrap items-start justify-between gap-3 pr-8">
        <div className="min-w-0">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          {category ? (
            <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-primary">
              {pickBilingual(category.name, lang)}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-1.5">
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
        </div>
      </header>

      {/* 70% image | 30% stacks — side-by-side from sm up */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
        <div className="relative min-w-0 flex-[7] overflow-hidden rounded-2xl border border-border/70 bg-muted/40">
          <div className="relative aspect-[16/10] w-full">
            {slides.length > 0 ? (
              <img
                key={slides[slide]}
                src={slides[slide]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-top"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                {t("projects.gallery")}
              </div>
            )}

            {slides.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label={t("projects.prevScreenshot")}
                  onClick={() => go(-1)}
                  className="absolute left-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/85 text-foreground shadow-sm backdrop-blur-sm transition hover:bg-background"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label={t("projects.nextScreenshot")}
                  onClick={() => go(1)}
                  className="absolute right-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/85 text-foreground shadow-sm backdrop-blur-sm transition hover:bg-background"
                >
                  <ChevronRight className="size-4" />
                </button>
                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`${i + 1}/${slides.length}`}
                      onClick={() => setSlide(i)}
                      className={cn(
                        "size-1.5 rounded-full transition-colors",
                        i === slide
                          ? "bg-primary"
                          : "bg-background/70 hover:bg-background",
                      )}
                    />
                  ))}
                </div>
                <span className="absolute right-3 top-3 rounded-md bg-background/85 px-2 py-0.5 text-[11px] font-medium text-muted-foreground backdrop-blur-sm">
                  {slide + 1}/{slides.length}
                </span>
              </>
            ) : null}
          </div>
        </div>

        <aside className="flex min-h-0 min-w-0 flex-[3] flex-col rounded-2xl border border-border/70 bg-card/40 p-3 sm:p-4">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-foreground">
            {t("projects.cardStacks")}
          </p>
          <ul className="flex max-h-48 flex-col gap-2 overflow-y-auto overscroll-contain sm:max-h-none sm:min-h-0 sm:flex-1">
            {techs.map((tech) => (
              <TechRow key={tech.id} tech={tech} />
            ))}
          </ul>
        </aside>
      </div>

      <div className="space-y-4 text-sm">
        <section>
          <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">
            {t("projects.cardObjective")}
          </p>
          <p className="mt-1.5 leading-relaxed text-foreground/90">{objective}</p>
        </section>

        {howBuilt ? (
          <section>
            <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">
              {t("projects.cardHowBuilt")}
            </p>
            <p className="mt-1.5 leading-relaxed text-foreground/90">{howBuilt}</p>
          </section>
        ) : null}

        <section>
          <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">
            {t("projects.cardImplemented")}
          </p>
          <p className="mt-1.5 leading-relaxed text-muted-foreground">
            {implemented}
          </p>
        </section>

        {project.technicalChallenges ? (
          <section>
            <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">
              {t("projects.challenges")}
            </p>
            <p className="mt-1.5 leading-relaxed text-muted-foreground">
              {pickBilingual(project.technicalChallenges, lang)}
            </p>
          </section>
        ) : null}
      </div>

      <footer className="flex flex-col gap-3 border-t border-border/60 pt-5 sm:flex-row sm:flex-wrap sm:items-center">
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
