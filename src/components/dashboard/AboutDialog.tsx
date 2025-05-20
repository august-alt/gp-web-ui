import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function AboutDialog({ open, onOpenChange }: { open: boolean; onOpenChange: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[432px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">GP-WEB-UI</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center py-4 space-y-2">
          <div>Copyright (C) 2022-2025 BaseALT Ltd.</div>
          <div>Version 1.0.0</div>
        </DialogDescription>
        <DialogFooter>
          <Button onClick={onOpenChange}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
