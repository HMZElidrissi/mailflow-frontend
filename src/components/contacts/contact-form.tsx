import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { contactsApi } from '@/services/contactsApi';
import { Contact } from '@/types';
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  tags: z.array(z.string()).default([]),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  contact?: Contact;
  onSuccess: () => void;
}

export function ContactForm({ contact, onSuccess }: ContactFormProps) {
  const queryClient = useQueryClient();
  const isEditing = !!contact;

  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: contact?.email || '',
      firstName: contact?.firstName || '',
      lastName: contact?.lastName || '',
      tags: contact?.tags || [],
    },
  });

  // Create or update mutation
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      if (isEditing && contact) {
        return contactsApi.update(contact.id, values);
      } else {
        return contactsApi.create(values);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      onSuccess();
    },
  });

  // Tag handling
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (!newTag.trim()) return;

    const currentTags = form.getValues('tags') || [];
    if (!currentTags.includes(newTag.trim().toLowerCase())) {
      form.setValue('tags', [...currentTags, newTag.trim().toLowerCase()]);
    }
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = form.getValues('tags') || [];
    form.setValue(
      'tags',
      currentTags.filter(tag => tag !== tagToRemove)
    );
  };

  // Form submission
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="contact@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormItem>
          <FormLabel>Tags</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Add a tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddTag}
              disabled={!newTag.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {form.watch('tags').map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                />
              </Badge>
            ))}
            {(!form.watch('tags') || form.watch('tags').length === 0) && (
              <span className="text-sm text-muted-foreground">
                No tags added yet
              </span>
            )}
          </div>
          <FormMessage />
        </FormItem>

        <div className="flex justify-end space-x-2 pt-2">
          <Button
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditing ? 'Update Contact' : 'Create Contact'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}