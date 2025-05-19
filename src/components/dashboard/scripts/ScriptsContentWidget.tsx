import React from 'react';
import { ListBox } from '@/components/dashboard/ListBox';

export const ScriptsContentWidget: React.FC = () => {
  return (
    <div className="grid gap-y-6">
      <ListBox label="Scripts">
        <div className="space-y-1">
          <div className="p-2 rounded hover:bg-muted">Script 1</div>
          <div className="p-2 rounded hover:bg-muted">Script 2</div>
          <div className="p-2 rounded hover:bg-muted">Script 3</div>
        </div>
      </ListBox>
    </div>
  );
};
