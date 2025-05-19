import { TreeView } from "@/components/ui/tree-view"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function ScriptsPowerShellWidget() {
  return (
    <div className="flex flex-col h-full">
      {/* Main container with grid layout */}
      <div className="grid grid-cols-5 gap-4 h-full">
        {/* Left column - TreeView */}
        <div className="col-span-2 row-span-12 border rounded-md p-2">
          <TreeView 
            className="h-full"
            data={[]}
            initialSelectedItemId={undefined}
            onSelectChange={(item) => console.log('Selected:', item)}
          />
        </div>

        {/* Right column - Buttons and controls */}
        <div className="col-span-3 space-y-2">
          {/* First horizontal line */}
          <Separator />

          {/* Add/Edit/Remove buttons section */}
          <div className="flex space-x-2 mt-2">
            <Button>Up</Button>
            <Button>Down</Button>
          </div>
          
          <div className="flex space-x-2 mt-2">
            <Button>Add</Button>
            <Button>Edit</Button>
            <Button>Remove</Button>
          </div>

          {/* Second horizontal line */}
          <Separator className="mt-4" />

          {/* Run order label and combobox */}
          <div className="space-y-1 mt-4">
            <Label className="text-sm">For this GPO, run scripts in the following order:</Label>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Not configured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first">Run PowerShell scripts first</SelectItem>
                <SelectItem value="last">Run PowerShell scripts last</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Third horizontal line */}
          <Separator className="mt-4" />

          {/* Requirements label */}
          <div className="mt-4">
            <Label className="text-sm text-muted-foreground">
              PowerShell scripts require at least Windows 7 or Windows Server 2008 R2
            </Label>
          </div>

          {/* Show files button */}
          <div className="mt-4">
            <Button>Show files</Button>
          </div>

          {/* Main title label */}
          <div className="mt-4">
            <Label className="font-bold">
              Windows PowerShell Logon Scripts for Default Domain Policy
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
