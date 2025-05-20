import React from 'react';
import { ListBox } from '@/components/dashboard/ListBox';

export const ScriptsContentWidget: React.FC = () => {
  return (
    <div className="grid gap-y-6">
      <ListBox
        label="Scripts"
        onSave={(children) => console.log('Saved children:', children)}
      >
      </ListBox>
    </div>
  );
};
