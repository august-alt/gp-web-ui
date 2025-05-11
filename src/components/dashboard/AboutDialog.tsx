import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function AboutDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[432px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">GPUI</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center py-4 space-y-2">
          <div>Copyright (C) 2022 BaseALT Ltd.</div>
          <div>Version </div>
        </DialogDescription>
        <DialogFooter>
          <Button onClick={onClose}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
