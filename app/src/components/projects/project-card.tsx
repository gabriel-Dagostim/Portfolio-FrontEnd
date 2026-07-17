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
}

export function ProjectCard({ project, category, techs, onOpen }: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const year = project.creationDate.slice(0, 4)
  const showcaseOnly = Boolean(category?.showcaseOnly)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <ParallaxTilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        scale={1.02}
        transitionSpeed={1200}
        glareEnable={false}
        className="rounded-xl"
      >
        <button
          type="button"
          onClick={onOpen}
          className="block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Card className="overflow-hidden border-border/80 bg-card/80 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md">
            <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
              <img
                src={project.thumbnailUrl}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
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
            <CardContent className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold leading-tight tracking-tight">
                  {pickBilingual(project.title, lang)}
                </h3>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {year}
                </span>
              </div>
              {category ? (
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  {pickBilingual(category.name, lang)}
                </p>
              ) : null}
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {pickBilingual(project.shortDescription, lang)}
              </p>
              <div className="flex flex-wrap gap-1.5">
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
