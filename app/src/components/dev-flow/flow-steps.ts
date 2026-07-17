export type FlowStepId =
  | "prompt"
  | "vibe"
  | "review"
  | "tests"
  | "security"
  | "ops"
  | "deploy"

export type FlowStepDef = {
  id: FlowStepId
  /** Canvas position in % — n8n-style grid */
  x: number
  y: number
  color: string
  loopsTo?: FlowStepId[]
}

/**
 * Layout inspired by n8n:
 * top row → prompt → vibe → review
 * then down to tests → security → ops → deploy
 */
export const FLOW_STEPS: FlowStepDef[] = [
  { id: "prompt", x: 12, y: 22, color: "#8b5cf6" },
  { id: "vibe", x: 34, y: 22, color: "#7c3aed" },
  { id: "review", x: 56, y: 22, color: "#06b6d4" },
  {
    id: "tests",
    x: 56,
    y: 52,
    color: "#10b981",
    loopsTo: ["vibe", "review"],
  },
  {
    id: "security",
    x: 78,
    y: 52,
    color: "#f59e0b",
    loopsTo: ["tests"],
  },
  {
    id: "ops",
    x: 78,
    y: 78,
    color: "#f43f5e",
    loopsTo: ["security"],
  },
  { id: "deploy", x: 88, y: 78, color: "#a78bfa" },
]

export const FLOW_EDGES: Array<[FlowStepId, FlowStepId]> = [
  ["prompt", "vibe"],
  ["vibe", "review"],
  ["review", "tests"],
  ["tests", "security"],
  ["security", "ops"],
  ["ops", "deploy"],
]

export function getFlowStep(id: FlowStepId) {
  return FLOW_STEPS.find((s) => s.id === id)!
}
