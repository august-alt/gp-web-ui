import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar"
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

import { AdministrativeTemplatesWidget } from "@/components/dashboard/AdministrativeTemplatesWidget"
import { TemplateFilterDialog } from "@/components/dashboard/TemplateFilterDialog"
import { AboutDialog } from "@/components/dashboard/AboutDialog"

import { TreeView, type TreeDataItem } from "@/components/ui/tree-view"

import { type ContentWidgetProps } from "@/components/dashboard/ContentWidget"

import { Folder, FolderInput, File, Search } from 'lucide-react';

interface GroupPolicyItem {
  type: number
  help?: string
  supportedOnText?: string
  policyWidget?: ContentWidgetProps
};

type Item = TreeDataItem & GroupPolicyItem;

export default function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isTemplateFilterDialogOpen, setIsTemplateFilterDialogOpen] = useState(false)
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false)

  const [treeData, setTreeData] = useState<TreeDataItem[]>([])
  const [selectedNode, setSelectedNode] = useState<Item | null>(null)

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("http://localhost:5173/api", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" } ,
          body: JSON.stringify({ jsonrpc: "2.0", method: "gpservice.basealt.ru.getGroupPolicies", params: [], id: 1 })
        });

        if (!response.ok) throw new Error("Failed to fetch policies");

        const result = await response.json();

        // Process tree data to assign icons based on type
        const getIconByType = (type: number) => {
          if (type === 0) return Folder;
          if (type === 1) return File;
          return null;
        };

        const getOpenIconByType = (type: number) => {
          if (type === 0) return FolderInput;
          return null;
        };
        
        const processTreeData = (data: Item[]): Item[] => {
          return data.map(item => ({
            ...item,
            icon: getIconByType(item.type),
            openIcon: getOpenIconByType(item.type),
            children: item.children ? processTreeData(item.children as Item[]) : undefined
          }));
        };
        
        setTreeData(processTreeData([result.result]));
      } catch (error) {
        console.error("Policy fetch error:", error);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Menu Bar */}
      <Menubar className="border-b">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Open Policy Directory <span className="ml-2 text-xs text-muted-foreground">(Ctrl+O)</span></MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Exit <span className="ml-2 text-xs text-muted-foreground">(Ctrl+Q)</span></MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Language</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => setIsTemplateFilterDialogOpen(true)}>Options</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Manual</MenubarItem>
            <MenubarItem onClick={() => setIsAboutDialogOpen(true)}>About</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="p-2 space-y-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8"
              />
            </div>
            <div className="border rounded-md h-[calc(100vh-4rem)] overflow-auto">
            <TreeView
              data={treeData}
              title="Group Policies"
              onSelectChange={(item) => setSelectedNode(item as Item || null)}
            />
            </div>
          </div>
      </ResizablePanel>
      <ResizableHandle className="right-1"/>
      <ResizablePanel defaultSize={80}>
          <AdministrativeTemplatesWidget
            help={selectedNode?.help || ''}
            policyName={selectedNode?.name || ''}
            supportedOnText={selectedNode?.supportedOnText || ''}
            presentation={selectedNode?.policyWidget || { widgets: [] }}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      <TemplateFilterDialog open={isTemplateFilterDialogOpen} onOpenChange={setIsTemplateFilterDialogOpen} />
      <AboutDialog open={isAboutDialogOpen} onOpenChange={() => setIsAboutDialogOpen(false)} />
      {/* Status Bar */}
      <div className="border-t p-2 text-sm text-muted-foreground">
        Ready
      </div>
    </div>
  )
}
