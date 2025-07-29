import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type IRegistryInterface } from './IRegistryInterface'
import { convertAction, convertIndex } from './Helpers'

interface RegistryWidgetProps {
  sourceItem: IRegistryInterface
  updateData: (item: IRegistryInterface) => void
}

export const RegistryWidget = ({sourceItem, updateData = () => {} }:RegistryWidgetProps) => {
  const [registryData, setRegistryData] = useState<IRegistryInterface>(sourceItem);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setRegistryData({
      ...registryData,
      [name]: value
    });

    updateData({
      ...registryData,
      [name]: value
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Action Section */}
      <div className="flex items-center gap-2">
        <Label htmlFor="action" className="whitespace-nowrap">Action:</Label>
        <Select value={convertIndex(registryData?.action || 0)} name="action" onValueChange={(value) => { handleChange({target: { name: "action", value: convertAction(value) }}) } }>
          <SelectTrigger id="action" className="w-[150px]">
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

      <Separator />

      {/* Hive and Key Path Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="hive" className="whitespace-nowrap">Hive:</Label>
          <Select value={registryData?.hive || "HKEY_CURRENT_USER"} name="hive" onValueChange={(value) => { handleChange({target: { name: "hive", value: value }}) } }>
            <SelectTrigger id="hive" className="w-full">
              <SelectValue placeholder="Select hive" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HKEY_CLASSES_ROOT">HKEY_CLASSES_ROOT</SelectItem>
              <SelectItem value="HKEY_CURRENT_USER">HKEY_CURRENT_USER</SelectItem>
              <SelectItem value="HKEY_LOCAL_MACHINE">HKEY_LOCAL_MACHINE</SelectItem>
              <SelectItem value="HKEY_USERS">HKEY_USERS</SelectItem>
              <SelectItem value="HKEY_CURRENT_CONFIG">HKEY_CURRENT_CONFIG</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="keyPath" className="whitespace-nowrap">Key Path:</Label>
          <Input
            id="keyPath"
            name="key"
            value={registryData?.key || ""}
            onChange={handleChange}
            placeholder="Enter key path"
          />
        </div>
      </div>

      {/* Value Name Section */}
      <Card>
        <CardHeader>
          <CardTitle>Value name</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="defaultValue"
              name="default"
              checked={registryData?.default}
              onCheckedChange={(value) => { handleChange({target: { name: "default", value: value }}) }}
            />
            <Label htmlFor="defaultValue">Default</Label>
          </div>
          <Input
            name="name"
            value={registryData?.name || ""}
            onChange={handleChange}
            placeholder="Enter value name"
          />
        </CardContent>
      </Card>

      {/* Value Type and Data Section */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="valueType" className="whitespace-nowrap">Value type:</Label>
            <Select value={registryData?.type || "REG_SZ"} name="type" onValueChange={(value) => { handleChange({target: { name: "type", value: value }}) } }>
              <SelectTrigger id="valueType" className="w-full">
                <SelectValue placeholder="Select value type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="REG_SZ">REG_SZ</SelectItem>
                <SelectItem value="REG_EXPAND_SZ">REG_EXPAND_SZ</SelectItem>
                <SelectItem value="REG_BINARY">REG_BINARY</SelectItem>
                <SelectItem value="REG_DWORD">REG_DWORD</SelectItem>
                <SelectItem value="REG_MULTI_SZ">REG_MULTI_SZ</SelectItem>
                <SelectItem value="REG_QWORD">REG_QWORD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="valueData" className="whitespace-nowrap">Value data:</Label>
            <Input
              id="valueData"
              name="value"
              value={registryData?.value || ""}
              onChange={handleChange}
              placeholder="Enter value data"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
