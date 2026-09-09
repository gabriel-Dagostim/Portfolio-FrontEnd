import { useTranslation } from "react-i18next"
import { Download } from "lucide-react"
import { CV_FILES } from "@/lib/cv"
import { cn } from "@/lib/utils"

/**
 * Three résumés, three visible buttons. A dropdown would hide the fact that
 * the Spanish version exists at all, which is the whole point of shipping it.
 */
export function CvDownload({ className }: { className?: string }) {
  const { t } = useTranslation()

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {CV_FILES.map((file) => (
        <a
          key={file.locale}
          href={file.href}
          download={file.filename}
          className="group inline-flex items-center gap-2 border border-rule-strong px-3.5 py-2 text-sm transition-colors hover:bg-surface-sunken"
        >
          <Download className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
          {t(file.labelKey)}
          <span className="type-data text-[0.6875rem] text-muted-foreground">
            {t("cv.pdf")}
          </span>
        </a>
      ))}
    </div>
  )
}
