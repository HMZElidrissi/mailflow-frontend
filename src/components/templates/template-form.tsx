import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { templatesApi } from '@/services/templatesApi';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmailTemplate, EmailTemplateRequest } from '@/types';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Template name is required' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface TemplateFormProps {
  template?: EmailTemplate | null;
  onSuccess: () => void;
}

export function TemplateForm({ template, onSuccess }: TemplateFormProps) {
  const queryClient = useQueryClient();
  const isEditing = !!template;
  const [activeTab, setActiveTab] = useState('content');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [newVarName, setNewVarName] = useState('');
  const [newVarValue, setNewVarValue] = useState('');

  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: template?.name || '',
      subject: template?.subject || '',
      content: template?.content || '',
      description: template?.description || '',
    },
  });

  // Create or update mutation
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const templateRequest: EmailTemplateRequest = {
        ...values,
        variables: variables,
      };

      if (isEditing && template) {
        return templatesApi.update(template.id, templateRequest);
      } else {
        return templatesApi.create(templateRequest);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      onSuccess();
    },
  });

  // Update form and variables when template changes
  useEffect(() => {
    if (template) {
      form.reset({
        name: template.name,
        subject: template.subject,
        content: template.content,
        description: template.description || '',
      });
      setVariables(template.variables || {});
    }
  }, [template, form]);

  // Form submission
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  // Add a new variable
  const addVariable = () => {
    if (newVarName.trim() !== '') {
      setVariables((prev) => ({
        ...prev,
        [newVarName.trim()]: newVarValue.trim(),
      }));
      setNewVarName('');
      setNewVarValue('');
    }
  };

  // Remove a variable
  const removeVariable = (key: string) => {
    setVariables((prev) => {
      const newVariables = { ...prev };
      delete newVariables[key];
      return newVariables;
    });
  };

  // Update a variable's value
  const updateVariableValue = (key: string, value: string) => {
    setVariables((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template Name</FormLabel>
              <FormControl>
                <Input placeholder="Welcome Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Welcome to {{company_name}}" {...field} />
              </FormControl>
              <FormDescription>
                {`Use {{variable_name}} syntax to include variables`}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="variables">Variables</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Hello {{first_name}}, Welcome to our service!"
                      className="min-h-[300px] font-mono"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {`Use {{variable_name}} syntax to include variables`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="variables" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-end space-x-2">
                <div className="flex-1 space-y-2">
                  <FormLabel htmlFor="varName">Variable Name</FormLabel>
                  <Input
                    id="varName"
                    placeholder="first_name"
                    value={newVarName}
                    onChange={(e) => setNewVarName(e.target.value)}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <FormLabel htmlFor="varValue">Default Value</FormLabel>
                  <Input
                    id="varValue"
                    placeholder="Friend"
                    value={newVarValue}
                    onChange={(e) => setNewVarValue(e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  onClick={addVariable}
                  className="mb-[2px]"
                  disabled={newVarName.trim() === ''}
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>

              <div className="rounded-md border">
                {Object.keys(variables).length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No variables defined yet. Add variables to make your template dynamic.
                  </div>
                ) : (
                  <div className="divide-y">
                    {Object.entries(variables).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-2">
                        <div className="flex-1 font-mono text-sm">{'{{' + key + '}}'}</div>
                        <div className="flex flex-1 items-center space-x-2">
                          <Input
                            value={value}
                            onChange={(e) => updateVariableValue(key, e.target.value)}
                            className="h-8"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeVariable(key)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="description">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="This template is used for welcoming new users..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add a description to help your team understand the purpose of this template
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-2">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : isEditing ? (
              'Update Template'
            ) : (
              'Create Template'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
