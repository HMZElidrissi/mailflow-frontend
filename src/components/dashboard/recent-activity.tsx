import { Email } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getStatusBadge } from '@/lib/utils.ts';

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
          <div className="ml-auto">
            <Badge variant={getStatusBadge(email.status)}>{email.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
