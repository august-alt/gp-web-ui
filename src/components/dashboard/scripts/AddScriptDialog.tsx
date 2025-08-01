import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export function AddScriptDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Script</DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-4 items-center">
            <Label htmlFor="name" className="col-span-1">Script Name:</Label>
            <Input id="name" className="col-span-2" placeholder="Enter script name" />
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <Label htmlFor="arguments" className="col-span-1">Script Arguments:</Label>
            <Input id="arguments" className="col-span-2" placeholder="Enter script arguments" />
            <Button variant="outline" disabled>Browse...</Button>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}