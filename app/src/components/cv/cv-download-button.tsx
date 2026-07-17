import { useTranslation } from "react-i18next"
import { Download } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CONTACT } from "@/lib/contact"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
}

function downloadFile(href: string, filename: string) {
  const a = document.createElement("a")
  a.href = href
  a.download = filename
  a.rel = "noreferrer"
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export function CvDownloadButton({
  className,
  variant = "outline",
  size = "default",
}: Props) {
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(buttonVariants({ variant, size }), "gap-2", className)}
      >
        <Download className="size-4" />
        {t("cv.download")}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() =>
            downloadFile(CONTACT.cvEn, "Gabriel-Dagostim-CV-en.pdf")
          }
        >
          {t("cv.downloadEn")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            downloadFile(CONTACT.cvPt, "Gabriel-Dagostim-CV-pt-BR.pdf")
          }
        >
          {t("cv.downloadPt")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
