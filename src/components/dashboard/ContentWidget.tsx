import { Label } from "@/components/ui/label"

import { CheckBox,  type CheckBoxProps } from "@/components/dashboard/CheckBox";
import { ComboBox, type ComboBoxProps } from "@/components/dashboard/ComboBox";
import { DecimalTextBox, type DecimalTextBoxProps } from "@/components/dashboard/DecimalTextBox";
import { DropdownList, type DropdownListProps } from "@/components/dashboard/DropdownList"
import { ListBox, type ListBoxProps } from "@/components/dashboard/ListBox";
import { LongDecimalTextBox, type LongDecimalTextBoxProps } from "@/components/dashboard/LongDecimalTextBox";
import { MultiTextBox, type MultiTextBoxProps } from "@/components/dashboard/MultiTextBox";
import { TextBox, type TextBoxProps } from "@/components/dashboard/TextBox";


interface PropsType {
  type: string;
}

interface LabelProps {
  content: string;
}

type PolicyWidgetProps = 
  ( CheckBoxProps 
  | ComboBoxProps
  | DecimalTextBoxProps
  | DropdownListProps
  | LabelProps
  | ListBoxProps
  | LongDecimalTextBoxProps
  | MultiTextBoxProps
  | TextBoxProps
  ) 
  & PropsType;

interface ContentWidgetProps {
  widgets: PolicyWidgetProps[];
}

export const ContentWidget = ({ widgets }: ContentWidgetProps) => {
return (
  <div className="space-y-2">
    {widgets.map((widget, index) => {
      switch (widget.type) {
        case 'CheckBox':
          return <CheckBox key={index} {...widget as CheckBoxProps} />;
        case 'ComboBox':
          return <ComboBox key={index} {...widget as ComboBoxProps} />;
        case 'DecimalTextBox':
          return <DecimalTextBox key={index} {...widget as DecimalTextBoxProps} />;
        case 'DropdownList':
          return <DropdownList key={index} {...widget as DropdownListProps} />;
        case 'Text':
          return <Label key={index} {...widget as LabelProps} />;
        case 'ListBox':
          return <ListBox key={index} {...widget as ListBoxProps} />;
        case 'LongDecimalTextBox':
          return <LongDecimalTextBox key={index} {...widget as LongDecimalTextBoxProps} />;
        case 'MultiTextBox':
          return <MultiTextBox key={index} {...widget as MultiTextBoxProps} />;
        case 'TextBox':
          return <TextBox key={index} {...widget as TextBoxProps} />;
        default:
          return null;
      }
    })}
  </div>
);
};

export type {
  ContentWidgetProps,
  PolicyWidgetProps
}