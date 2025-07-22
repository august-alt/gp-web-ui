import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { useState, useEffect } from "react"

import { DataProvider } from "@/providers/DataProvider"

interface FileInterface {
   action?: string,
   archive?: boolean,
   executable?: boolean,
   fromPath?: string,
   hidden?: boolean,
   readonly?: boolean,
   suppress?: boolean,
   targetPath?: string
}

interface Item {
  id: string,
  file: FileInterface
};

export function PreferencesTableWidget({
  help = '',
  policyName = '',
  policyType = 0,
}: {
  help?: string
  policyName?: string
  policyType?: number
}) {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const dataProvider = new DataProvider();

    dataProvider.getList("gpservice.basealt.ru.files.getFiles", policyType)
      .then((data: any) => { setItems(data.items.result); console.log(data.items.result); });
  }, []);

  const handleRowClick = (item: Item) => {
    console.log(item);
  };

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Script Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(item)}
                  >
                    <TableCell className="font-medium">{item.file.fromPath}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={1} className="text-center text-muted-foreground">
                    No preferences available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
