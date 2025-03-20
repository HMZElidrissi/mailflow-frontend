import { Email, EmailStatus } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface RecentEmailActivityProps {
  emails: Email[];
  onViewEmail: (email: Email) => void;
}

export function RecentEmailActivity({ emails, onViewEmail }: RecentEmailActivityProps) {
  if (emails.length === 0) {
    return (
      <div className="py-6 text-center text-muted-foreground">
        No recent email activity to display.
      </div>
    );
  }

  // Function to get initials from email
  const getInitials = (email: string) => {
    const parts = email.split('@')[0].split('.');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  // Function to get status badge
  const getStatusBadge = (status: EmailStatus) => {
    switch (status) {
      case EmailStatus.SENT:
        return <Badge variant="outline">Sent</Badge>;
      case EmailStatus.DELIVERED:
        return <Badge variant="secondary">Delivered</Badge>;
      case EmailStatus.OPENED:
        return <Badge variant="default">Opened</Badge>;
      case EmailStatus.CLICKED:
        return <Badge className="bg-green-500">Clicked</Badge>;
      case EmailStatus.FAILED:
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="w-full space-y-8">
      {emails.map((email) => (
        <div
          key={email.id}
          className="flex cursor-pointer items-center"
          onClick={() => onViewEmail(email)}
        >
          <Avatar className="h-9 w-9">
            <AvatarFallback>{getInitials(email.recipientEmail)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="line-clamp-1 text-sm font-medium leading-none">{email.subject}</p>
            <p className="text-sm text-muted-foreground">{email.recipientEmail}</p>
          </div>
          <div className="ml-auto">{getStatusBadge(email.status)}</div>
        </div>
      ))}
    </div>
  );
}
