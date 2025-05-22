import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export const CommonWidget = () => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="stopOnError" />
            <Label htmlFor="stopOnError" className="text-sm">
              Stop processing items in this extension if an error occurs
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="userContext" />
            <Label htmlFor="userContext" className="text-sm">
              Run in logged-on user's security context (user policy option)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="removeThis" />
            <Label htmlFor="removeThis" className="text-sm">
              Remove this item when it is no longer applied
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="applyOnce" disabled />
            <Label htmlFor="applyOnce" className="text-sm">
              Apply once and do not reapply
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="itemLevel" disabled />
            <Label htmlFor="itemLevel" className="text-sm">
              Item-level targeting
            </Label>
            <Button variant="outline" size="sm" disabled>
              Targeting...
            </Button>
          </div>
        </div>
        <div className="mt-6">
          <Label htmlFor="description" className="mb-2 block">
            Description:
          </Label>
          <Textarea id="description" placeholder="Enter description here" />
        </div>
      </CardContent>
    </Card>
  );
};
