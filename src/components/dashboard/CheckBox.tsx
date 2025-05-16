import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CheckBoxProps {
  defaultChecked?: boolean;
  label: string;
}

export function CheckBox({ defaultChecked = false, label }: CheckBoxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox defaultChecked={defaultChecked} />
      <Label htmlFor="terms">{label}</Label>
    </div>
  )
}

export type {
  CheckBoxProps
}
