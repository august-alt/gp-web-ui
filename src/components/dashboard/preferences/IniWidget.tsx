import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { type IIniFileInterface } from './IIniFileInterface'
import { convertIndex } from './Helpers'

interface IniWidgetProps {
  sourceItem: IIniFileInterface
}

export function IniWidget({sourceItem}:IniWidgetProps) {
  const [action, setAction] = useState(convertIndex(sourceItem.action))

  return (
    <div className="space-y-4 p-4">
      {/* Action Selector */}
      <div className="flex items-center gap-2">
        <Label htmlFor="action" className="text-sm font-medium">
          Action:
        </Label>
        <Select value={action} onValueChange={setAction}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Create">Create</SelectItem>
            <SelectItem value="Replace">Replace</SelectItem>
            <SelectItem value="Update">Update</SelectItem>
            <SelectItem value="Delete">Delete</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* File Path Section */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <Label htmlFor="filePath" className="text-sm font-medium">
          File path
        </Label>
        <div className="col-span-2 flex gap-2">
          <Input id="filePath" placeholder="Select file path" disabled={action === "Create"} />
          <Button variant="outline" size="icon">
            ...
          </Button>
        </div>
      </div>

      {/* Section Name */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <Label htmlFor="section" className="text-sm font-medium">
          Section Name
        </Label>
        <div className="col-span-2">
          <Input id="section" placeholder="Section name" disabled={action === "Create"} />
        </div>
      </div>

      {/* Property Name */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <Label htmlFor="property" className="text-sm font-medium">
          Property Name
        </Label>
        <div className="col-span-2">
          <Input id="property" placeholder="Property name" disabled={action === "Create"} />
        </div>
      </div>

      {/* Property Value */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <Label htmlFor="value" className="text-sm font-medium">
          Property Value
        </Label>
        <div className="col-span-2">
          <Input id="value" placeholder="Property value" disabled={action === "Create"} />
        </div>
      </div>
    </div>
  )
}
