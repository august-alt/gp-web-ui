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
import type { IScript } from './IScript'

export const ScriptsWidget = () => {
  const [scripts, setScripts] = useState<IScript[]>([
    { path: 'example-script.bat', arguments: 'arg1 arg2' },
    { path: 'another-script.ps1', arguments: 'param1' }
  ])
  const [showAddScriptWidget, setShowAddScriptWidget] = useState(false)
  const [selectedScriptIndex, setSelectedScriptIndex] = useState<number | null>(null)
  const [isEdit, setIsEdit] = useState(false)

  const handleAddScript = (script: IScript) => {
    setScripts([...scripts, script])
  }

  const handleUpdateScript = (updatedScript: IScript) => {
    if (selectedScriptIndex === null) return
    const newScripts = [...scripts]
    newScripts[selectedScriptIndex] = updatedScript
    setScripts(newScripts)
  }

  const handleDeleteScript = () => {
    if (selectedScriptIndex === null) return
    const newScripts = scripts.filter((_, index) => index !== selectedScriptIndex)
    setScripts(newScripts)
    setSelectedScriptIndex(null)
  }

  const handleMoveUp = () => {
    if (selectedScriptIndex === null || selectedScriptIndex === 0) return
    const newScripts = [...scripts]
    const temp = newScripts[selectedScriptIndex - 1]
    newScripts[selectedScriptIndex - 1] = newScripts[selectedScriptIndex]
    newScripts[selectedScriptIndex] = temp
    setScripts(newScripts)
    setSelectedScriptIndex(selectedScriptIndex - 1)
  }

  const handleMoveDown = () => {
    if (selectedScriptIndex === null || selectedScriptIndex === scripts.length - 1) return
    const newScripts = [...scripts]
    const temp = newScripts[selectedScriptIndex + 1]
    newScripts[selectedScriptIndex + 1] = newScripts[selectedScriptIndex]
    newScripts[selectedScriptIndex] = temp
    setScripts(newScripts)
    setSelectedScriptIndex(selectedScriptIndex + 1)
  }

  const handleEditClick = () => {
    if (selectedScriptIndex === null) return
    setIsEdit(true)
    setShowAddScriptWidget(true)
  }

  const handleDialogClose = () => {
    setShowAddScriptWidget(false)
    setIsEdit(false)
    setSelectedScriptIndex(null)
  }

  const handleDialogSave = (script: IScript) => {
    if (isEdit && selectedScriptIndex !== null) {
      handleUpdateScript(script)
    } else {
      handleAddScript(script)
    }
    setShowAddScriptWidget(false)
    setIsEdit(false)
    setSelectedScriptIndex(null)
  }

  const getSelectedScript = () => {
    if (selectedScriptIndex === null) return null
    return scripts[selectedScriptIndex]
  }

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
                {scripts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      No scripts configured
                    </TableCell>
                  </TableRow>
                ) : (
                  scripts.map((script, index) => (
                    <TableRow
                      key={index}
                      className={selectedScriptIndex === index ? 'bg-blue-100' : ''}
                      onClick={() => setSelectedScriptIndex(index)}
                    >
                      <TableCell>{script.path || 'No path'}</TableCell>
                      <TableCell>{script.arguments || 'No arguments'}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

        <div className="w-24 flex flex-col gap-2">
          <Button onClick={handleMoveUp} disabled={selectedScriptIndex === null || selectedScriptIndex === 0}>
            Up
          </Button>
          <Button onClick={handleMoveDown} disabled={selectedScriptIndex === null || selectedScriptIndex === scripts.length - 1}>
            Down
          </Button>
          <div className="flex-1" />
          <Button onClick={() => {
            setIsEdit(false)
            setShowAddScriptWidget(true)
          }}>
            Add
          </Button>
          <Button
            onClick={handleEditClick}
            disabled={selectedScriptIndex === null}
          >
            Edit
          </Button>
          <Button
            onClick={handleDeleteScript}
            disabled={selectedScriptIndex === null}
          >
            Remove
          </Button>
        </div>
      </div>

      <AddScriptDialog
        open={showAddScriptWidget}
        onOpenChange={handleDialogClose}
        onSave={handleDialogSave}
        script={getSelectedScript()}
        isEdit={isEdit}
      />

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
