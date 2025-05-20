import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface ListBoxProps {
  label: string
  children?: React.ReactNode
}

export function ListBox({ label, children = null }: ListBoxProps) {
  return (
    <div>
      <Label className="block font-medium mb-2">{label}</Label>
      <Dialog>
        <DialogTrigger asChild>
          <button className="p-2 border rounded">
            {label || 'Open ListBox Dialog'}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="grid gap-4 py-4">
            {label && <Label>{label}</Label>}
            <div>
              {children}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export type {
    ListBoxProps
}
