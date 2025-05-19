import { Label } from "@/components/ui/label"

interface ListBoxProps {
  label: string
  children?: React.ReactNode
}

export function ListBox({ label, children = null }: ListBoxProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-card text-card-foreground">
      <Label className="block font-medium mb-2">{label}</Label>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  )
}

export type {
    ListBoxProps
}
