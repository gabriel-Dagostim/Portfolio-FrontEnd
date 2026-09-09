import { useTranslation } from "react-i18next"
import { Plus, Trash2 } from "lucide-react"
import {
  AdminPage,
  Field,
  FieldGrid,
  LocalizedField,
  Panel,
  useConfirmedDelete,
} from "@/components/admin/admin-ui"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePortfolioStore } from "@/app/portfolio-store"
import { emptyLocalized, pickLocalized } from "@/lib/i18n-utils"
import type { StatusLine } from "@/types"

const STATES: StatusLine["state"][] = ["live", "building", "shipped"]

const STATE_LABEL: Record<StatusLine["state"], string> = {
  live: "home.stateLive",
  building: "home.stateBuilding",
  shipped: "home.stateShipped",
}

export function AdminProfilePage() {
  const { t, i18n } = useTranslation()
  const { content, patchContent, upsertStatus, deleteStatus } =
    usePortfolioStore()
  const confirmDelete = useConfirmedDelete()
  const { profile, status } = content

  const setProfile = (patch: Partial<typeof profile>) =>
    patchContent({ profile: { ...profile, ...patch } })

  return (
    <AdminPage title={t("admin.profile")} lead={t("admin.profileLead")}>
      <div className="space-y-6">
        <Panel title={t("admin.profile")} description={t("admin.translationsHint")}>
          <FieldGrid>
            <Field label={t("admin.name")} htmlFor="fullName">
              <Input
                id="fullName"
                value={profile.fullName}
                onChange={(e) => setProfile({ fullName: e.target.value })}
              />
            </Field>
            <Field label={`${t("admin.name")} (nav)`} htmlFor="shortName">
              <Input
                id="shortName"
                value={profile.shortName}
                onChange={(e) => setProfile({ shortName: e.target.value })}
              />
            </Field>
            <Field label={t("admin.birthDate")} htmlFor="birthDate">
              <Input
                id="birthDate"
                type="date"
                value={profile.birthDate}
                onChange={(e) => setProfile({ birthDate: e.target.value })}
              />
            </Field>
            <Field
              label={t("admin.photo")}
              htmlFor="photoUrl"
              hint={t("admin.imageHint")}
            >
              <Input
                id="photoUrl"
                value={profile.photoUrl}
                onChange={(e) => setProfile({ photoUrl: e.target.value })}
              />
            </Field>
          </FieldGrid>

          <LocalizedField
            label={t("admin.role")}
            value={profile.role}
            onChange={(role) => setProfile({ role })}
          />
          <LocalizedField
            label={t("admin.location")}
            value={profile.location}
            onChange={(location) => setProfile({ location })}
          />
          <LocalizedField
            label={t("admin.headline")}
            value={profile.headline}
            onChange={(headline) => setProfile({ headline })}
            multiline
            rows={2}
          />
          <LocalizedField
            label={t("admin.summary")}
            value={profile.summary}
            onChange={(summary) => setProfile({ summary })}
            multiline
          />
        </Panel>

        <Panel
          title={t("admin.statusRows")}
          description={t("admin.statusRowsHint")}
          actions={
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                upsertStatus({
                  id: `st-${Date.now()}`,
                  label: emptyLocalized(),
                  value: emptyLocalized(),
                  state: "shipped",
                })
              }
            >
              <Plus className="size-3.5" />
              {t("common.add")}
            </Button>
          }
        >
          {status.map((line) => (
            <div key={line.id} className="space-y-4 border border-rule p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex border border-rule">
                  {STATES.map((state, index) => (
                    <button
                      key={state}
                      type="button"
                      onClick={() => upsertStatus({ ...line, state })}
                      aria-pressed={line.state === state}
                      className={
                        (index > 0 ? "border-l border-rule " : "") +
                        "px-2.5 py-1 text-xs transition-colors " +
                        (line.state === state
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:bg-surface-sunken")
                      }
                    >
                      {t(STATE_LABEL[state])}
                    </button>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() =>
                    confirmDelete(
                      pickLocalized(line.label, i18n.language) || line.id,
                      () => deleteStatus(line.id),
                    )
                  }
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <LocalizedField
                label={t("admin.statusLabel")}
                value={line.label}
                onChange={(label) => upsertStatus({ ...line, label })}
              />
              <LocalizedField
                label={t("admin.statusValue")}
                value={line.value}
                onChange={(value) => upsertStatus({ ...line, value })}
              />
            </div>
          ))}
        </Panel>
      </div>
    </AdminPage>
  )
}
