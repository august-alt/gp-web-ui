import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextBoxProps {
  refId: string;
  label: string;
  defaultValue: string;
}

export const TextBox = ({ refId, label, defaultValue }: TextBoxProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={refId}>{label}</Label>
      <Input 
        id={refId} 
        name={refId} 
        defaultValue={defaultValue} 
        className="w-full"
      />
    </div>
  );
};

export type {
  TextBoxProps
}
