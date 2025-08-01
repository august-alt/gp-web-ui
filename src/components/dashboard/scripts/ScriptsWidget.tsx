import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { AddScriptDialog } from './AddScriptDialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const ScriptsWidget = () => {
  const [showAddScriptWidget, setShowAddScriptWidget] = useState(false)

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <Label className="text-lg font-bold">
          Logon scripts for Default Domain Policy
        </Label>
        <Separator className="my-2" />
      </div>

      <div className="flex flex-1">
          <div className="flex-1 pr-2">
            <Table className="h-full">
              <TableHeader>
                <TableRow>
                  <TableHead rowSpan={2}>Script</TableHead>
                  <TableHead rowSpan={2}>Arguments</TableHead>
                </TableRow>
                <TableRow>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Example Script</TableCell>
                  <TableCell>Example Arguments</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

        <div className="w-24 flex flex-col gap-2">
          <Button>Up</Button>
          <Button>Down</Button>
          <div className="flex-1" />
          <Button onClick={() => setShowAddScriptWidget(true)}>Add</Button>
          <Button onClick={() => setShowAddScriptWidget(true)}>Edit</Button>
          <Button>Remove</Button>
        </div>
      </div>

      <AddScriptDialog open={showAddScriptWidget} onOpenChange={setShowAddScriptWidget} />

      <Separator className="my-4" />

      <div className="mb-4">
        <Label className="text-sm mb-2">
          To view the script files stored in this Group Policy Object, press the button below
        </Label>
        <Button>Show files</Button>
      </div>
    </div>
  )
}
