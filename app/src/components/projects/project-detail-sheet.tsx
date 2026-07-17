import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProjectDetailPanel } from "@/components/projects/project-detail-panel"
import { pickBilingual } from "@/lib/i18n-utils"
import type { Category, Project, Technology } from "@/types"
import { cn } from "@/lib/utils"

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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className={cn(
          "flex w-full flex-col gap-0 p-0",
          showcaseOnly ? "sm:max-w-2xl md:max-w-3xl" : "sm:max-w-lg md:max-w-xl",
        )}
      >
        {project ? (
          <>
            <SheetHeader className="space-y-1 border-b border-border px-6 py-4 text-left">
              <SheetTitle className="line-clamp-2 text-left text-base sm:text-lg">
                {pickBilingual(project.title, i18n.language)}
              </SheetTitle>
              <SheetDescription className="line-clamp-2 text-left">
                {showcaseOnly
                  ? t("projects.internalSystem")
                  : pickBilingual(project.shortDescription, i18n.language)}
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="flex-1">
              <div className="px-6 py-5">
                <ProjectDetailPanel
                  project={project}
                  category={category}
                  area={area}
                  techs={techs}
                  loadGallery={loadGallery}
                  compact
                />
              </div>
            </ScrollArea>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
