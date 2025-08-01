import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { type IShortcutInterface } from './IShortcutInterface'
import { convertIndex, convertAction } from './Helpers'

interface ShortcutsWidgetProps {
  sourceItem: IShortcutInterface
  updateData: (item: IShortcutInterface) => void
}

export function ShortcutsWidget({ sourceItem, updateData }: ShortcutsWidgetProps) {
  const [shortcutsData, setShortcutsData] = useState<IShortcutInterface>(sourceItem);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setShortcutsData({
      ...shortcutsData,
      [name]: value
    });

    updateData({
      ...shortcutsData,
      [name]: value
    });
  };

  return (
    <div className="space-y-6 p-4">
      {/* Action Section */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Action:</Label>
        <Select
          value={convertIndex(shortcutsData?.action || 0)}
          name="action"
          onValueChange={(value) => {
            handleChange({ target: { name: "action", value: convertAction(value) } });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Create" />
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

      {/* Main Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Name:</Label>
            <div className="flex space-x-2">
              <Input
                className="flex-1"
                placeholder="Shortcut name"
                name="shortcutPath"
                value={shortcutsData?.shortcutPath || ""}
                onChange={handleChange}
              />
              <button className="px-2 py-1 border rounded text-xs">...</button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Target type:</Label>
            <Select
              name="targetType"
              value={shortcutsData?.targetType?.toString() || "0"}
              onValueChange={(value) => {
                handleChange({ target: { name: "targetType", value: parseInt(value) } });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="FILESYSTEM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">FILESYSTEM</SelectItem>
                <SelectItem value="1">URL</SelectItem>
                <SelectItem value="2">SHELL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Location:</Label>
            <Select
              name="location"
              value={shortcutsData?.location?.toString() || "0"}
              onValueChange={(value) => {
                handleChange({ target: { name: "location", value: parseInt(value) } });
              }}
              >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="[Specify full path]" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">[Specify full path]</SelectItem>
                <SelectItem value="1">Desktop</SelectItem>
                <SelectItem value="2">Start Menu</SelectItem>
                <SelectItem value="3">Programs</SelectItem>
                <SelectItem value="4">Startup</SelectItem>
                <SelectItem value="5">Explorer Favorites</SelectItem>
                <SelectItem value="6">Explorer Links</SelectItem>
                <SelectItem value="7">Send To</SelectItem>
                <SelectItem value="8">Recent</SelectItem>
                <SelectItem value="9">Quick Launch ToolBar</SelectItem>
                <SelectItem value="10">My Network Places</SelectItem>
                <SelectItem value="11">All Users Desktop</SelectItem>
                <SelectItem value="12">All Users Start Menu</SelectItem>
                <SelectItem value="13">All Users Programs</SelectItem>
                <SelectItem value="14">All Users Startup</SelectItem>
                <SelectItem value="15">All Users Explorer Favorites</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Separator />

      {/* Target Path Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Target path:</Label>
          <div className="flex space-x-2">
            <Input
              className="flex-1"
              placeholder="Path"
              name="targetPath"
              value={shortcutsData?.targetPath || ""}
              onChange={handleChange}
            />
            <button className="px-2 py-1 border rounded text-xs">...</button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Arguments:</Label>
          <Input
            placeholder="Arguments"
            name="arguments"
            value={shortcutsData?.arguments || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <Separator />

      {/* Icon File Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Icon file path:</Label>
          <div className="flex space-x-2">
            <Input
              className="flex-1"
              placeholder="Icon path"
              name="iconPath"
              value={shortcutsData?.iconPath || ""}
              onChange={handleChange}
            />
            <button className="px-2 py-1 border rounded text-xs">...</button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Icon index:</Label>
          <Input
            placeholder="Index"
            name="iconIndex"
            value={shortcutsData?.iconIndex || 0}
            onChange={handleChange}
          />
        </div>
      </div>
      <Separator />

      {/* Start In Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Start in:</Label>
          <div className="flex space-x-2">
            <Input
              className="flex-1"
              placeholder="Start directory"
              name="startIn"
              value={shortcutsData?.startIn || ""}
              onChange={handleChange}
            />
            <button className="px-2 py-1 border rounded text-xs">...</button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Shortcut key:</Label>
          <Input
            placeholder="Ctrl+..."
            name="shortcutKey"
            value={shortcutsData?.shortcutKey || ""}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Run:</Label>
          <Select
            name="window"
            value={shortcutsData?.window?.toString() || "0"}
            onValueChange={(value) => {
              handleChange({ target: { name: "window", value: parseInt(value) } });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Normal Window" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Normal Window</SelectItem>
              <SelectItem value="1">Minimized</SelectItem>
              <SelectItem value="2">Maximized</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Comment:</Label>
          <Input
            placeholder="Comment"
            name="comment"
            value={shortcutsData?.comment || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}
