import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { type IShareInterface } from './IShareInterface'
import { convertIndex, convertAction } from './Helpers'

interface SharesyWidgetProps {
  sourceItem: IShareInterface
  updateData: (item: IShareInterface) => void
}

export function SharesWidget({sourceItem, updateData}: SharesyWidgetProps) {
  const [shareData, setShareData] = useState<IShareInterface>({
    action: sourceItem?.action || 0,
    name: sourceItem?.name || "",
    path: sourceItem?.path || "",
    comment: sourceItem?.comment || "",
    allRegular: sourceItem?.allRegular || false,
    allHidden: sourceItem?.allHidden || false,
    allAdminDrive: sourceItem?.allAdminDrive || false,
    limitUsers: sourceItem?.limitUsers || "noChange",
    userLimit: sourceItem?.userLimit || 10,
    accessBasedEnumeration: sourceItem?.accessBasedEnumeration || "noChange",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setShareData({
      ...shareData,
      [name]: value
    });

    updateData({
      ...shareData,
      [name]: value
    });
  };

  return (
    <div className="space-y-6 p-4">
      {/* Action Section */}
      <div className="flex items-center space-x-2">
        <Label htmlFor="action" className="whitespace-nowrap">
          Action:
        </Label>
        <Select
          name="action"
          value={convertIndex(shareData.action || 0)}
          onValueChange={(value) => {
            handleChange({ target: { name: "action", value: convertAction(value) } });
          }}
        >
          <SelectTrigger id="action" className="w-[180px]">
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

      {/* Share Details Section */}
      <div className="space-y-4 border p-4 rounded-lg">
        <div>
          <Label htmlFor="share-name" className="mb-1">Share name:</Label>
          <div className="flex space-x-2">
            <Input
              id="share-name"
              name="name"
              value={shareData.name}
              onChange={handleChange}
              className="flex-1"
            />
            <Button variant="outline" disabled>...</Button>
          </div>
        </div>
        <div>
          <Label htmlFor="folder-path" className="mb-1">Folder path:</Label>
          <div className="flex space-x-2">
            <Input
              id="folder-path"
              name="path"
              value={shareData.path}
              onChange={handleChange}
              className="flex-1"
            />
            <Button variant="outline">...</Button>
          </div>
        </div>
        <div>
          <Label htmlFor="comment" className="mb-1">Comment:</Label>
          <Input
            id="comment"
            name="comment"
            value={shareData.comment}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="h-px bg-border my-4" />

      {/* Action Modifiers Section */}
      <div className="space-y-4">
        <Label className="font-medium">Action Modifiers:</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="update-regular"
              name="allRegular"
              checked={shareData.allRegular}
              onCheckedChange={(checked) => handleChange({ target: { name: "allRegular", value: checked } })}
            />
            <Label htmlFor="update-regular">Update all regular shares</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="update-hidden"
              name="allHidden"
              checked={shareData.allHidden}
              onCheckedChange={(checked) => handleChange({ target: { name: "allHidden", value: checked } })}
            />
            <Label htmlFor="update-hidden" className="whitespace-pre-wrap">
              Update all hidden non-administrative shares
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="update-admin"
              name="allAdminDrive"
              checked={shareData.allAdminDrive}
              onCheckedChange={(checked) => handleChange({ target: { name: "allAdminDrive", value: checked } })}
            />
            <Label htmlFor="update-admin" className="whitespace-pre-wrap">
              Update all administrative drive-letter shares
            </Label>
          </div>
        </div>
      </div>

      {/* User Limit Section */}
      <div className="space-y-4 border-t pt-4">
        <Label className="font-medium">User limit:</Label>
        <RadioGroup
          name="limitUsers"
          value={shareData.limitUsers}
          onValueChange={(value) => handleChange({ target: { name: "limitUsers", value } })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="noChange" id="user-nochange" />
            <Label htmlFor="user-nochange">No change</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="maxAllowed" id="user-max" />
            <Label htmlFor="user-max">Maximum allowed</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="user-custom" />
            <Label htmlFor="user-custom" className="flex-1">
              Allow this number of users:
            </Label>
            <Input
              type="number"
              min={0}
              max={65535}
              name="userLimit"
              value={shareData.userLimit}
              onChange={(e) => handleChange({ target: { name: "userLimit", value: parseInt(e.target.value) } })}
              className="w-20"
            />
          </div>
        </RadioGroup>
      </div>

      {/* Access-Based Enumeration Section */}
      <div className="space-y-4 border-t pt-4">
        <Label className="font-medium">Access-based Enumeration:</Label>
        <RadioGroup
          name="accessBasedEnumeration"
          value={shareData.accessBasedEnumeration}
          onValueChange={(value) => handleChange({ target: { name: "accessBasedEnumeration", value } })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="noChange" id="access-nochange" />
            <Label htmlFor="access-nochange">No change</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="enable" id="access-enable" />
            <Label htmlFor="access-enable">Enable</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="disable" id="access-disable" />
            <Label htmlFor="access-disable">Disable</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
