import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react"
import {
  INITIAL_SETTINGS,
  SEED_AREAS,
  SEED_CATEGORIES,
  SEED_CONTENT,
  SEED_PROJECTS,
  SEED_TECHNOLOGIES,
} from "@/mocks/seed"
import type {
  AreaOfWork,
  CareerEntry,
  Category,
  Project,
  SiteContent,
  SiteSettings,
  SkillGroup,
  StatusLine,
  Technology,
} from "@/types"

/** v2, the store gained Spanish and editable site content. */
const STORAGE_KEY = "portfolio-admin-store-v2"

type StoreState = {
  projects: Project[]
  categories: Category[]
  areas: AreaOfWork[]
  technologies: Technology[]
  content: SiteContent
  settings: SiteSettings
}

type Action =
  | { type: "UPSERT_PROJECT"; project: Project }
  | { type: "DELETE_PROJECT"; id: string }
  | { type: "REORDER_PROJECTS"; ids: string[] }
  | { type: "UPSERT_CATEGORY"; category: Category }
  | { type: "DELETE_CATEGORY"; id: string }
  | { type: "UPSERT_AREA"; area: AreaOfWork }
  | { type: "DELETE_AREA"; id: string }
  | { type: "UPSERT_TECH"; tech: Technology }
  | { type: "DELETE_TECH"; id: string }
  | { type: "PATCH_CONTENT"; content: Partial<SiteContent> }
  | { type: "UPSERT_CAREER"; entry: CareerEntry }
  | { type: "DELETE_CAREER"; id: string }
  | { type: "UPSERT_SKILL"; group: SkillGroup }
  | { type: "DELETE_SKILL"; id: string }
  | { type: "UPSERT_STATUS"; line: StatusLine }
  | { type: "DELETE_STATUS"; id: string }
  | { type: "SET_SETTINGS"; settings: Partial<SiteSettings> }
  | { type: "RESET" }

function seedState(): StoreState {
  return {
    projects: structuredClone(SEED_PROJECTS),
    categories: structuredClone(SEED_CATEGORIES),
    areas: structuredClone(SEED_AREAS),
    technologies: structuredClone(SEED_TECHNOLOGIES),
    content: structuredClone(SEED_CONTENT),
    settings: structuredClone(INITIAL_SETTINGS),
  }
}

/** Local edits win, but anything newly added to the seed still shows up. */
function mergeById<T extends { id: string }>(
  stored: unknown,
  seed: T[],
): T[] {
  const byId = new Map<string, T>(
    (Array.isArray(stored) ? (stored as T[]) : []).map((item) => [
      item.id,
      item,
    ]),
  )
  for (const item of seed) {
    if (!byId.has(item.id)) byId.set(item.id, structuredClone(item))
  }
  return Array.from(byId.values())
}

function mergePersisted(parsed: Partial<StoreState>): StoreState {
  const seed = seedState()
  const storedContent = parsed.content ?? ({} as Partial<SiteContent>)

  return {
    projects: mergeById(parsed.projects, seed.projects),
    categories: mergeById(parsed.categories, seed.categories),
    areas: mergeById(parsed.areas, seed.areas),
    technologies: mergeById(parsed.technologies, seed.technologies),
    content: {
      profile: { ...seed.content.profile, ...storedContent.profile },
      contact: { ...seed.content.contact, ...storedContent.contact },
      status: mergeById(storedContent.status, seed.content.status),
      career: mergeById(storedContent.career, seed.content.career),
      skills: mergeById(storedContent.skills, seed.content.skills),
      languages: mergeById(storedContent.languages, seed.content.languages),
      flow: mergeById(storedContent.flow, seed.content.flow),
    },
    settings: { ...seed.settings, ...(parsed.settings ?? {}) },
  }
}

function createInitialState(): StoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StoreState>
      if (parsed && typeof parsed === "object") return mergePersisted(parsed)
    }
  } catch {
    /* corrupt or unavailable storage, fall through to the seed */
  }
  return seedState()
}

function persistState(state: StoreState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Quota exceeded (usually a large data-URL upload), stay in memory.
  }
}

function upsert<T extends { id: string }>(list: T[], item: T): T[] {
  const idx = list.findIndex((x) => x.id === item.id)
  if (idx === -1) return [...list, item]
  return list.map((x, i) => (i === idx ? item : x))
}

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case "RESET":
      return seedState()

    case "UPSERT_PROJECT":
      return { ...state, projects: upsert(state.projects, action.project) }
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.id),
        settings: {
          ...state.settings,
          featuredProjectId:
            state.settings.featuredProjectId === action.id
              ? null
              : state.settings.featuredProjectId,
          homeFeaturedIds: state.settings.homeFeaturedIds.filter(
            (id) => id !== action.id,
          ),
        },
      }
    case "REORDER_PROJECTS": {
      const rank = new Map(action.ids.map((id, i) => [id, i]))
      return {
        ...state,
        projects: state.projects.map((p) =>
          rank.has(p.id) ? { ...p, order: rank.get(p.id)! } : p,
        ),
      }
    }

    case "UPSERT_CATEGORY":
      return { ...state, categories: upsert(state.categories, action.category) }
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.id),
      }

    case "UPSERT_AREA":
      return { ...state, areas: upsert(state.areas, action.area) }
    case "DELETE_AREA":
      return { ...state, areas: state.areas.filter((a) => a.id !== action.id) }

    case "UPSERT_TECH":
      return { ...state, technologies: upsert(state.technologies, action.tech) }
    case "DELETE_TECH":
      return {
        ...state,
        technologies: state.technologies.filter((t) => t.id !== action.id),
      }

    case "PATCH_CONTENT":
      return { ...state, content: { ...state.content, ...action.content } }

    case "UPSERT_CAREER":
      return {
        ...state,
        content: {
          ...state.content,
          career: upsert(state.content.career, action.entry),
        },
      }
    case "DELETE_CAREER":
      return {
        ...state,
        content: {
          ...state.content,
          career: state.content.career.filter((c) => c.id !== action.id),
        },
      }

    case "UPSERT_SKILL":
      return {
        ...state,
        content: {
          ...state.content,
          skills: upsert(state.content.skills, action.group),
        },
      }
    case "DELETE_SKILL":
      return {
        ...state,
        content: {
          ...state.content,
          skills: state.content.skills.filter((s) => s.id !== action.id),
        },
      }

    case "UPSERT_STATUS":
      return {
        ...state,
        content: {
          ...state.content,
          status: upsert(state.content.status, action.line),
        },
      }
    case "DELETE_STATUS":
      return {
        ...state,
        content: {
          ...state.content,
          status: state.content.status.filter((s) => s.id !== action.id),
        },
      }

    case "SET_SETTINGS":
      return { ...state, settings: { ...state.settings, ...action.settings } }

    default:
      return state
  }
}

type PortfolioContextValue = StoreState & {
  upsertProject: (project: Project) => void
  deleteProject: (id: string) => void
  reorderProjects: (ids: string[]) => void
  upsertCategory: (category: Category) => void
  deleteCategory: (id: string) => void
  upsertArea: (area: AreaOfWork) => void
  deleteArea: (id: string) => void
  upsertTechnology: (tech: Technology) => void
  deleteTechnology: (id: string) => void
  patchContent: (content: Partial<SiteContent>) => void
  upsertCareer: (entry: CareerEntry) => void
  deleteCareer: (id: string) => void
  upsertSkill: (group: SkillGroup) => void
  deleteSkill: (id: string) => void
  upsertStatus: (line: StatusLine) => void
  deleteStatus: (id: string) => void
  patchSettings: (settings: Partial<SiteSettings>) => void
  resetStore: () => void
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

export function PortfolioStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState)

  useEffect(() => {
    persistState(state)
  }, [state])

  const value = useMemo<PortfolioContextValue>(
    () => ({
      ...state,
      upsertProject: (project) => dispatch({ type: "UPSERT_PROJECT", project }),
      deleteProject: (id) => dispatch({ type: "DELETE_PROJECT", id }),
      reorderProjects: (ids) => dispatch({ type: "REORDER_PROJECTS", ids }),
      upsertCategory: (category) =>
        dispatch({ type: "UPSERT_CATEGORY", category }),
      deleteCategory: (id) => dispatch({ type: "DELETE_CATEGORY", id }),
      upsertArea: (area) => dispatch({ type: "UPSERT_AREA", area }),
      deleteArea: (id) => dispatch({ type: "DELETE_AREA", id }),
      upsertTechnology: (tech) => dispatch({ type: "UPSERT_TECH", tech }),
      deleteTechnology: (id) => dispatch({ type: "DELETE_TECH", id }),
      patchContent: (content) => dispatch({ type: "PATCH_CONTENT", content }),
      upsertCareer: (entry) => dispatch({ type: "UPSERT_CAREER", entry }),
      deleteCareer: (id) => dispatch({ type: "DELETE_CAREER", id }),
      upsertSkill: (group) => dispatch({ type: "UPSERT_SKILL", group }),
      deleteSkill: (id) => dispatch({ type: "DELETE_SKILL", id }),
      upsertStatus: (line) => dispatch({ type: "UPSERT_STATUS", line }),
      deleteStatus: (id) => dispatch({ type: "DELETE_STATUS", id }),
      patchSettings: (settings) => dispatch({ type: "SET_SETTINGS", settings }),
      resetStore: () => {
        try {
          localStorage.removeItem(STORAGE_KEY)
        } catch {
          /* ignore */
        }
        dispatch({ type: "RESET" })
      },
    }),
    [state],
  )

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolioStore() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) {
    throw new Error(
      "usePortfolioStore must be used within PortfolioStoreProvider",
    )
  }
  return ctx
}

/** Convenience reader for pages that only need the editable copy. */
export function useSiteContent() {
  return usePortfolioStore().content
}
