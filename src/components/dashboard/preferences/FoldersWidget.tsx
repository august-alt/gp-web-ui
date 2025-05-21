import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export const FoldersWidget: React.FC = () => {
  const [action, setAction] = useState("Create")
  const [path, setPath] = useState("Placeholder")
  const [readOnly, setReadOnly] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [archive, setArchive] = useState(false)
  const [deleteThisFolder, setDeleteThisFolder] = useState(false)
  const [recursiveDelete, setRecursiveDelete] = useState(false)
  const [deleteAllFiles, setDeleteAllFiles] = useState(false)
  const [allowDeletionOfReadOnly, setAllowDeletionOfReadOnly] = useState(false)
  const [ignoreErrors, setIgnoreErrors] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="action" className="w-24">Action:</Label>
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="path">Path:</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
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
              <Checkbox id="read-only" checked={readOnly} onCheckedChange={() => setReadOnly(!readOnly)} />
              <Label htmlFor="read-only">Read-only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hidden" checked={hidden} onCheckedChange={() => setHidden(!hidden)} />
              <Label htmlFor="hidden">Hidden</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="archive" checked={archive} onCheckedChange={() => setArchive(!archive)} />
              <Label htmlFor="archive">Archive</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="delete-folder"
            checked={deleteThisFolder}
            onCheckedChange={() => setDeleteThisFolder(!deleteThisFolder)}
          />
          <Label htmlFor="delete-folder">Delete this folder (if emptied)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="recursive-delete"
            checked={recursiveDelete}
            onCheckedChange={() => setRecursiveDelete(!recursiveDelete)}
          />
          <Label htmlFor="recursive-delete">Recursively delete subfolders (if emptied)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="delete-all"
            checked={deleteAllFiles}
            onCheckedChange={() => setDeleteAllFiles(!deleteAllFiles)}
          />
          <Label htmlFor="delete-all">Delete all files in the folder(s)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="allow-delete-readonly"
            checked={allowDeletionOfReadOnly}
            onCheckedChange={() => setAllowDeletionOfReadOnly(!allowDeletionOfReadOnly)}
          />
          <Label htmlFor="allow-delete-readonly">Allow deletion of read-only files/folders</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="ignore-errors"
            checked={ignoreErrors}
            onCheckedChange={() => setIgnoreErrors(!ignoreErrors)}
          />
          <Label htmlFor="ignore-errors">Ignore errors for files/folders cannot be deleted</Label>
        </div>
      </div>
    </div>
  )
}
