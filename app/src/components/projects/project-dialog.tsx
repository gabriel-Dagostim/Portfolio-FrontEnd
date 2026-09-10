import { useTranslation } from "react-i18next"
import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProjectDetail } from "@/components/projects/project-detail"
import { pickLocalized } from "@/lib/i18n-utils"
import type { AreaOfWork, Category, Project, Technology } from "@/types"

type Props = {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category
  area?: AreaOfWork
  techs: Technology[]
}

export function ProjectDialog({
  project,
  open,
  onOpenChange,
  category,
  area,
  techs,
}: Props) {
  const { t, i18n } = useTranslation()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[min(90vh,58rem)] w-[min(78rem,calc(100vw-2rem))]! max-w-[min(78rem,calc(100vw-2rem))]! flex-col gap-0 overflow-hidden rounded-none border border-rule-strong bg-background p-0 shadow-2xl sm:max-w-[min(78rem,calc(100vw-2rem))]!">
        {project ? (
          <>
            <div className="flex items-center justify-between border-b border-rule bg-surface-sunken px-4 py-2.5">
              <DialogTitle className="type-data truncate text-xs text-muted-foreground">
                {project.slug}
              </DialogTitle>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
              >
                <X className="size-4" />
                <span className="sr-only">{t("common.close")}</span>
              </button>
            </div>
            <DialogDescription className="sr-only">
              {pickLocalized(project.shortDescription, i18n.language)}
            </DialogDescription>
            <ScrollArea className="min-h-0 flex-1">
              <div className="px-6 py-8 sm:px-10 sm:py-10">
                <ProjectDetail
                  project={project}
                  category={category}
                  area={area}
                  techs={techs}
                  loadGallery={open}
                />
              </div>
            </ScrollArea>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
