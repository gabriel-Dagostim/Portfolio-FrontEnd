import { useTranslation } from "react-i18next"
import { AdminPage, LocalizedField, Panel, ToggleRow } from "@/components/admin/admin-ui"
import { usePortfolioStore } from "@/app/portfolio-store"
import { pickLocalized } from "@/lib/i18n-utils"
import type { FlowStep } from "@/types"

export function AdminFlowPage() {
  const { t, i18n } = useTranslation()
  const { content, patchContent } = usePortfolioStore()

  const setStep = (id: string, patch: Partial<FlowStep>) =>
    patchContent({
      flow: content.flow.map((step) =>
        step.id === id ? { ...step, ...patch } : step,
      ),
    })

  return (
    <AdminPage title={t("admin.flowNav")} lead={t("admin.flowLead")}>
      <div className="space-y-6">
        {content.flow.map((step, index) => (
          <Panel
            key={step.id}
            title={`${String(index + 1).padStart(2, "0")} · ${
              pickLocalized(step.title, i18n.language) || step.id
            }`}
          >
            <LocalizedField
              label={t("admin.title")}
              value={step.title}
              onChange={(title) => setStep(step.id, { title })}
            />
            <LocalizedField
              label={t("admin.role")}
              value={step.role}
              onChange={(role) => setStep(step.id, { role })}
            />
            <LocalizedField
              label={t("admin.body")}
              value={step.body}
              onChange={(body) => setStep(step.id, { body })}
              multiline
            />
            <LocalizedField
              label={t("admin.practice")}
              value={step.practice}
              onChange={(practice) => setStep(step.id, { practice })}
              multiline
            />
            <ToggleRow
              label={t("admin.loopsBack")}
              checked={Boolean(step.loopsBack)}
              onChange={(loopsBack) => setStep(step.id, { loopsBack })}
            />
          </Panel>
        ))}
      </div>
    </AdminPage>
  )
}
