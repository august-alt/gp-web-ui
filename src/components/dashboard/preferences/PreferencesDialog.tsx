import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CommonWidget } from "@/components/dashboard/preferences/CommonWidget"
import { DrivesWidget } from "@/components/dashboard/preferences/DrivesWidget"
import { FilesWidget } from "@/components/dashboard/preferences/FilesWidget"
import { FoldersWidget } from "@/components/dashboard/preferences/FoldersWidget"
import { IniWidget } from "@/components/dashboard/preferences/IniWidget"
import { RegistryWidget } from "@/components/dashboard/preferences/RegistryWidget"
import { SharesWidget } from "@/components/dashboard/preferences/SharesWidget"
import { ShortcutsWidget } from "@/components/dashboard/preferences/ShortcutsWidget"
import { VariablesWidget } from "@/components/dashboard/preferences/VariablesWidget"

interface PreferencesDialogProps {
    preferencesType?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    currentItem: any
}

export function PreferencesDialog({ preferencesType, open = false, onOpenChange = () => {}, currentItem }: PreferencesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Preferences</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="common" className="w-full">
          <TabsList className="flex w-full mb-4">
            {preferencesType === "Drive Maps" && <TabsTrigger value="drive-maps">Drive Maps</TabsTrigger>}
            {preferencesType === "Files" && <TabsTrigger value="files">Files</TabsTrigger>}
            {preferencesType === "Folders" && <TabsTrigger value="folders">Folders</TabsTrigger>}
            {preferencesType === "Ini Files" && <TabsTrigger value="ini">Ini</TabsTrigger>}
            {preferencesType === "Registry" && <TabsTrigger value="registry">Registry</TabsTrigger>}
            {preferencesType === "Network Shares" && <TabsTrigger value="shares">Shares</TabsTrigger>}
            {preferencesType === "Shortcuts" && <TabsTrigger value="shortcuts">Shortcuts</TabsTrigger>}
            {preferencesType === "Environment" && <TabsTrigger value="variables">Environment Variables</TabsTrigger>}
            <TabsTrigger value="common">Common</TabsTrigger>
          </TabsList>

          <TabsContent value="common" className="space-y-4">
            <CommonWidget/>
          </TabsContent>
          {preferencesType === "Drive Maps" && (
            <TabsContent value="drive-maps" className="space-y-4">
              <DrivesWidget/>
            </TabsContent>
          )}
          {preferencesType === "Files" && (
            <TabsContent value="files" className="space-y-4">
              <FilesWidget sourceItem={currentItem}/>
            </TabsContent>
          )}
          {preferencesType === "Folders" && (
            <TabsContent value="folders" className="space-y-4">
              <FoldersWidget/>
            </TabsContent>
          )}
          {preferencesType === "Ini Files" && (
            <TabsContent value="ini" className="space-y-4">
              <IniWidget/>
            </TabsContent>
          )}
          {preferencesType === "Registry" && (
            <TabsContent value="registry" className="space-y-4">
              <RegistryWidget/>
            </TabsContent>
          )}
          {preferencesType === "Network Shares" && (
            <TabsContent value="shares" className="space-y-4">
              <SharesWidget/>
            </TabsContent>
          )}
          {preferencesType === "Shortcuts" && (
            <TabsContent value="shortcuts" className="space-y-4">
              <ShortcutsWidget/>
            </TabsContent>
          )}
          {preferencesType === "Environment" && (
            <TabsContent value="variables" className="space-y-4">
              <VariablesWidget/>
            </TabsContent>
          )}
        </Tabs>

          <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>OK</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
