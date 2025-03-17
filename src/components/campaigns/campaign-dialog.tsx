import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CampaignForm } from './campaign-form';
import { Campaign } from '@/types';

interface CampaignDialogProps {
  open: boolean;
  mode: 'add' | 'edit';
  onOpenChange: (open: boolean) => void;
  campaign?: Campaign | null;
  onSuccess: () => void;
}

export function CampaignDialog({
  open,
  mode,
  onOpenChange,
  campaign,
  onSuccess,
}: CampaignDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Campaign' : 'Edit Campaign'}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Enter the campaign details below to create a new campaign.'
              : 'Update the campaign information below.'}
          </DialogDescription>
        </DialogHeader>
        {mode === 'add' ? (
          <CampaignForm onSuccess={onSuccess} />
        ) : (
          campaign && <CampaignForm campaign={campaign} onSuccess={onSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
}
