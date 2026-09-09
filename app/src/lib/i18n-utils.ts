import type { Localized, LocaleCode } from "@/types"

export function normalizeLocale(language: string | undefined): LocaleCode {
  const l = (language ?? "").toLowerCase()
  if (l.startsWith("pt")) return "pt-BR"
  if (l.startsWith("es")) return "es"
  return "en"
}

/** Reads the right language off a Localized value, falling back to English. */
export function pickLocalized(
  text: Localized | undefined,
  language: string,
): string {
  if (!text) return ""
  switch (normalizeLocale(language)) {
    case "pt-BR":
      return text.pt || text.en
    case "es":
      return text.es || text.en
    default:
      return text.en
  }
}

/** Kept so older call sites keep compiling. */
export const pickBilingual = pickLocalized

export function emptyLocalized(): Localized {
  return { en: "", pt: "", es: "" }
}
