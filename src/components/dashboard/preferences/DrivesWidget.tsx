import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import type { IDriveMapInterface } from './IDriveMapInterface'
import { convertIndex, convertAction } from './Helpers'

interface DrivesWidgetProps {
  sourceItem: IDriveMapInterface
  updateData: (item: IDriveMapInterface) => void
}

export const DrivesWidget = ({ sourceItem, updateData }: DrivesWidgetProps) => {
  const [driveData, setDriveData] = useState<IDriveMapInterface>({
    action: sourceItem?.action || 0,
    path: sourceItem?.path || "",
    label: sourceItem?.label || "",
    persistent: sourceItem?.persistent || false,
    useLetter: sourceItem?.useLetter || false,
    thisDrive: sourceItem?.thisDrive || 0,
    allDrives: sourceItem?.allDrives || 0,
    letter: sourceItem?.letter || 'A:'
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setDriveData({
      ...driveData,
      [name]: value
    });

    updateData({
      ...driveData,
      [name]: value
    });
  };

  const convertDriveRadioState = (index: number) => {
    switch (index)
    {
      case 1:
        return "HIDE";
      case 2:
        return "SHOW";
    }

    return "NOCHANGE";
  }

  const convertDriveRadioIndex = (state: string) => {
    switch (state)
    {
      case "HIDE":
        return 1;
      case "SHOW":
        return 2;
    }

    return 0;
  }

  return (
    <Card className="p-4 space-y-4">
      {/* Action Section */}
      <div className="flex items-center gap-2">
        <Label htmlFor="action" className="whitespace-nowrap">
          Action:
        </Label>
        <Select
          value={convertIndex(driveData?.action || 0)}
          name="action"
          onValueChange={(value) => {
            handleChange({ target: { name: "action", value: convertAction(value) } });
          }}
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

      {/* Location Section */}
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div  className="space-y-2">
            <div className="flex gap-4">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                placeholder="Enter location"
                name="path"
                value={driveData?.path || ""}
                onChange={handleChange}
                disabled={driveData?.action === 3}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="reconnect">Reconnect: </Label>
                <Checkbox
                  id="reconnect"
                  checked={driveData?.persistent || false}
                  onCheckedChange={(value) => handleChange({ target: { name: "persistent", value: value } })}
                  disabled={driveData?.action === 3}
                />
              </div>
              <Label htmlFor="labelAs" className='whitespace-nowrap'>Label as:</Label>
              <Input
                id="labelAs"
                type="text"
                placeholder="Enter label"
                name="label"
                value={driveData?.label || ""}
                onChange={handleChange}
                disabled={driveData?.action === 3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drive Letter Section */}
      <Card>
        <CardHeader>
          <CardTitle>Drive letter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <RadioGroup
              value={driveData?.useLetter ? "existing" : "firstAvailable"}
              name="useLetter"
              onValueChange={(value) => handleChange({ target: { name: "useLetter", value: (value.localeCompare("existing") === 0)} })}
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
              value={driveData?.letter || "A:"}
              name="letter"
              onValueChange={(value) => handleChange({ target: { name: "letter", value } })}
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
              value={convertDriveRadioState(driveData?.thisDrive || 0)}
              name="thisDrive"
              onValueChange={(value) => handleChange({ target: { name: "thisDrive", value: convertDriveRadioIndex(value) } })}
              className="space-y-2"
              disabled={driveData?.action === 3}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="NOCHANGE" id="this-no-change" defaultChecked />
                <Label htmlFor="this-no-change">No change</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="HIDE" id="this-hide" />
                <Label htmlFor="this-hide">Hide this drive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SHOW" id="this-show" />
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
              value={convertDriveRadioState(driveData?.allDrives || 0)}
              name="allDrives"
              onValueChange={(value) => handleChange({ target: { name: "allDrives", value: convertDriveRadioIndex(value) } })}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="NOCHANGE" id="all-no-change" defaultChecked />
                <Label htmlFor="all-no-change">No change</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="HIDE" id="all-hide" />
                <Label htmlFor="all-hide">Hide all drive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SHOW" id="all-show" />
                <Label htmlFor="all-show">Show all drive</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    </Card>
  )
}
