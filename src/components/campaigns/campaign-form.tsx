import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { campaignsApi } from '@/services/campaignsApi';
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
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Campaign } from '@/types';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Campaign name is required' }),
  triggerTag: z.string().min(1, { message: 'Trigger tag is required' }),
  templateId: z.coerce.number().min(1, { message: 'Please select a template' }),
  active: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface CampaignFormProps {
  campaign?: Campaign;
  onSuccess: () => void;
}

export function CampaignForm({ campaign, onSuccess }: CampaignFormProps) {
  const queryClient = useQueryClient();
  const isEditing = !!campaign;

  const {
    data: templatesResponse,
    isLoading: templatesLoading,
    error: templatesError,
  } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const response = await templatesApi.getAll();
      return response.data;
    },
  });

  const templates = (templatesResponse?.content || []).filter(
    (template) => template && template.id && typeof template.id !== 'undefined'
  );

  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: campaign?.name || '',
      triggerTag: campaign?.triggerTag || '',
      templateId: campaign?.templateId || 0,
      active: campaign?.active || false,
    },
  });

  // Create or update mutation
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      if (isEditing && campaign) {
        return campaignsApi.update(campaign.id, values);
      } else {
        return campaignsApi.create(values);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      onSuccess();
    },
  });

  // Update form when campaign changes
  useEffect(() => {
    if (campaign) {
      form.reset({
        name: campaign.name,
        triggerTag: campaign.triggerTag,
        templateId: campaign.templateId,
        active: campaign.active,
      });
    }
  }, [campaign, form]);

  // Form submission
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Name</FormLabel>
              <FormControl>
                <Input placeholder="Monthly Newsletter" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="triggerTag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trigger Tag</FormLabel>
              <FormControl>
                <Input placeholder="newsletter-subscriber" {...field} />
              </FormControl>
              <FormDescription>
                This campaign will be triggered when a contact is tagged with this tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="templateId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Template</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value ? field.value.toString() : undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {templatesLoading ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : templatesError ? (
                    <div className="p-2 text-sm text-destructive">Failed to load templates</div>
                  ) : templates.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground">No templates available</div>
                  ) : (
                    templates.map((template) =>
                      template && template.id ? (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name}
                        </SelectItem>
                      ) : null
                    )
                  )}
                </SelectContent>
              </Select>
              {templatesError && (
                <p className="text-sm text-destructive">
                  Unable to load templates. Please try again later.
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active</FormLabel>
                <FormDescription>
                  When active, the campaign will automatically send emails when the trigger
                  conditions are met.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-2">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : isEditing ? (
              'Update Campaign'
            ) : (
              'Create Campaign'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
