import { useMemo, useState, type ChangeEvent } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ArrowLeft, Upload } from "lucide-react"
import {
  AdminPage,
  Field,
  FieldGrid,
  LocalizedField,
  Panel,
  ToggleRow,
} from "@/components/admin/admin-ui"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { usePortfolioStore } from "@/app/portfolio-store"
import { nextProjectId, PROJECT_STATUSES } from "@/lib/api-mock"
import { emptyLocalized, pickLocalized } from "@/lib/i18n-utils"
import type { Project, ProjectStatus } from "@/types"
import { cn } from "@/lib/utils"

function blankProject(id: string): Project {
  return {
    id,
    slug: "",
    title: emptyLocalized(),
    shortDescription: emptyLocalized(),
    fullDescription: emptyLocalized(),
    context: emptyLocalized(),
    participation: emptyLocalized(),
    technicalChallenges: emptyLocalized(),
    categoryId: "",
    areaId: "",
    creationDate: new Date().toISOString().slice(0, 10),
    technologyIds: [],
    coverImageUrl: "",
    thumbnailUrl: "",
    galleryImages: [],
    featured: false,
    published: false,
    order: 99,
    status: "draft",
  }
}

const STATUS_LABEL: Record<ProjectStatus, string> = {
  draft: "admin.statusDraft",
  published: "admin.statusPublished",
  archived: "admin.statusArchived",
}

/** Reads a local file into a data URL so a picture can be dropped in directly. */
function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export function AdminProjectFormPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { projects, categories, areas, technologies, upsertProject } =
    usePortfolioStore()
  const lang = i18n.language

  const existing = projectId
    ? projects.find((p) => p.id === projectId)
    : undefined

  const [draft, setDraft] = useState<Project>(
    () => existing ?? blankProject(nextProjectId(projects)),
  )
  const [error, setError] = useState<string | null>(null)

  const patch = (next: Partial<Project>) => {
    setDraft((current) => ({ ...current, ...next }))
    setError(null)
  }

  const valid = useMemo(
    () =>
      Boolean(
        draft.slug.trim() &&
          draft.title.en.trim() &&
          draft.categoryId &&
          draft.areaId &&
          draft.thumbnailUrl.trim(),
      ),
    [draft],
  )

  function save() {
    if (!valid) {
      setError(t("admin.saveError"))
      return
    }
    upsertProject(draft)
    navigate("/admin/projects")
  }

  async function uploadInto(
    event: ChangeEvent<HTMLInputElement>,
    key: "coverImageUrl" | "thumbnailUrl",
  ) {
    const file = event.target.files?.[0]
    if (!file) return
    patch({ [key]: await readAsDataUrl(file) } as Partial<Project>)
    event.target.value = ""
  }

  return (
    <AdminPage
      title={existing ? t("admin.editProject") : t("admin.newProject")}
      lead={pickLocalized(draft.title, lang) || draft.slug || undefined}
      actions={
        <>
          <Link
            to="/admin/projects"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <ArrowLeft className="size-3.5" />
            {t("common.cancel")}
          </Link>
          <Button size="sm" onClick={save}>
            {t("common.save")}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {error ? (
          <p className="border border-destructive/40 bg-destructive/8 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <Panel title={t("admin.title")} description={t("admin.translationsHint")}>
          <FieldGrid>
            <Field label={t("admin.slug")} htmlFor="slug">
              <Input
                id="slug"
                value={draft.slug}
                onChange={(e) =>
                  patch({
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]+/g, "-"),
                  })
                }
              />
            </Field>
            <Field label={t("admin.creationDate")} htmlFor="date">
              <Input
                id="date"
                type="date"
                value={draft.creationDate}
                onChange={(e) => patch({ creationDate: e.target.value })}
              />
            </Field>
          </FieldGrid>

          <LocalizedField
            label={t("admin.title")}
            value={draft.title}
            onChange={(title) => patch({ title })}
          />
          <LocalizedField
            label={t("admin.shortDescription")}
            value={draft.shortDescription}
            onChange={(shortDescription) => patch({ shortDescription })}
            multiline
            rows={2}
          />
          <LocalizedField
            label={t("admin.fullDescription")}
            value={draft.fullDescription}
            onChange={(fullDescription) => patch({ fullDescription })}
            multiline
            rows={6}
          />
          <LocalizedField
            label={t("admin.context")}
            value={draft.context}
            onChange={(context) => patch({ context })}
            multiline
          />
          <LocalizedField
            label={t("admin.participation")}
            value={draft.participation}
            onChange={(participation) => patch({ participation })}
            multiline
          />
          <LocalizedField
            label={t("admin.challenges")}
            value={draft.technicalChallenges}
            onChange={(technicalChallenges) => patch({ technicalChallenges })}
            multiline
          />
        </Panel>

        <Panel title={t("admin.sectionCatalogue")}>
          <FieldGrid>
            <Field label={t("admin.category")}>
              <select
                value={draft.categoryId}
                onChange={(e) => patch({ categoryId: e.target.value })}
                className="h-9 w-full rounded-sm border border-input bg-surface px-2.5 text-sm outline-none focus-visible:border-primary"
              >
                <option value="">{t("admin.none")}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {pickLocalized(category.name, lang)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("admin.areas")}>
              <select
                value={draft.areaId}
                onChange={(e) => patch({ areaId: e.target.value })}
                className="h-9 w-full rounded-sm border border-input bg-surface px-2.5 text-sm outline-none focus-visible:border-primary"
              >
                <option value="">{t("admin.none")}</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {pickLocalized(area.name, lang)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("admin.githubUrl")}>
              <Input
                value={draft.githubUrl ?? ""}
                onChange={(e) => patch({ githubUrl: e.target.value || undefined })}
              />
            </Field>
            <Field label={t("admin.liveUrl")}>
              <Input
                value={draft.liveUrl ?? ""}
                onChange={(e) => patch({ liveUrl: e.target.value || undefined })}
              />
            </Field>
          </FieldGrid>

          <Field label={t("projects.technologies")}>
            <ul className="flex flex-wrap gap-1.5">
              {technologies.map((tech) => {
                const on = draft.technologyIds.includes(tech.id)
                return (
                  <li key={tech.id}>
                    <button
                      type="button"
                      onClick={() =>
                        patch({
                          technologyIds: on
                            ? draft.technologyIds.filter((id) => id !== tech.id)
                            : [...draft.technologyIds, tech.id],
                        })
                      }
                      aria-pressed={on}
                      className={cn(
                        "rounded-sm border px-2 py-1 text-xs transition-colors",
                        on
                          ? "border-foreground bg-foreground text-background"
                          : "border-rule text-muted-foreground hover:border-rule-strong hover:text-foreground",
                      )}
                    >
                      {tech.name}
                    </button>
                  </li>
                )
              })}
            </ul>
          </Field>
        </Panel>

        <Panel title={t("admin.galleryImages")} description={t("admin.imageHint")}>
          <FieldGrid>
            <Field label={t("admin.thumbnail")}>
              <div className="flex gap-2">
                <Input
                  value={draft.thumbnailUrl}
                  onChange={(e) => patch({ thumbnailUrl: e.target.value })}
                />
                <label
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "cursor-pointer",
                  )}
                >
                  <Upload className="size-4" />
                  <span className="sr-only">{t("admin.upload")}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => uploadInto(e, "thumbnailUrl")}
                  />
                </label>
              </div>
            </Field>
            <Field label={t("admin.coverImage")}>
              <div className="flex gap-2">
                <Input
                  value={draft.coverImageUrl}
                  onChange={(e) => patch({ coverImageUrl: e.target.value })}
                />
                <label
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "cursor-pointer",
                  )}
                >
                  <Upload className="size-4" />
                  <span className="sr-only">{t("admin.upload")}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => uploadInto(e, "coverImageUrl")}
                  />
                </label>
              </div>
            </Field>
          </FieldGrid>

          <Field label={t("admin.galleryImages")} hint={t("admin.galleryHint")}>
            <Textarea
              rows={Math.max(4, draft.galleryImages.length + 1)}
              value={draft.galleryImages.join("\n")}
              onChange={(e) =>
                patch({
                  galleryImages: e.target.value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                })
              }
            />
          </Field>

          {draft.thumbnailUrl ? (
            <img
              src={draft.thumbnailUrl}
              alt=""
              className="h-32 w-52 border border-rule object-cover object-top"
            />
          ) : null}
        </Panel>

        <Panel title={t("admin.status")}>
          <div className="flex flex-wrap items-center gap-2">
            {PROJECT_STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => patch({ status })}
                aria-pressed={draft.status === status}
                className={cn(
                  "rounded-sm border px-2.5 py-1.5 text-sm transition-colors",
                  draft.status === status
                    ? "border-foreground bg-foreground text-background"
                    : "border-rule text-muted-foreground hover:text-foreground",
                )}
              >
                {t(STATUS_LABEL[status])}
              </button>
            ))}
            <Badge variant="data" className="ml-auto">
              {t("admin.order")} {draft.order}
            </Badge>
          </div>

          <ToggleRow
            label={t("admin.published")}
            checked={draft.published}
            onChange={(published) => patch({ published })}
          />
          <ToggleRow
            label={t("admin.featured")}
            checked={draft.featured}
            onChange={(featured) => patch({ featured })}
          />
          <ToggleRow
            label={t("admin.workingOn")}
            checked={Boolean(draft.workingOn)}
            onChange={(workingOn) => patch({ workingOn })}
          />
        </Panel>

        <div className="flex justify-end gap-2">
          <Link
            to="/admin/projects"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {t("common.cancel")}
          </Link>
          <Button onClick={save}>{t("common.save")}</Button>
        </div>
      </div>
    </AdminPage>
  )
}
