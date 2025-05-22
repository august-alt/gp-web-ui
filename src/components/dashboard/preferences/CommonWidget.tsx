import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CommonWidget() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Options:</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox id="stopOnError" />
            <Label htmlFor="stopOnError" className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Stop processing items in this extension if an error occurs
            </Label>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="userContext" />
            <Label htmlFor="userContext" className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Run in logged-on user's security context (user policy option)
            </Label>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="removeThis" />
            <Label htmlFor="removeThis" className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Remove this item when it is no longer applied
            </Label>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="applyOnce" disabled />
            <Label htmlFor="applyOnce" className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Apply once and do not reapply
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="itemLevel" disabled />
              <Label htmlFor="itemLevel" className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Item-level targeting
              </Label>
            </div>
            <Button variant="outline" disabled>
              Targetting...
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-1">
        <Label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Description:
        </Label>
        <Textarea id="description" rows={4} />
      </div>
    </div>
  )
}
