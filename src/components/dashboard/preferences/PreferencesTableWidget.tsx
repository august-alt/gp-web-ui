import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { useEffect } from "react"

import { DataProvider } from "@/providers/DataProvider"

export function PreferencesTableWidget({
  help = '',
  policyName = '',
  policyType = 0,
}: {
  help?: string
  policyName?: string
  policyType?: number
}) {
  useEffect(() => {
    const dataProvider = new DataProvider();

    dataProvider.getList("gpservice.basealt.ru.files.getFiles", policyType)
      .then((data: any) => { console.log(data)});
  }, []);

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
        </div>

        {/* Right Help Panel */}
        <div className="w-52 flex-shrink-0">
          <div className="border rounded-sm p-2 h-full flex flex-col">
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
    </div>
  )
}
