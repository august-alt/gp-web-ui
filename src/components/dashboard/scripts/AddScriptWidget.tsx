import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AddScriptWidget() {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-3 gap-4 items-center">
        <Label htmlFor="name" className="col-span-1">Script Name:</Label>
        <Input id="name" className="col-span-2" placeholder="Enter script name" />
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        <Label htmlFor="arguments" className="col-span-1">Script Arguments:</Label>
        <Input id="arguments" className="col-span-2" placeholder="Enter script arguments" />
        <Button variant="outline" disabled>Browse...</Button>
      </div>

      <div className="flex justify-end space-x-2">
        <Button>OK</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </div>
  )
}
