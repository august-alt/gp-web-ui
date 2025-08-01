import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react";
import { ScriptsDialog } from "./ScriptsDialog";

interface ScriptItem {
  name: string;
  policyType: number
}

interface ScriptsTableWidgetProps {
  items?: ScriptItem[];
}

export function ScriptsTableWidget({ items = [] }: ScriptsTableWidgetProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedScript, setSelectedScript] = useState<ScriptItem | null>(null);

  const handleRowClick = (item: ScriptItem) => {
    setSelectedScript(item);
    setIsDialogOpen(true);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Script Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length > 0 ? (
            items.map((item, index) => (
              <TableRow
                key={index}
                onClick={() => handleRowClick(item)}
              >
                <TableCell className="font-medium">{item.name}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={1} className="text-center text-muted-foreground">
                No scripts available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ScriptsDialog
        open={isDialogOpen}
        policyType={selectedScript?.policyType || 0}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
             setSelectedScript(null);
          }
        }}
      />
    </div>
  )
}
