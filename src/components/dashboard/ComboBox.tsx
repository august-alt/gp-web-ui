import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ComboBoxProps {
  refId: string;
  label: string;
  defaultValue: string;
  suggestions: string[];
}

export function ComboBox({ refId, label, defaultValue, suggestions }: ComboBoxProps) {
  return (
    <div className="mb-4">
      <Label htmlFor={refId} className="block text-sm font-medium mb-2">
        {label}
      </Label>
      <Select defaultValue={defaultValue}>
        <SelectTrigger>
          <SelectValue placeholder={defaultValue}/>
        </SelectTrigger>
        <SelectContent>
          {suggestions.map((suggestion, index) => (
            <SelectItem key={index} value={suggestion}>
              {suggestion}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export type {
  ComboBoxProps
}
