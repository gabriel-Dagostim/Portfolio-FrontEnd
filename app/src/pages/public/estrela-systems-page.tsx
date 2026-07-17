import { FilteredProjectsSection } from "@/components/projects/filtered-projects-section"

/** Sistemas internos da Rede Estrela — sem link público, só prints. */
export function EstrelaSystemsPage() {
  return (
    <FilteredProjectsSection
      titleKey="estrela.title"
      subtitleKey="estrela.subtitle"
      emptyKey="estrela.empty"
      categoryId="cat-estrela"
    />
  )
}
