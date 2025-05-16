import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TemplateFilterDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [configuredFilter, setConfiguredFilter] = useState("Any")
  const [showKeywordFilters, setShowKeywordFilters] = useState(false)
  const [keywordMatchType, setKeywordMatchType] = useState("Match any word")
  const [showPlatformFilters, setShowPlatformFilters] = useState(false)
  const [platformMatchType, setPlatformMatchType] = useState("Include settings that match any of the selected platforms.")
  const [keywordText, setKeywordText] = useState("")
  const [titleChecked, setTitleChecked] = useState(true)
  const [helpChecked, setHelpChecked] = useState(true)
  const [commentChecked, setCommentChecked] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Template Filters</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Label */}
          <p className="text-sm text-muted-foreground">
            Select options below to enable and change or disable types of global filters that will be applied to the Administrative Templates nodes.
          </p>

          {/* Configured Filter Section */}
          <Card>
            <CardHeader>
              <CardTitle>Select the type of policy settings to display.</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="configured">Configured:</Label>
                <Select 
                  value={configuredFilter} 
                  onValueChange={setConfiguredFilter}
                >
                  <SelectTrigger id="configured" className="w-[180px]">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any">Any</SelectItem>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Keyword Filters Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="keyword" 
                  checked={showKeywordFilters} 
                  onCheckedChange={(checked) => setShowKeywordFilters(!!checked)}
                />
                <CardTitle>Enable Keyword Filters</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {showKeywordFilters && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="keywords">Filter for word(s):</Label>
                    <Input 
                      id="keywords" 
                      value={keywordText} 
                      onChange={(e) => setKeywordText(e.target.value)}
                    />
                    <Select
                      value={keywordMatchType} 
                      onValueChange={setKeywordMatchType}
                    >
                      <SelectTrigger className="w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Match any word">Match any word</SelectItem>
                        <SelectItem value="Match all words">Match all words</SelectItem>
                        <SelectItem value="Match exact">Match exact</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-4 pl-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="title" 
                        checked={titleChecked} 
                        onCheckedChange={(checked) => setTitleChecked(!!checked)}
                      />
                      <Label htmlFor="title">Policy Settings Title</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="help" 
                        checked={helpChecked} 
                        onCheckedChange={(checked) => setHelpChecked(!!checked)}
                      />
                      <Label htmlFor="help">Help Text</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="comment" 
                        checked={commentChecked} 
                        onCheckedChange={(checked) => setCommentChecked(!!checked)}
                      />
                      <Label htmlFor="comment">Comment</Label>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Platform Filters Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="platform" 
                  checked={showPlatformFilters} 
                  onCheckedChange={(checked) => setShowPlatformFilters(!!checked)}
                />
                <CardTitle>Enable Requirements Filters</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {showPlatformFilters && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="platform-mode">Select the desired platform and application filter(s):</Label>
                    <Select 
                      value={platformMatchType} 
                      onValueChange={setPlatformMatchType}
                    >
                      <SelectTrigger id="platform-mode" className="w-[300px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Include settings that match any of the selected platforms.">Include settings that match any of the selected platforms.</SelectItem>
                        <SelectItem value="Include settings that match all of the selected platforms.">Include settings that match all of the selected platforms.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pl-6 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Select All</Button>
                      <Button variant="outline" size="sm">Clear All</Button>
                    </div>
                    <div className="border rounded-md p-4 min-h-[50px]">
                      {/* Platform Tree View would go here */}
                      <p className="text-sm text-muted-foreground">Platform/Application Tree View</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={() => onOpenChange(false)}>OK</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
