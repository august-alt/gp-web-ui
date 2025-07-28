import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { useState, useEffect } from "react"

import { DataProvider } from "@/providers/DataProvider"
import { PreferencesDialog } from "@/components/dashboard/preferences/PreferencesDialog"
import { convertIndex, getBasename, adjustPolicyName } from './Helpers'
import type { IEnvironmentInterface } from "./IEnvironmentInterface"
import type { IDriveMapInterface } from "./IDriveMapInterface"
import type { IFileInterface } from "./IFileInterface"
import type { IFolderInterface } from "./IFolderInterface"
import type { IShortcutInterface } from "./IShortcutInterface"
import type { IRegistryInterface } from "./IRegistryInterface"
import type { IIniFileInterface } from "./IIniFileInterface"
import type { IShareInterface } from "./IShareInterface"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

interface Item {
  id: string,
  data: any
};

export function PreferencesTableWidget({
  help = '',
  policyName = '',
  policyType = 0,
}: {
  help?: string
  policyName?: string
  policyType?: number
}) {
  const [items, setItems] = useState<Item[]>([])
  const [currentItem, setCurrentItem] = useState<any>()
  const [isOpen, setIsOpen] = useState(false)

  const getHeadersForPolicyName = (policyName: string): string[] => {
    switch(policyName.toLowerCase())
    {
      case "environment":
        return ["Name", "Order", "Action", "Value", "User"];
      case "drive maps":
        return ["Name", "Order", "Action", "Path", "Reconnect"];
      case "files":
        return ["Name", "Order", "Action", "Source", "Target"];
      case "folders":
        return ["Name", "Order", "Action", "Path"];
      case "ini files":
        return ["Name", "Order", "Action", "Path", "Section", "Property", "Value"];
      case "network shares":
        return ["Name", "Order", "Action", "Path", "User Limit", "ABE"];
      case "registry":
        return ["Name", "Order", "Action", "Hive", "Key"];
      case "shortcuts":
        return ["Name", "Order", "Action", "Target"];
      default:
        return [];
    }
  };

  const getCellForPolicyItem = (policyName: string, item: any, index: number): string[] => {
    switch(policyName.toLowerCase())
    {
      case "environment":
        const ev = item as IEnvironmentInterface;
        return [ev?.name || "", index.toString(), convertIndex(ev?.action || 0), ev?.value || "", ev?.user ? "True" : "False"];
      case "drive maps":
        const dm = item as IDriveMapInterface;
        return [getBasename(dm.path), index.toString(), convertIndex(dm?.action || 0), dm?.path || "", dm?.persistent ? "True" : "False"];
      case "files":
        const fl = item as IFileInterface;
        console.log("File", fl);
        return [getBasename(fl.fromPath), index.toString(), convertIndex(fl?.action || 0), fl?.fromPath || "", fl?.targetPath || ""];
      case "folders":
        const fo = item as IFolderInterface;
        return [getBasename(fo.fromPath), index.toString(), convertIndex(fo?.action || 0), fo?.fromPath || ""];
      case "ini files":
        const il = item as IIniFileInterface;
        return [getBasename(il.path), index.toString(), convertIndex(il?.action || 0), il?.path || "", il?.section || "", il?.property || "", il?.value || ""];
      case "network shares":
        const ns = item as IShareInterface;
        return [ns?.name || "", index.toString(), convertIndex(ns?.action || 0), ns?.path || "", ns?.userLimit?.toString() || "Unlimited", ns?.accessBasedEnumeration ? "True" : "False"];
      case "registry":
        const re = item as IRegistryInterface;
        return [re?.name || "", index.toString(), convertIndex(re?.action || 0), re?.hive || "", re?.key || ""];
      case "shortcuts":
        const sh = item as IShortcutInterface;
        return [getBasename(sh.shortcutPath), index.toString(), convertIndex(sh?.action || 0), sh?.targetPath || ""];
      default:
        return [];
    }
  };

  useEffect(() => {
    const dataProvider = new DataProvider();

    const currentPolicyName = adjustPolicyName(policyName);

    dataProvider.getList(`gpservice.basealt.ru.${currentPolicyName}.getAll`, policyType)
      .then((data: any) => { setItems(data.items.result); console.log(data.items.result); });
  }, [policyName, policyType]);

  const handleRowClick = (item: Item) => {
    setCurrentItem(item);
    setIsOpen(true);
  };

  const openHelpUrl = () => {
    window.open("https://www.altlinux.org/%D0%93%D1%80%D1%83%D0%BF%D0%BF%D0%BE%D0%B2%D1%8B%D0%B5_%D0%BF%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B8/GPUI", "_blank");
  }

  const removeItem = () => {
    const dataProvider = new DataProvider();

    const currentPolicyName = adjustPolicyName(policyName);

    dataProvider.delete(`gpservice.basealt.ru.${currentPolicyName}.delete_`, policyType, { id: currentItem.id })
      .then(() => {});

    dataProvider.getList(`gpservice.basealt.ru.${currentPolicyName}.getAll`, policyType)
      .then((data: any) => { setItems(data.items.result); console.log(data.items.result); });
  }

  const editItem = () => {
    setIsOpen(true);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Policy Name Frame */}
      <div className="h-9 border rounded-sm p-2 mb-2 mt-2 mr-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Policy Name: {policyName}
        </Label>
      </div>

      {/* Splitter Container */}
      <div className="flex flex-1 gap-2 mb-2">
        {/* Left Content Panel */}
        <div className="flex-1 min-w-56">
          <ContextMenu>
            <ContextMenuTrigger>
              <Table>
                <TableHeader>
                  <TableRow>
                    {getHeadersForPolicyName(policyName).map((header, index) => (
                      <TableHead key={index}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <TableRow
                        key={index}
                        onClick={() => handleRowClick(item)}
                        onPointerOver={() => setCurrentItem(item) }
                      >

                        {getCellForPolicyItem(policyName, item.data, index).map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>{cell}</TableCell>
                        ))}

                      </TableRow>

                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={1} className="text-center text-muted-foreground">
                        No preferences available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
              <ContextMenuItem inset>
                New
              </ContextMenuItem>
              <ContextMenuItem inset onClick={editItem}>
                Edit Item
              </ContextMenuItem>
              <ContextMenuItem inset onClick={removeItem}>
                Remove Item
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem inset onClick={openHelpUrl}>
                Help
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>

        {/* Right Help Panel */}
        <div className="w-52 flex-shrink-0">
          <div className="border rounded-sm p-2 h-full flex flex-col">
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Help:
              </Label>
              <Textarea
                value={help}
                readOnly
                className="min-h-[210px] border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              />
            </div>
          </div>
        </div>
      </div>
    <PreferencesDialog currentItem={currentItem} policyType={policyType} preferencesType={policyName} open={isOpen} onOpenChange={setIsOpen} />
    </div>
  )
}
