import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { templatesApi } from '@/services/templatesApi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { EmailTemplate } from '@/types';

interface ViewTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: EmailTemplate | null;
}

export function ViewTemplateDialog({ open, onOpenChange, template }: ViewTemplateDialogProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [previewVariables, setPreviewVariables] = useState<Record<string, string>>({});
  const [renderedSubject, setRenderedSubject] = useState('');
  const [renderedContent, setRenderedContent] = useState('');

  // For rendering preview
  const renderMutation = useMutation({
    mutationFn: async () => {
      if (!template) return null;
      return templatesApi.renderTemplate(template.id, previewVariables);
    },
    onSuccess: (data) => {
      if (data) {
        setRenderedSubject(data.data.subject);
        setRenderedContent(data.data.content);
      }
    },
  });

  // Initialize preview variables from template variables
  useEffect(() => {
    if (template && template.variables) {
      setPreviewVariables({ ...template.variables });
      // Reset rendered content when template changes
      setRenderedSubject('');
      setRenderedContent('');
    }
  }, [template]);

  // Update a variable's value
  const updateVariableValue = (key: string, value: string) => {
    setPreviewVariables((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRenderPreview = () => {
    renderMutation.mutate();
  };

  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{template.name}</DialogTitle>
          <DialogDescription>Email template details and preview</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Name</p>
                <p>{template.name}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Created</p>
                <p>{new Date(template.createdAt).toLocaleString()}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Last Updated</p>
                <p>{new Date(template.updatedAt).toLocaleString()}</p>
              </div>

              {template.description && (
                <div className="col-span-2 space-y-1">
                  <p className="text-sm font-medium">Description</p>
                  <p>{template.description}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Variables</p>
              {Object.keys(template.variables || {}).length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No variables defined for this template.
                </p>
              ) : (
                <div className="divide-y rounded-md border">
                  {Object.entries(template.variables || {}).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-2">
                      <div className="flex-1 font-mono text-sm">{'{{' + key + '}}'}</div>
                      <div className="flex-1 text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="space-y-2">
              <Label>Subject</Label>
              <div className="rounded-md border p-2">{template.subject}</div>
            </div>

            <div className="space-y-2">
              <Label>Email Content</Label>
              <div className="whitespace-pre-wrap rounded-md border p-4">{template.content}</div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="space-y-2">
              <Label>Customize Variables</Label>
              <div className="space-y-2 rounded-md border p-4">
                {Object.keys(previewVariables).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No variables to customize.</p>
                ) : (
                  <>
                    {Object.entries(previewVariables).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-5 items-center gap-2">
                        <Label htmlFor={`var-${key}`} className="col-span-2 font-mono text-sm">
                          {'{{' + key + '}}'}
                        </Label>
                        <Input
                          id={`var-${key}`}
                          value={value}
                          onChange={(e) => updateVariableValue(key, e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    ))}

                    <Button
                      onClick={handleRenderPreview}
                      disabled={renderMutation.isPending}
                      className="mt-2"
                    >
                      {renderMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Rendering...
                        </>
                      ) : (
                        'Render Preview'
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>

            {(renderedSubject || renderedContent) && (
              <div className="space-y-4 rounded-md border p-4">
                <div className="space-y-2">
                  <Label>Rendered Subject</Label>
                  <p className="rounded-md bg-muted p-2">{renderedSubject}</p>
                </div>

                <div className="space-y-2">
                  <Label>Rendered Content</Label>
                  <div className="whitespace-pre-wrap rounded-md bg-muted p-4">
                    {renderedContent}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
