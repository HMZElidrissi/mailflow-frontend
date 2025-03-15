import { Contact } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ContactForm } from './contact-form';

interface EditContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: Contact | null;
  onSuccess: () => void;
}

export function EditContactDialog({
  open,
  onOpenChange,
  contact,
  onSuccess,
}: EditContactDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogDescription>Update the contact information below.</DialogDescription>
        </DialogHeader>
        {contact && <ContactForm contact={contact} onSuccess={onSuccess} />}
      </DialogContent>
    </Dialog>
  );
}
