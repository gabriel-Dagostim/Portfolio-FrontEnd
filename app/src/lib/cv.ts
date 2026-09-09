import type { LocaleCode } from "@/types"

export const CV_FILES: {
  locale: LocaleCode
  href: string
  filename: string
  labelKey: string
}[] = [
  {
    locale: "en",
    href: "/cv/Gabriel-Dagostim-CV-en.pdf",
    filename: "Gabriel-Dagostim-CV-en.pdf",
    labelKey: "cv.en",
  },
  {
    locale: "pt-BR",
    href: "/cv/Gabriel-Dagostim-CV-pt-BR.pdf",
    filename: "Gabriel-Dagostim-CV-pt-BR.pdf",
    labelKey: "cv.pt",
  },
  {
    locale: "es",
    href: "/cv/Gabriel-Dagostim-CV-es.pdf",
    filename: "Gabriel-Dagostim-CV-es.pdf",
    labelKey: "cv.es",
  },
]
