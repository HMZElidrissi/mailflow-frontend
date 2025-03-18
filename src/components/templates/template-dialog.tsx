import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TemplateForm } from './template-form';
import { EmailTemplate } from '@/types';

interface TemplateDialogProps {
  open: boolean;
  mode: 'add' | 'edit';
  onOpenChange: (open: boolean) => void;
  template?: EmailTemplate | null;
  onSuccess: () => void;
}

export function TemplateDialog({
  open,
  mode,
  onOpenChange,
  template,
  onSuccess,
}: TemplateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Template' : 'Edit Template'}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Create a new email template with variables that can be used in your campaigns.'
              : 'Update the email template information below.'}
          </DialogDescription>
        </DialogHeader>
        <TemplateForm template={template} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}
