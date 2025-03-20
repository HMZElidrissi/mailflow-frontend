import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Send } from 'lucide-react';

interface EmailDashboardSearchProps {
  onSendEmail: () => void;
}

export function EmailDashboardSearch({ onSendEmail }: EmailDashboardSearchProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search emails..." className="w-[200px] pl-8" />
      </div>
      <Button onClick={onSendEmail}>
        <Send className="mr-2 h-4 w-4" />
        Send Email
      </Button>
    </div>
  );
}
