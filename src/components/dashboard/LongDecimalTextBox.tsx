import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronUp, ChevronDown } from "lucide-react";

interface LongDecimalTextBoxProps {
  defaultValue?: number;
  spin?: boolean;
  spinStep?: number;
  label: string;
}

export const LongDecimalTextBox: React.FC<LongDecimalTextBoxProps> = ({
  defaultValue = 1,
  spin = true,
  spinStep = 1,
  label,
}) => {
  const [value, setValue] = useState(defaultValue);

  const increment = () => {
    setValue(prev => Math.min(prev + spinStep, 100));
  };

  const decrement = () => {
    setValue(prev => Math.max(prev - spinStep, 0));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
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
          id={label.toLowerCase()}
          type="number"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
        />
      )}
    </div>
  );
};

export type {
  LongDecimalTextBoxProps
}
