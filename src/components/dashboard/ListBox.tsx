import { Label } from "@/components/ui/label"

interface ListBoxProps {
  label: string
}

export function ListBox({ label }: ListBoxProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-card text-card-foreground">
      <Label className="block font-medium mb-2">{label}</Label>
      {/* List content will be implemented here in future iterations */}
      <div className="space-y-1">
        {/* List items go here */}
      </div>
    </div>
  )
}
