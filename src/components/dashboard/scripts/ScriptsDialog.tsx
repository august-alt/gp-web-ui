import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ScriptsWidget } from "./ScriptsWidget"
import { ScriptsPowerShellWidget } from "./ScriptsPowerShellWidget"

interface ScriptsDialogProps {
  open: boolean
  policyName: string
  policyType: number
  onOpenChange: (open: boolean) => void
}

export function ScriptsDialog({ open, policyType, policyName, onOpenChange }: ScriptsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[800px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Scripts Configuration</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="scripts" className="flex-1 overflow-hidden">
          <div className="px-4 border-b">
            <TabsList>
              <TabsTrigger value="scripts">Scripts</TabsTrigger>
              <TabsTrigger value="powershell">PowerShell Scripts</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="scripts" className="mt-0 flex-1 overflow-y-auto">
            <ScriptsWidget policyType={policyType} currentPolicyName={`scripts.${policyName}`} scripts_={[]}/>
          </TabsContent>

          <TabsContent value="powershell" className="mt-0 flex-1 overflow-y-auto">
            <ScriptsPowerShellWidget />
          </TabsContent>
        </Tabs>

        <DialogFooter className="px-4 py-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>Apply</Button>
          <Button onClick={() => onOpenChange(false)}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
