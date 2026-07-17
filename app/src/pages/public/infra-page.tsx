import { FilteredProjectsSection } from "@/components/projects/filtered-projects-section"
import { InfraAtmosphere } from "@/components/atmosphere/page-atmospheres"

export function InfraPage() {
  return (
    <FilteredProjectsSection
      titleKey="infra.title"
      subtitleKey="infra.subtitle"
      emptyKey="infra.empty"
      categoryId="cat-infra"
      atmosphere={<InfraAtmosphere />}
    />
  )
}
