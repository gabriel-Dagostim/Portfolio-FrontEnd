import { useTranslation } from "react-i18next"
import { Code2, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RouterLinkButton } from "@/components/ui/link-button"
import { AnchorButton } from "@/components/ui/anchor-button"
import { Separator } from "@/components/ui/separator"
import { pickBilingual } from "@/lib/i18n-utils"
import type { Category, Project, Technology } from "@/types"

type Props = {
  project: Project
  category?: Category
  area?: { name: { pt: string; en: string } }
  techs: Technology[]
  /** When false, gallery URLs are not rendered (lazy). */
  loadGallery: boolean
}

export function ProjectDetailPanel({
  project,
  category,
  area,
  techs,
  loadGallery,
}: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {pickBilingual(project.title, lang)}
        </h2>
        <p className="text-sm text-muted-foreground">
          {project.creationDate.slice(0, 10)} ·{" "}
          {category ? pickBilingual(category.name, lang) : "—"} ·{" "}
          {area ? pickBilingual(area.name, lang) : "—"}
        </p>
        <div className="flex flex-wrap gap-2">
          {techs.map((x) => (
            <Badge key={x.id} variant="secondary">
              {x.name}
            </Badge>
          ))}
        </div>
      </div>
      <img
        src={project.coverImageUrl}
        alt=""
        loading={loadGallery ? "eager" : "lazy"}
        decoding="async"
        className="aspect-video w-full rounded-lg object-cover"
      />
      <p className="text-sm leading-relaxed text-muted-foreground">
        {pickBilingual(project.fullDescription, lang)}
      </p>
      {project.context ? (
        <div>
          <h3 className="mb-1 text-sm font-semibold">{t("projects.context")}</h3>
          <p className="text-sm text-muted-foreground">
            {pickBilingual(project.context, lang)}
          </p>
        </div>
      ) : null}
      {project.participation ? (
        <div>
          <h3 className="mb-1 text-sm font-semibold">
            {t("projects.participation")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {pickBilingual(project.participation, lang)}
          </p>
        </div>
      ) : null}
      {project.technicalChallenges ? (
        <div>
          <h3 className="mb-1 text-sm font-semibold">
            {t("projects.challenges")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {pickBilingual(project.technicalChallenges, lang)}
          </p>
        </div>
      ) : null}
      {loadGallery && project.galleryImages.length > 0 ? (
        <div>
          <h3 className="mb-3 text-sm font-semibold">{t("projects.gallery")}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {project.galleryImages.map((url) => (
              <img
                key={url}
                src={url}
                alt=""
                loading="lazy"
                decoding="async"
                className="rounded-md object-cover"
              />
            ))}
          </div>
        </div>
      ) : null}
      <Separator />
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <RouterLinkButton to={`/projects/${project.slug}`}>
          {t("common.viewFullPage")}
        </RouterLinkButton>
        {project.githubUrl ? (
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
        {project.liveUrl ? (
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
      </div>
    </div>
  )
}
