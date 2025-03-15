import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ContactForm } from './contact-form';

interface AddContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddContactDialog({ open, onOpenChange, onSuccess }: AddContactDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Enter the contact details below to create a new contact.
          </DialogDescription>
        </DialogHeader>
        <ContactForm onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}
