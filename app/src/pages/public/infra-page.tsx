import { FilteredProjectsSection } from "@/components/projects/filtered-projects-section"

export function InfraPage() {
  return (
    <FilteredProjectsSection
      titleKey="infra.title"
      subtitleKey="infra.subtitle"
      emptyKey="infra.empty"
      categoryId="cat-infra"
    />
  )
}
