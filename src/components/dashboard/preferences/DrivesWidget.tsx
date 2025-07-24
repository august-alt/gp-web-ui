import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { IDriveMapInterface } from './IDriveMapInterface'
import { convertIndex } from './Helpers'

interface DrivesWidgetProps {
  sourceItem: IDriveMapInterface
}

export const DrivesWidget = ({ sourceItem }: DrivesWidgetProps) => {
  const [action, setAction] = useState(convertIndex(sourceItem?.action || 0))
  const [thisDrive, setThisDrive] = useState(sourceItem.thisDrive?.toString() || 'noChange')
  const [allDrives, setAllDrives] = useState(sourceItem.allDrives?.toString() || 'noChange')
  const [driveLetter, setDriveLetter] = useState(sourceItem.letter || 'A:')

  return (
    <Card className="p-4 space-y-4">
      {/* Action Section */}
      <div className="flex items-center gap-2">
        <Label htmlFor="action" className="whitespace-nowrap">
          Action:
        </Label>
        <Select
          value={action}
          onValueChange={setAction}
        >
          <SelectTrigger className="w-[180px]" id="action">
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

      {/* Drive Letter Section */}
      <Card>
        <CardHeader>
          <CardTitle>DriveLetter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <RadioGroup
              value={driveLetter}
              onValueChange={setDriveLetter}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="existing" id="existing" />
                <Label htmlFor="existing">Existing:</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="firstAvailable" id="firstAvailable" />
                <Label htmlFor="firstAvailable">Use first available, starting at:</Label>
              </div>
            </RadioGroup>

            <Select
              value={driveLetter === 'existing' ? 'A:' : 'Z:'}
              disabled={driveLetter === 'firstAvailable'}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({length: 26}, (_, i) =>
                  String.fromCharCode(65 + i) + ':'
                ).map(drive => (
                  <SelectItem key={drive} value={drive}>
                    {drive}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Hide/Show Sections */}
      <div className="flex gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Hide/Show this drive</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={thisDrive}
              onValueChange={setThisDrive}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="noChange" id="this-no-change" defaultChecked />
                <Label htmlFor="this-no-change">No change</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hide" id="this-hide" />
                <Label htmlFor="this-hide">Hide this drive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="show" id="this-show" />
                <Label htmlFor="this-show">Show this drive</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Hide/Show all drive</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={allDrives}
              onValueChange={setAllDrives}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="noChange" id="all-no-change" defaultChecked />
                <Label htmlFor="all-no-change">No change</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hide" id="all-hide" />
                <Label htmlFor="all-hide">Hide all drive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="show" id="all-show" />
                <Label htmlFor="all-show">Show all drive</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    </Card>
  )
}
