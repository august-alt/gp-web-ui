import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { ContentWidget, type ContentWidgetProps } from "./ContentWidget"

export function AdministrativeTemplatesWidget({
  help = '',
  policyName = '',
  supportedOnText = '',
  presentation = { widgets: [] },
}: {
  help?: string
  policyName?: string
  supportedOnText?: string
  presentation?: ContentWidgetProps
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Policy Name Frame */}
      <div className="h-9 border rounded-sm p-2 mb-2 mt-2 mr-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Policy Name: {policyName}
        </Label>
      </div>

      {/* Splitter Container */}
      <div className="flex flex-1 gap-2 mb-2">
        {/* Left Content Panel */}
        <div className="flex-1 min-w-56">
          <div className="border rounded-sm p-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Policy State
            </h3>
            <RadioGroup defaultValue="notConfigured" className="space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="notConfigured" id="notConfigured" />
                <Label htmlFor="notConfigured" className="text-sm">Not Configured</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="enabled" id="enabled" />
                <Label htmlFor="enabled" className="text-sm">Enabled</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="disabled" id="disabled" />
                <Label htmlFor="disabled" className="text-sm">Disabled</Label>
              </div>
            </RadioGroup>
          </div>

          <ScrollArea className="mt-2 border rounded-sm h-64">
            <div className="p-2">
              <ContentWidget widgets={presentation.widgets || []}></ContentWidget>
            </div>
          </ScrollArea>
        </div>

        {/* Right Help Panel */}
        <div className="w-52 flex-shrink-0">
          <div className="border rounded-sm p-2 h-full flex flex-col">
            <div className="mb-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Supported on:
              </Label>
              <Textarea
                value={supportedOnText}
                readOnly
                className="min-h-[78px] border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              />
            </div>

            <div className="mb-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Comment:
              </Label>
              <Textarea
                readOnly
                className="min-h-[78px] border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              />
            </div>

            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Help:
              </Label>
              <Textarea
                value={help}
                readOnly
                className="min-h-[210px] border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Button Container */}
      <div className="flex justify-end gap-2 mt-auto mb-2 mr-2">
        <Button variant="outline" className="px-4">
          Cancel
        </Button>
        <Button className="px-4">
          OK
        </Button>
      </div>
    </div>
  )
}
