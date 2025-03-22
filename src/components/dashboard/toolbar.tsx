import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface DashboardToolbarProps {
  onSendEmail: () => void;
}

export function DashboardToolbar({ onSendEmail }: DashboardToolbarProps) {
  return (
    <Button onClick={onSendEmail}>
      <Send className="mr-2 h-4 w-4" />
      Send Email
    </Button>
  );
}
