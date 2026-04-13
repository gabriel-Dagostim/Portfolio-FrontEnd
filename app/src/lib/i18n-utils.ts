import type { Bilingual } from "@/types"

export function pickBilingual(text: Bilingual, language: string): string {
  if (language.toLowerCase().startsWith("pt")) return text.pt
  return text.en
}
