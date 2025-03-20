import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { emailsApi } from '@/services/emailsApi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { contactsApi } from '@/services/contactsApi.ts';
import { campaignsApi } from '@/services/campaignsApi.ts';
import { templatesApi } from '@/services/templatesApi';

const sendEmailSchema = z.object({
  campaignId: z.coerce.number().min(1, 'Please select a campaign'),
  contactId: z.coerce.number().min(1, 'Please select a contact'),
  templateId: z.coerce.number().min(1, 'Please select a template'),
});

type FormValues = z.infer<typeof sendEmailSchema>;

interface SendEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function SendEmailDialog({ open, onOpenChange, onSuccess }: SendEmailDialogProps) {
  const queryClient = useQueryClient();

  // Replace mock data with API calls
  const { data: campaigns, isLoading: campaignsLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const response = await campaignsApi.getAll();
      return response.data.content;
    },
    enabled: open,
  });

  const { data: contacts, isLoading: contactsLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await contactsApi.getAll();
      return response.data.content.map((contact) => ({
        id: contact.id,
        email: contact.email,
        name: `${contact.firstName} ${contact.lastName}`,
      }));
    },
    enabled: open,
  });

  const { data: templates, isLoading: templatesLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const response = await templatesApi.getAll();
      return response.data.content;
    },
    enabled: open,
  });

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(sendEmailSchema),
    defaultValues: {
      campaignId: 0,
      contactId: 0,
      templateId: 0,
    },
  });

  // Send email mutation
  const sendEmailMutation = useMutation({
    mutationFn: (values: FormValues) => {
      return emailsApi.sendEmail(values.campaignId, values.contactId, values.templateId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      form.reset();
      onOpenChange(false);
      if (onSuccess) onSuccess();
    },
  });

  const onSubmit = (values: FormValues) => {
    sendEmailMutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Email</DialogTitle>
          <DialogDescription>
            Manually send an email to a contact using a specific template.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="campaignId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value ? field.value.toString() : undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a campaign" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {campaignsLoading ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      ) : (
                        campaigns?.map((campaign) => (
                          <SelectItem key={campaign.id} value={campaign.id.toString()}>
                            {campaign.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value ? field.value.toString() : undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a contact" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {contactsLoading ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      ) : (
                        contacts?.map((contact) => (
                          <SelectItem key={contact.id} value={contact.id.toString()}>
                            {contact.name} ({contact.email})
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="templateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value ? field.value.toString() : undefined}
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
                      ) : (
                        templates?.map((template) => (
                          <SelectItem key={template.id} value={template.id.toString()}>
                            {template.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  sendEmailMutation.isPending ||
                  campaignsLoading ||
                  contactsLoading ||
                  templatesLoading
                }
              >
                {sendEmailMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Email'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
