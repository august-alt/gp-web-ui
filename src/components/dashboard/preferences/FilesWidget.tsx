import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

import { type IFileInterface } from "./IFileInterface"
import { convertIndex, convertAction } from "./Helpers"

interface FilesWidgetProps {
  sourceItem: IFileInterface
  updateData: (item: IFileInterface) => void
}

export function FilesWidget({sourceItem, updateData}: FilesWidgetProps) {
  const [fileData, setFileData] = useState<IFileInterface>(sourceItem)

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFileData({
      ...fileData,
      [name]: value
    });
    updateData({
      ...fileData,
      [name]: value
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Action selector */}
      <div className="flex gap-2 mb-4">
        <div className="w-32 flex-1 mt-2">Action:</div>
        <Select value={convertIndex(fileData?.action || 0)} name="action" onValueChange={(value) => { handleChange({target: { name: "action", value: convertAction(value) }}) }}>
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

      {/* Horizontal separator */}
      <Separator className="my-4" />

      {/* File paths section */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="flex w-full">
          <div className="text-sm mt-2 flex-3">Source file(s):</div>
          <Input className="flex-7" placeholder="Placeholder" id="fromPath" name="fromPath" value={fileData?.fromPath || ""} onChange={handleChange}/>
          <Button variant="outline" size="icon" className="ml-2">
            ...
          </Button>
        </div>
        <div className="flex w-full">
          <div className="text-sm mt-2 flex-3">Destination:</div>
          <Input className="flex-7" placeholder="Placeholder" id="targetPath" name="targetPath" value={fileData?.targetPath || ""} onChange={handleChange}/>
          <Button variant="outline" size="icon" className="ml-2">
            ...
          </Button>
        </div>
      </div>

      {/* Supress errors checkbox */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="supress-errors"
            name="suppress"
            checked={fileData?.suppress}
            onCheckedChange={(value) => { handleChange({ target: { name: "suppress", value: value } }) }}
          />
          <Label
            htmlFor="supress-errors"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Supress errors on individual file actions
          </Label>
        </div>
      </div>

      {/* Attributes group box */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-sm">Attributes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="read-only"
              name="readonly"
              checked={fileData?.readonly}
              onCheckedChange={(value) => { handleChange({ target: { name: "readonly", value: value } }) }}
            />
            <Label
              htmlFor="read-only"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Read-only
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hidden"
              name="hidden"
              checked={fileData?.hidden}
              onCheckedChange={(value) => { handleChange({ target: { name: "hidden", value: value } }) }}
            />
            <Label
              htmlFor="hidden"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hidden
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="archive"
              name="archive"
              checked={fileData?.archive}
              onCheckedChange={(value) => { handleChange({ target: { name: "archive", value: value } }) }}
            />
            <Label
              htmlFor="archive"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Archive
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="executable"
              name="executable"
              checked={fileData?.executable}
              onCheckedChange={(value) => { handleChange({ target: { name: "executable", value: value } }) }}
            />
            <Label
              htmlFor="executable"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Executable
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
