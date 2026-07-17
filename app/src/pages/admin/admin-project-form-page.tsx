import { useMemo, useState } from "react"
import { Navigate, useMatch, useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { RouterLinkButton } from "@/components/ui/link-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { usePortfolioStore } from "@/app/portfolio-store"
import { PROJECT_STATUSES } from "@/lib/api-mock"
import type { Project, ProjectStatus } from "@/types"
import { pickBilingual } from "@/lib/i18n-utils"

const imagePath = z
  .string()
  .min(1)
  .refine(
    (s) =>
      s.startsWith("/") ||
      s.startsWith("http://") ||
      s.startsWith("https://") ||
      s.startsWith("data:"),
    "Invalid image path",
  )

const schema = z.object({
  slug: z.string().min(1),
  titlePt: z.string().min(1),
  titleEn: z.string().min(1),
  shortPt: z.string(),
  shortEn: z.string(),
  fullPt: z.string(),
  fullEn: z.string(),
  contextPt: z.string().optional(),
  contextEn: z.string().optional(),
  participationPt: z.string().optional(),
  participationEn: z.string().optional(),
  challengesPt: z.string().optional(),
  challengesEn: z.string().optional(),
  categoryId: z.string().min(1),
  areaId: z.string().min(1),
  creationDate: z.string().min(1),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  coverImageUrl: imagePath,
  thumbnailUrl: imagePath,
  galleryText: z.string(),
  featured: z.boolean(),
  published: z.boolean(),
  order: z.coerce.number().int(),
  status: z.enum(["draft", "published", "archived"] as [
    ProjectStatus,
    ...ProjectStatus[],
  ]),
  technologyIds: z.array(z.string()),
})

type FormValues = z.infer<typeof schema>

function projectToForm(p: Project): FormValues {
  return {
    slug: p.slug,
    titlePt: p.title.pt,
    titleEn: p.title.en,
    shortPt: p.shortDescription.pt,
    shortEn: p.shortDescription.en,
    fullPt: p.fullDescription.pt,
    fullEn: p.fullDescription.en,
    contextPt: p.context?.pt ?? "",
    contextEn: p.context?.en ?? "",
    participationPt: p.participation?.pt ?? "",
    participationEn: p.participation?.en ?? "",
    challengesPt: p.technicalChallenges?.pt ?? "",
    challengesEn: p.technicalChallenges?.en ?? "",
    categoryId: p.categoryId,
    areaId: p.areaId,
    creationDate: p.creationDate.slice(0, 10),
    githubUrl: p.githubUrl ?? "",
    liveUrl: p.liveUrl ?? "",
    coverImageUrl: p.coverImageUrl,
    thumbnailUrl: p.thumbnailUrl,
    galleryText: p.galleryImages.join("\n"),
    featured: p.featured,
    published: p.published,
    order: p.order,
    status: p.status,
    technologyIds: [...p.technologyIds],
  }
}

const emptyForm = (): FormValues => ({
  slug: "",
  titlePt: "",
  titleEn: "",
  shortPt: "",
  shortEn: "",
  fullPt: "",
  fullEn: "",
  contextPt: "",
  contextEn: "",
  participationPt: "",
  participationEn: "",
  challengesPt: "",
  challengesEn: "",
  categoryId: "",
  areaId: "",
  creationDate: new Date().toISOString().slice(0, 10),
  githubUrl: "",
  liveUrl: "",
  coverImageUrl: "/legacy-projects/wip.png",
  thumbnailUrl: "/legacy-projects/wip.png",
  galleryText: "",
  featured: false,
  published: false,
  order: 10,
  status: "draft",
  technologyIds: [],
})

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export function AdminProjectFormPage() {
  const isNewRoute = Boolean(useMatch("/admin/projects/new"))
  const { projectId } = useParams<{ projectId: string }>()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)
  const {
    projects,
    categories,
    areas,
    technologies,
    upsertProject,
  } = usePortfolioStore()

  const isNew = isNewRoute
  const existing = useMemo(
    () =>
      !isNew && projectId
        ? projects.find((p) => p.id === projectId)
        : undefined,
    [projects, projectId, isNew],
  )

  if (!isNew && !existing) {
    return <Navigate to="/admin/projects" replace />
  }

  const defaults = useMemo(() => {
    if (existing) return projectToForm(existing)
    const e = emptyForm()
    if (categories[0]) e.categoryId = categories[0].id
    if (areas[0]) e.areaId = areas[0].id
    return e
  }, [existing, categories, areas])

  const form = useForm<FormValues>({
    values: defaults,
  })

  function toggleTech(id: string, checked: boolean) {
    const cur = form.getValues("technologyIds")
    if (checked) {
      form.setValue("technologyIds", [...new Set([...cur, id])])
    } else {
      form.setValue(
        "technologyIds",
        cur.filter((x) => x !== id),
      )
    }
  }

  async function onPickImage(
    field: "coverImageUrl" | "thumbnailUrl",
    fileList: FileList | null,
  ) {
    const file = fileList?.[0]
    if (!file) return
    const dataUrl = await readFileAsDataUrl(file)
    form.setValue(field, dataUrl, { shouldDirty: true })
  }

  async function onPickGallery(fileList: FileList | null) {
    const file = fileList?.[0]
    if (!file) return
    const dataUrl = await readFileAsDataUrl(file)
    const cur = form.getValues("galleryText").trim()
    form.setValue(
      "galleryText",
      cur ? `${cur}\n${dataUrl}` : dataUrl,
      { shouldDirty: true },
    )
  }

  function onSubmit(raw: FormValues) {
    setFormError(null)
    const parsed = schema.safeParse(raw)
    if (!parsed.success) {
      setFormError(t("admin.saveError"))
      return
    }
    const values = parsed.data
    const galleryImages = values.galleryText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
    const project: Project = {
      id: isNew ? `proj-${crypto.randomUUID().slice(0, 8)}` : existing!.id,
      slug: values.slug,
      title: { pt: values.titlePt, en: values.titleEn },
      shortDescription: { pt: values.shortPt, en: values.shortEn },
      fullDescription: { pt: values.fullPt, en: values.fullEn },
      context:
        values.contextPt || values.contextEn
          ? { pt: values.contextPt ?? "", en: values.contextEn ?? "" }
          : undefined,
      participation:
        values.participationPt || values.participationEn
          ? {
              pt: values.participationPt ?? "",
              en: values.participationEn ?? "",
            }
          : undefined,
      technicalChallenges:
        values.challengesPt || values.challengesEn
          ? { pt: values.challengesPt ?? "", en: values.challengesEn ?? "" }
          : undefined,
      categoryId: values.categoryId,
      areaId: values.areaId,
      creationDate: values.creationDate,
      technologyIds: values.technologyIds,
      githubUrl: values.githubUrl || undefined,
      liveUrl: values.liveUrl || undefined,
      coverImageUrl: values.coverImageUrl,
      thumbnailUrl: values.thumbnailUrl,
      galleryImages,
      featured: values.featured,
      published: values.published,
      order: values.order,
      status: values.status,
      workingOn: existing?.workingOn,
    }
    upsertProject(project)
    navigate("/admin/projects")
  }

  const coverPreview = form.watch("coverImageUrl")
  const thumbPreview = form.watch("thumbnailUrl")

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isNew ? t("admin.newProject") : t("admin.editProject")}
        </h1>
        <RouterLinkButton to="/admin/projects" variant="outline">
          {t("common.cancel")}
        </RouterLinkButton>
      </div>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="slug">{t("admin.slug")}</Label>
            <Input id="slug" {...form.register("slug")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="order">{t("admin.order")}</Label>
            <Input id="order" type="number" {...form.register("order")} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="titlePt">{t("admin.namePt")}</Label>
            <Input id="titlePt" {...form.register("titlePt")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="titleEn">{t("admin.nameEn")}</Label>
            <Input id="titleEn" {...form.register("titleEn")} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t("admin.shortPt")}</Label>
            <Textarea rows={3} {...form.register("shortPt")} />
          </div>
          <div className="space-y-2">
            <Label>{t("admin.shortEn")}</Label>
            <Textarea rows={3} {...form.register("shortEn")} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t("admin.fullPt")}</Label>
            <Textarea rows={5} {...form.register("fullPt")} />
          </div>
          <div className="space-y-2">
            <Label>{t("admin.fullEn")}</Label>
            <Textarea rows={5} {...form.register("fullEn")} />
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t("admin.category")}</Label>
            <Select
              value={form.watch("categoryId")}
              onValueChange={(v) => {
                if (v != null) form.setValue("categoryId", v)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="…" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {pickBilingual(c.name, i18n.language)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("admin.area")}</Label>
            <Select
              value={form.watch("areaId")}
              onValueChange={(v) => {
                if (v != null) form.setValue("areaId", v)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="…" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {pickBilingual(a.name, i18n.language)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="creationDate">{t("admin.creationDate")}</Label>
          <Input
            id="creationDate"
            type="date"
            {...form.register("creationDate")}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t("admin.status")}</Label>
            <Select
              value={form.watch("status")}
              onValueChange={(v) => {
                if (v != null) form.setValue("status", v as ProjectStatus)
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col justify-end gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Switch
                checked={form.watch("published")}
                onCheckedChange={(c) => form.setValue("published", c)}
              />
              <Label>{t("admin.published")}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.watch("featured")}
                onCheckedChange={(c) => form.setValue("featured", c)}
              />
              <Label>{t("admin.featured")}</Label>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>{t("admin.techs")}</Label>
          <ScrollArea className="h-40 rounded-md border border-border p-3">
            <div className="grid gap-2 sm:grid-cols-2">
              {technologies.map((tech) => (
                <label
                  key={tech.id}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <Checkbox
                    checked={form.watch("technologyIds").includes(tech.id)}
                    onCheckedChange={(c) => toggleTech(tech.id, c === true)}
                  />
                  {tech.name}
                </label>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t("admin.githubUrl")}</Label>
            <Input {...form.register("githubUrl")} />
          </div>
          <div className="space-y-2">
            <Label>{t("admin.liveUrl")}</Label>
            <Input {...form.register("liveUrl")} />
          </div>
        </div>

        <Separator />
        <p className="text-sm text-muted-foreground">{t("admin.imageHint")}</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t("admin.coverImage")}</Label>
            <Input {...form.register("coverImageUrl")} />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => onPickImage("coverImageUrl", e.target.files)}
            />
            {coverPreview ? (
              <img
                src={coverPreview}
                alt=""
                className="mt-2 aspect-video w-full rounded-lg border border-border object-cover"
              />
            ) : null}
            <p className="text-xs text-muted-foreground">{t("admin.uploadCover")}</p>
          </div>
          <div className="space-y-2">
            <Label>{t("admin.thumbnail")}</Label>
            <Input {...form.register("thumbnailUrl")} />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => onPickImage("thumbnailUrl", e.target.files)}
            />
            {thumbPreview ? (
              <img
                src={thumbPreview}
                alt=""
                className="mt-2 aspect-video w-full rounded-lg border border-border object-cover"
              />
            ) : null}
            <p className="text-xs text-muted-foreground">{t("admin.uploadThumb")}</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label>{t("admin.gallery")}</Label>
          <Textarea rows={4} {...form.register("galleryText")} />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => onPickGallery(e.target.files)}
          />
          <p className="text-xs text-muted-foreground">
            {t("admin.uploadGallery")}
          </p>
        </div>

        <Separator />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t("admin.contextPt")}</Label>
            <Textarea rows={3} {...form.register("contextPt")} />
          </div>
          <div className="space-y-2">
            <Label>{t("admin.contextEn")}</Label>
            <Textarea rows={3} {...form.register("contextEn")} />
          </div>
          <div className="space-y-2">
            <Label>{t("admin.participationPt")}</Label>
            <Textarea rows={3} {...form.register("participationPt")} />
          </div>
          <div className="space-y-2">
            <Label>{t("admin.participationEn")}</Label>
            <Textarea rows={3} {...form.register("participationEn")} />
          </div>
          <div className="space-y-2">
            <Label>{t("admin.challengesPt")}</Label>
            <Textarea rows={3} {...form.register("challengesPt")} />
          </div>
          <div className="space-y-2">
            <Label>{t("admin.challengesEn")}</Label>
            <Textarea rows={3} {...form.register("challengesEn")} />
          </div>
        </div>
        {formError ? (
          <p className="text-sm text-destructive">{formError}</p>
        ) : null}
        <Button type="submit">{t("common.save")}</Button>
      </form>
    </div>
  )
}
