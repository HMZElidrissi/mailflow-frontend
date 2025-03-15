import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Contact } from '@/types';
import { contactsApi } from '@/services/contactsApi';
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
import { Loader2 } from 'lucide-react';

interface AddTagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: Contact | null;
}

export function AddTagDialog({ open, onOpenChange, contact }: AddTagDialogProps) {
  const queryClient = useQueryClient();
  const [newTag, setNewTag] = useState('');

  const addTagMutation = useMutation({
    mutationFn: ({ contactId, tag }: { contactId: number; tag: string }) =>
      contactsApi.addTag(contactId, tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setNewTag('');
    },
  });

  const handleAddTag = () => {
    if (contact && newTag.trim()) {
      addTagMutation.mutate({
        contactId: contact.id,
        tag: newTag.trim(),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tag</DialogTitle>
          <DialogDescription>
            Add a new tag to {contact?.firstName} {contact?.lastName}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Enter tag name"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button onClick={handleAddTag} disabled={!newTag.trim() || addTagMutation.isPending}>
            {addTagMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add'}
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
