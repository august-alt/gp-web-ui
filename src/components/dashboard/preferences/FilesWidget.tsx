import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

export function FilesWidget() {
  return (
    <div className="flex flex-col h-full">
      {/* Action selector */}
      <div className="flex gap-2 mb-4">
        <div className="w-32">Action:</div>
        <Select defaultValue="create">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="replace">Replace</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Horizontal separator */}
      <Separator className="my-4" />

      {/* File paths section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-1 text-sm">Source file(s):</div>
        <Input className="col-span-2" placeholder="Placeholder" />
        <Button variant="outline" size="icon" className="ml-2">
          ...
        </Button>

        <div className="col-span-1 text-sm mt-4">Destination:</div>
        <Input className="col-span-2 mt-4" placeholder="Placeholder" />
        <Button variant="outline" size="icon" className="ml-2 mt-4">
          ...
        </Button>
      </div>

      {/* Supress errors checkbox */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox id="supress-errors" />
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
            <Checkbox id="read-only" />
            <Label
              htmlFor="read-only"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Read-only
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="hidden" />
            <Label
              htmlFor="hidden"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hidden
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="archive" />
            <Label
              htmlFor="archive"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Archive
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="executable" />
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
