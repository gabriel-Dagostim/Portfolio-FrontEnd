import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProjectDetailPanel } from "@/components/projects/project-detail-panel"
import { pickBilingual } from "@/lib/i18n-utils"
import type { Category, Project, Technology } from "@/types"

type Props = {
  project: Project | null
  open: boolean
  onOpenChange: (o: boolean) => void
  category?: Category
  area?: { name: { pt: string; en: string } }
  techs: Technology[]
}

export function ProjectDetailSheet({
  project,
  open,
  onOpenChange,
  category,
  area,
  techs,
}: Props) {
  const { t, i18n } = useTranslation()
  const [loadGallery, setLoadGallery] = useState(false)
  const showcaseOnly = Boolean(category?.showcaseOnly)

  useEffect(() => {
    if (open) setLoadGallery(true)
    else setLoadGallery(false)
  }, [open, project?.id])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid h-[min(92vh,920px)] w-[min(1120px,calc(100vw-1.5rem))] max-w-none grid-rows-[auto_1fr] gap-0 overflow-hidden rounded-3xl border border-border/70 bg-background/95 p-0 shadow-2xl backdrop-blur-xl">
        {project ? (
          <>
            <DialogHeader className="space-y-2 border-b border-border/70 bg-card/45 px-5 py-4 pr-14 text-left sm:px-8 sm:py-5">
              <DialogTitle className="line-clamp-2 text-left text-lg font-semibold tracking-tight sm:text-xl">
                {pickBilingual(project.title, i18n.language)}
              </DialogTitle>
              <DialogDescription className="line-clamp-2 max-w-3xl text-left">
                {showcaseOnly
                  ? t("projects.internalSystem")
                  : pickBilingual(project.shortDescription, i18n.language)}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="min-h-0">
              <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-8">
                <ProjectDetailPanel
                  project={project}
                  category={category}
                  area={area}
                  techs={techs}
                  loadGallery={loadGallery}
                />
              </div>
            </ScrollArea>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
