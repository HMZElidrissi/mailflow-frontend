import { Email } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getStatusBadge } from '@/lib/utils.ts';

interface EmailsTableProps {
  emails: Email[];
  onViewEmail: (email: Email) => void;
}

export function EmailsTable({ emails, onViewEmail }: EmailsTableProps) {
  if (emails.length === 0) {
    return <div className="py-12 text-center text-muted-foreground">No emails found.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emails</CardTitle>
        <CardDescription>{emails.length} emails found</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipient</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails.map((email) => (
              <TableRow key={email.id}>
                <TableCell className="font-medium">{email.recipientEmail}</TableCell>
                <TableCell>{email.subject}</TableCell>
                <TableCell>Campaign #{email.campaignId}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadge(email.status)}>{email.status}</Badge>
                </TableCell>
                <TableCell>
                  {email.sentAt ? new Date(email.sentAt).toLocaleString() : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => onViewEmail(email)}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
