import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

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
  const [value, setValue] = useState(defaultValue);
  
  const increment = () => {
    setValue(prev => Math.min(prev + spinStep, 100));
  };
  
  const decrement = () => {
    setValue(prev => Math.max(prev - spinStep, 0));
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      {spin ? (
        <div className="relative">
          <Input 
            value={value} 
            onChange={(e) => setValue(Number(e.target.value))} 
            className="w-full pr-10"
            min={0}
            max={100}
          />
          <div className="absolute right-2 top-0.5 h-full flex flex-col">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-4 w-4"
              onClick={increment}
            >
              <ChevronUp className="h-2 w-2" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-4 w-4"
              onClick={decrement}
            >
              <ChevronDown className="h-2 w-2" />
            </Button>
          </div>
        </div>
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

export type {
  DecimalTextBoxProps
}
