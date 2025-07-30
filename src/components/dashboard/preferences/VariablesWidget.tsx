import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { type IEnvironmentInterface } from './IEnvironmentInterface'
import { convertIndex, convertAction } from './Helpers'

interface ShortcutsWidgetProps {
  sourceItem: IEnvironmentInterface
  updateData: (item: IEnvironmentInterface) => void
}

export function VariablesWidget({sourceItem, updateData}:ShortcutsWidgetProps) {
  const [varData, setVarData] = useState<IEnvironmentInterface>(sourceItem);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setVarData({
      ...varData,
      [name]: value
    });

    updateData({
      ...varData,
      [name]: value
    });
  };

  return (
    <div className="space-y-4">
      {/* Action ComboBox Section */}
      <div className="flex items-center gap-2">
        <Label htmlFor="action" className="whitespace-nowrap">
          Action:
        </Label>
        <Select defaultValue="Create" value={convertIndex(varData?.action || 0)} name="action" onValueChange={(value) => { handleChange({target: { name: "action", value: convertAction(value) }}) } }>
          <SelectTrigger id="action" className="w-[180px]">
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Create">Create</SelectItem>
            <SelectItem value="Replace">Replace</SelectItem>
            <SelectItem value="Update">Update</SelectItem>
            <SelectItem value="Delete">Delete</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Variable Type Group */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Variable Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <RadioGroup
            defaultValue="user"
            className="flex flex-col space-y-1"
            value={ varData?.user ? "user" : varData?.system ? "system" : "user" }
            onChange={
              (value) => {
                let boolValue = (value as any as string === "user");

                handleChange({target: { name: "user", value: boolValue }})
                handleChange({target: { name: "system", value: !boolValue }})
              }
            }
            >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="user" id="user-variable" />
              <Label htmlFor="user-variable">User Variable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="system-variable" />
              <Label htmlFor="system-variable">System Variable</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Name and Value Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name:
          </Label>
          <Input
            id="name"
            defaultValue="VariableName"
            className="col-span-2"
            name="name"
            value={varData?.name || ""}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="value" className="text-right">
            Value:
          </Label>
          <Input
            id="value"
            defaultValue="VariableValue"
            className="col-span-2"
            name="value"
            value={varData?.value || ""}
            disabled={varData?.action == 3}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Details Group */}
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Placeholder text for variable details. This text will wrap automatically to provide additional information about the selected variable.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
