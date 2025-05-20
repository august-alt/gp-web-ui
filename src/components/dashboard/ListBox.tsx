import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ListBoxProps {
  label: string
  onSave: (children: { name: string }[]) => void
  items?: ListBoxItem[] | null
}

interface ListBoxItem {
  name: string;
}

export function ListBox({ label, onSave, items = null }: ListBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemList, setItemList] = useState<ListBoxItem[]>(items || [])
  const [newItemName, setNewItemName] = useState("")

  const addChild = () => {
    if (newItemName.trim()) {
      setItemList([...itemList, { name: newItemName.trim() }])
      setNewItemName("")
    }
  }

  const removeChild = (index: number) => {
    const newList = itemList.filter((_, i) => i !== index)
    setItemList(newList)
  }

  return (
    <div>
      <Label className="block font-medium mb-2">{label}</Label>
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button className="p-2 border rounded">
      {label || 'Open ListBox Dialog'}
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
          <div className="grid gap-4 py-4">
            {label && <Label>{label}</Label>}
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="name"
                  className="flex-1 h-[37px] p-2 border rounded"
                />
                <Button
                  onClick={addChild}
                  className="p-2 border rounded"
                  variant="secondary"
                >
                  Add
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">Index</th>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemList.map((child, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{index}</td>
                        <td className="p-2">{child.name}</td>
                        <td className="p-2">
                          <Button
                            onClick={() => removeChild(index)}
                            variant="destructive"
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-2 mr-2">
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="px-4"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSave(itemList);
                setIsOpen(false);
              }}
              className="px-4"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export type {
    ListBoxProps
}
