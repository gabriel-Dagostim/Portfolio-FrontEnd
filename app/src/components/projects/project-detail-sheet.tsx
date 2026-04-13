import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
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
  const { i18n } = useTranslation()
  const [loadGallery, setLoadGallery] = useState(false)

  useEffect(() => {
    if (open) setLoadGallery(true)
    else setLoadGallery(false)
  }, [open, project?.id])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-lg">
        {project ? (
          <>
            <SheetHeader className="border-b border-border px-6 py-4 text-left">
              <SheetTitle className="line-clamp-2 text-left">
                {pickBilingual(project.title, i18n.language)}
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex-1 px-6 py-4">
              <ProjectDetailPanel
                project={project}
                category={category}
                area={area}
                techs={techs}
                loadGallery={loadGallery}
              />
            </ScrollArea>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
