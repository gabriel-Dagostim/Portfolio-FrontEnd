import { FilteredProjectsSection } from "@/components/projects/filtered-projects-section"
import { SystemsAtmosphere } from "@/components/atmosphere/page-atmospheres"

/** Sistemas internos em produção — sem link público, só prints. */
export function SystemsPage() {
  return (
    <FilteredProjectsSection
      titleKey="systems.title"
      subtitleKey="systems.subtitle"
      emptyKey="systems.empty"
      categoryId="cat-estrela"
      atmosphere={<SystemsAtmosphere />}
    />
  )
}
