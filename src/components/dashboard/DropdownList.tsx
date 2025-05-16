import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface DropdownListProps {
  noSort: boolean
  defaultItem: number
  label: string
  values: string[]
  refId: string
}

export function DropdownList({ 
  noSort = false, 
  defaultItem = 0, 
  label, 
  values, 
  refId 
}: DropdownListProps) {
  const sortedValues = noSort ? values : [...values].sort()

  return (
    <div className="space-y-2">
      <Label htmlFor={refId}>{label}</Label>
      <Select defaultValue={values[Math.min(defaultItem, values.length - 1)]}>
        <SelectTrigger id={refId}>
          {sortedValues[0]}
        </SelectTrigger>
        <SelectContent>
          {sortedValues.map((value, index) => (
            <SelectItem key={index} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
