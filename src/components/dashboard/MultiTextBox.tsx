import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MultiTextBoxProps {
  refId?: string
  showAsDialog?: boolean
  defaultHeight?: number
  label?: string
  className?: string
}

export const MultiTextBox = ({
  refId,
  showAsDialog = false,
  defaultHeight = 3,
  label,
  className,
}: MultiTextBoxProps) => {
  const rows = defaultHeight || 3
  
  if (showAsDialog) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full p-2 border rounded">
            Open {label || 'MultiText'} Dialog
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="grid gap-4 py-4">
            {label && <Label htmlFor={refId}>{label}</Label>}
            <Textarea 
              id={refId} 
              rows={rows} 
              className={className} 
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={refId}>{label}</Label>}
      <Textarea 
        id={refId} 
        rows={rows} 
        className={className} 
      />
    </div>
  )
}
