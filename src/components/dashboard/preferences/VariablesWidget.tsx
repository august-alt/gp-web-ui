import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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

  const getRadioState = () => {
    if (varData?.user)
     return "user";
    if (varData?.system)
     return "system";
    return "user";
  }

  const getExplainText = (action: number, partial: boolean, path: boolean) => {
    switch (action)
    {
      case 1:
        if (path)
          {
            if (partial)
            {
              return "The PATH variable contains a list of folder paths that system uses when" +
                     " locating executable files. Replace will replace" +
                     " the specified part of the path variable. This will have no net" +
                     " effect on the path with the possible exception of changing the" +
                     " text case of the specified segment. Multiple segments are not" +
                     " supported by this option.";
            }
            else
            {
              return "The PATH variable contains a list of folder paths that system uses when" +
                     " locating executable files. Replace will replace the FULL path" +
                     " variable as specified. This will remove all previously existing" +
                     " path values.";
            }
          }
          return "Replace will replace the variable in the specified environment." +
                 " If it doesn't exist, it will be created.";
      case 2:
        if (path)
          {
            if (partial)
            {
              return "The PATH variable contains a list of folder paths that system uses when" +
                     " locating executable files. Update will replace the specified" +
                     " part of the path variable. This will have no net effect on the path with" +
                     " the possible exception of changing the text case of the specified" +
                     " segment. Multiple segments are not supported by this option.";
            }
            else
            {
              return "The PATH variable contains a list of folder paths that system uses when" +
                     " locating executable files. Update will replace the FULL" +
                     " path variable as specified. This will remove all previously existing" +
                     " path values.";
            }
          }
          return "Update will replace the variable in the specified environment." +
                 " If it doesn't exist, it will be created.";
      case 3:
        if (path)
          {
            if (partial)
            {
              return "The PATH variable contains a list of folder paths that system uses when" +
                     " locating executable files. Delete will remove the specified" +
                     " segment from the existing path variable. If the segment doesn't exist," +
                     " an error is not returned. Multiple segments are not supported" +
                     " by this option.";
            }
            else
            {
              return "The PATH variable contains a list of folder paths that system uses when" +
                     " locating executable files. Delete will delete the FULL path" +
                     " variable. If it doesn't exist, an error is not returned. This" +
                     " setting is not generally recommended.";
            }
          }
          return "Delete will remove the variable from the specified environment." +
                 " If it doesn't exist, an error is not returned.";
    }

    if (path)
    {
      if (partial)
      {
        return "Create will add the variable to the specified environment." +
               " If it already exists, the value will not be changed.";
      }
      else
      {
        return "The PATH variable contains a list of folder paths that system" +
               "uses when locating executable files." +
               " Create will create the full path variable as specified if" +
               " it does not exist. Generally the path will already exist.";
      }
    }
    return "Create will add the variable to the specified environment." +
           " If it already exists, the value will not be changed.";
  }

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
            name="system"
            value={getRadioState()}
            onValueChange={
              (value: string) => {
                const boolValue = value === "user";

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

      {/* Value Checkboxes (System only) */}
      <div className="flex flex-rows-3 items-center gap-4 mt-2">
        <Label htmlFor="partial" className="text-right">
          Partial:
        </Label>
        <div className="col-span-2 flex items-center space-x-4">
          <Checkbox
            id="partial"
            name="partial"
            checked={varData?.partial || false}
            onCheckedChange={(checked: boolean) => handleChange({ target: { name: "partial", value: checked } })}
            disabled={varData?.system != true}
          />
          <Label htmlFor="path" className="whitespace-nowrap">
            PATH:
          </Label>
          <Checkbox
            id="path"
            name="path"
            checked={varData?.name === "PATH" || false}
            onCheckedChange={(checked: boolean) => handleChange({ target: { name: "name", value: checked ? "PATH" : "" } })}
            disabled={varData?.system != true}
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
            {getExplainText(varData?.action || 0, varData?.partial || false, varData?.name?.toLowerCase() === "path")}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
