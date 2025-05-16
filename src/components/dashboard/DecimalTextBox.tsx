import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface DecimalTextBoxProps {
  defaultValue?: number;
  spin?: boolean;
  spinStep?: number;
  label?: string;
}

export function DecimalTextBox({ 
  defaultValue = 1, 
  spin = true, 
  spinStep = 1, 
  label = "" 
}: DecimalTextBoxProps) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      {spin ? (
        <Slider
          defaultValue={[defaultValue]}
          step={spinStep}
          min={0}
          max={100}
          className="w-full"
        />
      ) : (
        <Input 
          type="number" 
          defaultValue={defaultValue} 
          className="w-full"
        />
      )}
    </div>
  );
}
