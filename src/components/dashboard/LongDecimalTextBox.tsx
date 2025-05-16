import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

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

  const handleSpinChange = (newValue: number[]) => {
    setValue(newValue[0]);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      {spin ? (
        <Slider
          id={label.toLowerCase()}
          min={0}
          max={100}
          step={spinStep}
          value={[value]}
          onValueChange={handleSpinChange}
        />
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
