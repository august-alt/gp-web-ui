import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { type IFolderInterface } from './IFolderInterface'
import { convertIndex, convertAction } from './Helpers'

interface FoldersWidgetProps {
  sourceItem: IFolderInterface
  updateData: (item: IFolderInterface) => void
}

export const FoldersWidget = ({sourceItem, updateData}:FoldersWidgetProps) => {
  const [folderData, setFolderData] = useState<IFolderInterface>(sourceItem)

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFolderData({
      ...folderData,
      [name]: value
    });
    updateData({
      ...folderData,
      [name]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="action" className="w-24">Action:</Label>
        <Select value={convertIndex(folderData?.action || 0)} name="action" onValueChange={(value) => { handleChange({target: { name: "action", value: convertAction(value) }}) }}>
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="path">Path:</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="path"
              name="fromPath"
              value={folderData?.fromPath || ""}
              onChange={handleChange}
              className="flex-1"
            />
            <Button variant="outline" size="icon">
              ...
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Attributes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="read-only"
                name="readonly"
                checked={folderData?.readonly}
                onCheckedChange={(value) => { handleChange({ target: { name: "readonly", value: value } }) }}
              />
              <Label htmlFor="read-only">Read-only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hidden"
                name="hidden"
                checked={folderData?.hidden}
                onCheckedChange={(value) => { handleChange({ target: { name: "hidden", value: value } }) }}
              />
              <Label htmlFor="hidden">Hidden</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="archive"
                name="archive"
                checked={folderData?.archive}
                onCheckedChange={(value) => { handleChange({ target: { name: "archive", value: value } }) }}
              />
              <Label htmlFor="archive">Archive</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="delete-folder"
            name="deleteFolder"
            checked={folderData?.deleteFolder}
            onCheckedChange={(value) => { handleChange({ target: { name: "deleteFolder", value: value } }) }}
          />
          <Label htmlFor="delete-folder">Delete this folder (if emptied)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="recursive-delete"
            name="deleteSubFolders"
            checked={folderData?.deleteSubFolders}
            onCheckedChange={(value) => { handleChange({ target: { name: "deleteSubFolders", value: value } }) }}
          />
          <Label htmlFor="recursive-delete">Recursively delete subfolders (if emptied)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="delete-all"
            name="deleteFiles"
            checked={folderData?.deleteFiles}
            onCheckedChange={(value) => { handleChange({ target: { name: "deleteFiles", value: value } }) }}
          />
          <Label htmlFor="delete-all">Delete all files in the folder(s)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="allow-delete-readonly"
            name="deleteReadOnly"
            checked={folderData?.deleteReadOnly}
            onCheckedChange={(value) => { handleChange({ target: { name: "deleteReadOnly", value: value } }) }}
          />
          <Label htmlFor="allow-delete-readonly">Allow deletion of read-only files/folders</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="ignore-errors"
            name="deleteIgnoreErrors"
            checked={folderData?.deleteIgnoreErrors}
            onCheckedChange={(value) => { handleChange({ target: { name: "deleteIgnoreErrors", value: value } }) }}
          />
          <Label htmlFor="ignore-errors">Ignore errors for files/folders cannot be deleted</Label>
        </div>
      </div>
    </div>
  )
}
