import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { type IIniFileInterface } from './IIniFileInterface'
import { convertIndex, convertAction } from './Helpers'

interface IniWidgetProps {
  sourceItem: IIniFileInterface
  updateData: (item: IIniFileInterface) => void
}

export function IniWidget({sourceItem, updateData}:IniWidgetProps) {
  const [iniData, setIniData] = useState<IIniFileInterface>(sourceItem)

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setIniData({
      ...iniData,
      [name]: value
    });
    updateData({
      ...iniData,
      [name]: value
    });
  };

  return (
    <div className="space-y-4 p-4">
      {/* Action Selector */}
      <div className="flex items-center gap-2">
        <Label htmlFor="action" className="text-sm font-medium">
          Action:
        </Label>
        <Select value={convertIndex(iniData?.action || 0)} name="action" onValueChange={(value) => { handleChange({target: { name: "action", value: convertAction(value) }}) }}>
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
          <Input id="filePath" name="path" value={iniData?.path || ""} onChange={handleChange} placeholder="Select file path"/>
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
          <Input id="section" name="section" value={iniData?.section || ""} onChange={handleChange} placeholder="Section name" disabled={iniData?.path?.length === 0} />
        </div>
      </div>

      {/* Property Name */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <Label htmlFor="property" className="text-sm font-medium">
          Property Name
        </Label>
        <div className="col-span-2">
          <Input id="property" name="property" value={iniData?.property || ""} onChange={handleChange} placeholder="Property name" disabled={iniData?.path?.length === 0 || iniData?.section?.length === 0} />
        </div>
      </div>

      {/* Property Value */}
      <div className="grid grid-cols-3 gap-4 items-center">
        <Label htmlFor="value" className="text-sm font-medium">
          Property Value
        </Label>
        <div className="col-span-2">
          <Input id="value" name="value" value={iniData?.value || ""} onChange={handleChange} placeholder="Property value" disabled={iniData?.path?.length === 0 || iniData?.section?.length === 0 || iniData?.property?.length === 0} />
        </div>
      </div>
    </div>
  )
}
