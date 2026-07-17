import { FilteredProjectsSection } from "@/components/projects/filtered-projects-section"

export function AutomationsPage() {
  return (
    <FilteredProjectsSection
      titleKey="automations.title"
      subtitleKey="automations.subtitle"
      emptyKey="automations.empty"
      categoryId="cat-auto-ops"
    />
  )
}
