import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function ServerErrorDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Server Connection Error</DialogTitle>
          <DialogDescription>
            Connection to the server has timed out. We were unable to fetch policies. Please check your internet connection and try again.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
