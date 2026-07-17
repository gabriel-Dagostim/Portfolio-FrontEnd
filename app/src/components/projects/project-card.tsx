import { useTranslation } from "react-i18next"
import ParallaxTilt from "react-parallax-tilt"
import { motion } from "framer-motion"
import { LoaderCircle, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { pickBilingual } from "@/lib/i18n-utils"
import type { Category, Project, Technology } from "@/types"

type Props = {
  project: Project
  category?: Category
  techs: Technology[]
  onOpen: () => void
  /** Larger cards — projects index page only */
  size?: "default" | "lg"
}

export function ProjectCard({
  project,
  category,
  techs,
  onOpen,
  size = "default",
}: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const year = project.creationDate.slice(0, 4)
  const showcaseOnly = Boolean(category?.showcaseOnly)
  const large = size === "lg"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <ParallaxTilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        scale={1.02}
        transitionSpeed={1200}
        glareEnable={false}
        className="h-full rounded-xl"
      >
        <button
          type="button"
          onClick={onOpen}
          className="flex h-full w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Card className="flex h-full w-full flex-col overflow-hidden border-border/80 bg-card/80 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md">
            <div
              className={
                large
                  ? "relative aspect-[16/11] w-full shrink-0 overflow-hidden bg-muted/30"
                  : "relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted/30"
              }
            >
              <img
                src={project.thumbnailUrl}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                {project.workingOn ? (
                  <Badge className="gap-1 bg-amber-500/90 text-white hover:bg-amber-500/90">
                    <LoaderCircle className="size-3" />
                    {t("projects.workingBadge")}
                  </Badge>
                ) : null}
                {showcaseOnly ? (
                  <Badge className="gap-1 bg-background/90 text-foreground hover:bg-background/90">
                    <Shield className="size-3" />
                    {t("projects.internalSystem")}
                  </Badge>
                ) : null}
              </div>
              {project.featured ? (
                <Badge className="absolute right-3 top-3 bg-primary/90 text-primary-foreground">
                  ★
                </Badge>
              ) : null}
            </div>
            <CardContent
              className={
                large
                  ? "flex flex-1 flex-col gap-3.5 p-5"
                  : "flex flex-1 flex-col gap-3 p-4"
              }
            >
              <div className="flex items-start justify-between gap-2">
                <h3
                  className={
                    large
                      ? "line-clamp-2 min-h-[3rem] text-xl font-semibold leading-tight tracking-tight"
                      : "line-clamp-2 min-h-[2.75rem] text-lg font-semibold leading-tight tracking-tight"
                  }
                >
                  {pickBilingual(project.title, lang)}
                </h3>
                <span className="shrink-0 pt-1 text-xs text-muted-foreground">
                  {year}
                </span>
              </div>
              {category ? (
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  {pickBilingual(category.name, lang)}
                </p>
              ) : (
                <p className="text-xs font-medium uppercase tracking-wider text-transparent">
                  —
                </p>
              )}
              <p className="line-clamp-2 min-h-[2.5rem] flex-1 text-sm text-muted-foreground sm:leading-6">
                {pickBilingual(project.shortDescription, lang)}
              </p>
              <div className="mt-auto flex min-h-[1.75rem] flex-wrap gap-1.5">
                {techs.slice(0, 4).map((tech) => (
                  <Badge
                    key={tech.id}
                    variant="secondary"
                    className="font-normal"
                  >
                    {tech.name}
                  </Badge>
                ))}
                {techs.length > 4 ? (
                  <Badge variant="outline">+{techs.length - 4}</Badge>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </button>
      </ParallaxTilt>
    </motion.div>
  )
}
