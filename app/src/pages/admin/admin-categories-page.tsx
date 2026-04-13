import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { usePortfolioStore } from "@/app/portfolio-store"
import { pickBilingual } from "@/lib/i18n-utils"

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function AdminCategoriesPage() {
  const { t, i18n } = useTranslation()
  const { categories, upsertCategory, deleteCategory } = usePortfolioStore()
  const [namePt, setNamePt] = useState("")
  const [nameEn, setNameEn] = useState("")
  const [idManual, setIdManual] = useState("")

  function add() {
    const pt = namePt.trim()
    const en = nameEn.trim()
    if (!pt || !en) return
    const id =
      idManual.trim() ||
      `cat-${slugify(pt).slice(0, 24) || crypto.randomUUID().slice(0, 8)}`
    upsertCategory({ id, name: { pt, en } })
    setNamePt("")
    setNameEn("")
    setIdManual("")
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t("admin.categories")}
      </h1>
      <div className="max-w-xl space-y-4 rounded-lg border border-border p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t("admin.namePt")}</Label>
            <Input value={namePt} onChange={(e) => setNamePt(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t("admin.nameEn")}</Label>
            <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>ID (optional)</Label>
          <Input
            value={idManual}
            onChange={(e) => setIdManual(e.target.value)}
            placeholder="cat-custom"
          />
        </div>
        <Button type="button" onClick={add}>
          {t("common.save")}
        </Button>
      </div>
      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right"> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-mono text-xs">{c.id}</TableCell>
                <TableCell>{pickBilingual(c.name, i18n.language)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (confirm("Delete category?")) deleteCategory(c.id)
                    }}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
