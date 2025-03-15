import { Contact } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ContactForm } from './contact-form';

interface ContactDialogProps {
  open: boolean;
  mode: 'add' | 'edit';
  onOpenChange: (open: boolean) => void;
  contact?: Contact | null;
  onSuccess: () => void;
}

export function ContactDialog({
  open,
  mode,
  onOpenChange,
  contact,
  onSuccess,
}: ContactDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Contact' : 'Edit Contact'}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Enter the contact details below to create a new contact.'
              : 'Update the contact information below.'}
          </DialogDescription>
        </DialogHeader>
        {mode === 'add' ? (
          <ContactForm onSuccess={onSuccess} />
        ) : (
          contact && <ContactForm contact={contact} onSuccess={onSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
}
