import { TreeView } from '@/components/ui/tree-view'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'

export const ScriptsWidget = () => {
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
            <TreeView 
              className="h-full"
              data={[]}
              initialSelectedItemId={undefined}
              onSelectChange={(item) => console.log('Selected:', item)}
            />
          </div>
        
        <div className="w-24 flex flex-col gap-2">
          <Button>Up</Button>
          <Button>Down</Button>
          <div className="flex-1" />
          <Button>Add</Button>
          <Button>Edit</Button>
          <Button>Remove</Button>
        </div>
      </div>

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
