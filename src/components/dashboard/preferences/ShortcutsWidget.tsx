import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function ShortcutsWidget() {
  return (
    <div className="space-y-6 p-4">
      {/* Action Section */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Action:</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Create" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="replace">Replace</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
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
              <Input className="flex-1" placeholder="Shortcut name" />
              <button className="px-2 py-1 border rounded text-xs">...</button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Target type:</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="FILESYSTEM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="filesystem">FILESYSTEM</SelectItem>
                <SelectItem value="url">URL</SelectItem>
                <SelectItem value="shell">SHELL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Location:</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="[Specify full path]" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-path">[Specify full path]</SelectItem>
                <SelectItem value="desktop">Desktop</SelectItem>
                <SelectItem value="start-menu">Start Menu</SelectItem>
                <SelectItem value="programs">Programs</SelectItem>
                <SelectItem value="startup">Startup</SelectItem>
                <SelectItem value="favorites">Explorer Favorites</SelectItem>
                <SelectItem value="links">Explorer Links</SelectItem>
                <SelectItem value="send-to">Send To</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="quick-launch">Quick Launch ToolBar</SelectItem>
                <SelectItem value="network">My Network Places</SelectItem>
                <SelectItem value="all-desktop">All Users Desktop</SelectItem>
                <SelectItem value="all-start">All Users Start Menu</SelectItem>
                <SelectItem value="all-programs">All Users Programs</SelectItem>
                <SelectItem value="all-startup">All Users Startup</SelectItem>
                <SelectItem value="all-favorites">All Users Explorer Favorites</SelectItem>
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
            <Input className="flex-1" placeholder="Path" />
            <button className="px-2 py-1 border rounded text-xs">...</button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Arguments:</Label>
          <Input placeholder="Arguments" />
        </div>
      </div>
      <Separator />

      {/* Icon File Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Icon file path:</Label>
          <div className="flex space-x-2">
            <Input className="flex-1" placeholder="Icon path" />
            <button className="px-2 py-1 border rounded text-xs">...</button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Icon index:</Label>
          <Input placeholder="Index" disabled />
        </div>
      </div>
      <Separator />

      {/* Start In Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Start in:</Label>
          <div className="flex space-x-2">
            <Input className="flex-1" placeholder="Start directory" />
            <button className="px-2 py-1 border rounded text-xs">...</button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Shortcut key:</Label>
          <Input placeholder="Ctrl+..." />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Run:</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Normal Window" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal Window</SelectItem>
              <SelectItem value="minimized">Minimized</SelectItem>
              <SelectItem value="maximized">Maximized</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Comment:</Label>
          <Input placeholder="Comment" />
        </div>
      </div>
    </div>
  )
}
