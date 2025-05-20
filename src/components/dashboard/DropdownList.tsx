import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useState } from "react"

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
  const [selectedValue, setSelectedValue] = useState(values[Math.min(defaultItem, values.length - 1)])

  return (
    <div className="space-y-2">
      <Label htmlFor={refId}>{label}</Label>
      <Select
        defaultValue={selectedValue}
        value={selectedValue}
        onValueChange={setSelectedValue}
      >
        <SelectTrigger id={refId} className="w-[340px]">
            <SelectValue placeholder={selectedValue} />
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

export type {
    DropdownListProps
}