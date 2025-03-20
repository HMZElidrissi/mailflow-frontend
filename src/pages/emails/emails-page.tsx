import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { emailsApi } from '@/services/emailsApi';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, RotateCcw } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/shell';
import { EmailsTable } from '@/components/emails/emails-table';
import { EmailDetailDialog } from '@/components/emails/email-detail-dialog';
import { Email } from '@/types';

export default function EmailsPage() {
  const [viewingEmail, setViewingEmail] = useState<Email | null>(null);

  // Fetch recent emails
  const {
    data: emails,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['emails', 'recent'],
    queryFn: async () => {
      const response = await emailsApi.getRecent();
      return response.data;
    },
  });

  const handleRetryFailed = async () => {
    try {
      await emailsApi.retryFailed();
      refetch();
    } catch (error) {
      console.error('Failed to retry emails:', error);
    }
  };

  const handleViewEmail = (email: Email) => {
    setViewingEmail(email);
  };

  return (
    <DashboardShell
      header="Email Management"
      description="View and manage email communications with contacts."
      toolbar={
        <Button onClick={handleRetryFailed} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Retry Failed Emails
        </Button>
      }
    >
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <Alert variant="destructive">
          <AlertDescription>
            There was an error loading emails. Please try again later.
          </AlertDescription>
        </Alert>
      ) : (
        <EmailsTable emails={emails || []} onViewEmail={handleViewEmail} />
      )}

      <EmailDetailDialog
        open={viewingEmail !== null}
        onOpenChange={(open) => !open && setViewingEmail(null)}
        email={viewingEmail}
      />
    </DashboardShell>
  );
}
