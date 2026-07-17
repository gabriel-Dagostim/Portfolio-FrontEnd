import { FilteredProjectsSection } from "@/components/projects/filtered-projects-section"
import { AutomationsAtmosphere } from "@/components/atmosphere/page-atmospheres"

export function AutomationsPage() {
  return (
    <FilteredProjectsSection
      titleKey="automations.title"
      subtitleKey="automations.subtitle"
      emptyKey="automations.empty"
      categoryId="cat-auto-ops"
      atmosphere={<AutomationsAtmosphere />}
    />
  )
}
