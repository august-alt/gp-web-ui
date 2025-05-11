import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar"
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Input } from "@/components/ui/input"
import { useState } from "react"

import { AdministrativeTemplatesWidget } from "@/components/dashboard/AdministrativeTemplatesWidget"
import { TemplateFilterDialog } from "@/components/dashboard/TemplateFilterDialog"
import { AboutDialog } from "@/components/dashboard/AboutDialog"

import TreeView from "@/components/ui/tree-view"

const data = [
  {
    id: "1",
    name: "[Local Group Policy]",
    type: "folder",
    children: [
      {
        id: "1.1",
        name: "Machine",
        type: "folder",
        children: [
          {
            id: "1.1.1",
            name: "Administrative Templates",
            type: "department",
            children: [
              { id: "1.1.1.1", name: "Test Template 1", type: "item" },
              { id: "1.1.1.2", name: "Test Template 2", type: "item" },
            ],
          },
        ],
      },
      {
        id: "1.2",
        name: "User",
        type: "folder",
        children: [
          {
            id: "1.2.1",
            name: "Administrative Templates",
            type: "department",
            children: [
              { id: "1.2.1.2", name: "Test Template 2", type: "item" },
              { id: "1.2.1.1", name: "Test Template 1", type: "item" },
            ],
          },
        ],
      },
    ],
  },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isTemplateFilterDialogOpen, setIsTemplateFilterDialogOpen] = useState(false)
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false)
  
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
            <Input 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <div className="border rounded-md h-[calc(100vh-4rem)] overflow-auto">
            <TreeView
              data={data}
              title="Group Policies"
              showCheckboxes={false}
              showExpandAll={false}
            />
            </div>
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={80}>
          <AdministrativeTemplatesWidget></AdministrativeTemplatesWidget>
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
