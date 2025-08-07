import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useState } from "react"
import type { IScript } from "./IScript"

export function AddScriptDialog({
  open,
  onOpenChange,
  onSave,
  script,
  isEdit
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (script: IScript) => void;
  script?: IScript | null;
  isEdit?: boolean;
}) {
  const [name, setName] = useState(script?.script?.path || "")
  const [argumentsValue, setArguments] = useState(script?.script?.arguments || "")

  const handleSubmit = () => {
    onSave({ id: script?.id, script: { path: name, arguments: argumentsValue } })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Script" : "Add Script"}</DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-4 items-center">
            <Label htmlFor="name" className="col-span-1">Script Name:</Label>
            <Input
              id="name"
              className="col-span-2"
              placeholder="Enter script name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <Label htmlFor="arguments" className="col-span-1">Script Arguments:</Label>
            <Input
              id="arguments"
              className="col-span-2"
              placeholder="Enter script arguments"
              value={argumentsValue}
              onChange={(e) => setArguments(e.target.value)}
            />
            <Button variant="outline" disabled>Browse...</Button>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}