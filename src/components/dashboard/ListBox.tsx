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
  const [childrenList, setChildrenList] = useState<ListBoxItem[]>(items || [])
  const [newChildName, setNewChildName] = useState("")

  const addChild = () => {
    if (newChildName.trim()) {
      setChildrenList([...childrenList, { name: newChildName.trim() }])
      setNewChildName("")
    }
  }

  const removeChild = (index: number) => {
    const newList = childrenList.filter((_, i) => i !== index)
    setChildrenList(newList)
  }

  return (
    <div>
      <Label className="block font-medium mb-2">{label}</Label>
      <Dialog>
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
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  placeholder="Child name"
                  className="flex-1 p-2 border rounded"
                />
                <Button
                  onClick={addChild}
                  className="p-2 bg-blue-500 text-white rounded"
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
                    {childrenList.map((child, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{index}</td>
                        <td className="p-2">{child.name}</td>
                        <td className="p-2">
                          <Button
                            onClick={() => removeChild(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button
                onClick={() => onSave(childrenList)}
                className="p-2 bg-green-500 text-white rounded w-full"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export type {
    ListBoxProps
}
