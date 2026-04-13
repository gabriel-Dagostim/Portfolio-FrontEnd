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

export function AdminTechnologiesPage() {
  const { t } = useTranslation()
  const { technologies, upsertTechnology, deleteTechnology } = usePortfolioStore()
  const [id, setId] = useState("")
  const [name, setName] = useState("")

  function add() {
    const tid = id.trim()
    const n = name.trim()
    if (!tid || !n) return
    upsertTechnology({ id: tid, name: n })
    setId("")
    setName("")
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t("admin.technologies")}
      </h1>
      <div className="max-w-xl space-y-4 rounded-lg border border-border p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>ID</Label>
            <Input value={id} onChange={(e) => setId(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
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
            {technologies.map((tech) => (
              <TableRow key={tech.id}>
                <TableCell className="font-mono text-xs">{tech.id}</TableCell>
                <TableCell>{tech.name}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (confirm("Delete technology?")) deleteTechnology(tech.id)
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
