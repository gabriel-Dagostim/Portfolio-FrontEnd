import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProjectDetailPanel } from "@/components/projects/project-detail-panel"
import { pickBilingual } from "@/lib/i18n-utils"
import { cn } from "@/lib/utils"
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
  const { i18n } = useTranslation()
  const [loadGallery, setLoadGallery] = useState(false)

  useEffect(() => {
    if (open) setLoadGallery(true)
    else setLoadGallery(false)
  }, [open, project?.id])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex flex-col gap-0 overflow-hidden rounded-3xl border border-border/70 bg-background/95 p-0 shadow-2xl backdrop-blur-xl",
          "h-[min(88vh,860px)]",
          // Dialog.tsx defaults to sm:max-w-sm — override every breakpoint
          "w-[min(1120px,calc(100vw-2rem))]! max-w-[min(1120px,calc(100vw-2rem))]! sm:max-w-[min(1120px,calc(100vw-2rem))]!",
        )}
      >
        {project ? (
          <>
            <DialogTitle className="sr-only">
              {pickBilingual(project.title, i18n.language)}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {pickBilingual(project.shortDescription, i18n.language)}
            </DialogDescription>
            <ScrollArea className="min-h-0 flex-1">
              <div className="px-5 py-6 sm:px-8 sm:py-7">
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
