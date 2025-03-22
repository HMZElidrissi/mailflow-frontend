import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { emailsApi } from '@/services/emailsApi';
import { Email } from '@/types';
import { DashboardShell } from '@/components/dashboard/shell';
import { DashboardToolbar } from '@/components/dashboard/toolbar';
import { RecentEmailActivity } from '@/components/dashboard/recent-activity';
import { AnalyticsOverview } from '@/components/dashboard/overview';
import { EmailDetailDialog } from '@/components/emails/email-detail-dialog';
import { SendEmailDialog } from '@/components/emails/send-email-dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/components/dashboard/stats.tsx';

export default function EmailDashboardPage() {
  const [viewingEmail, setViewingEmail] = useState<Email | null>(null);
  const [showSendDialog, setShowSendDialog] = useState(false);

  // Fetch recent emails
  const { data: recentEmails, refetch } = useQuery({
    queryKey: ['emails', 'recent'],
    queryFn: async () => {
      const response = await emailsApi.getRecent(5);
      return response.data;
    },
  });

  return (
    <DashboardShell
      header="Email Dashboard"
      toolbar={<DashboardToolbar onSendEmail={() => setShowSendDialog(true)} />}
    >
      <DashboardStats />

      <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-12">
        <Card className="md:col-span-1 lg:col-span-8">
          <CardHeader>
            <CardTitle>Email Performance</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <AnalyticsOverview />
          </CardContent>
        </Card>

        <Card className="md:col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Email Activity</CardTitle>
            <CardDescription className="text-indigo-500">
              {recentEmails?.length || 0} emails sent recently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentEmailActivity emails={recentEmails || []} onViewEmail={setViewingEmail} />
          </CardContent>
        </Card>
      </div>

      <EmailDetailDialog
        open={viewingEmail !== null}
        onOpenChange={(open) => !open && setViewingEmail(null)}
        email={viewingEmail}
      />

      <SendEmailDialog
        open={showSendDialog}
        onOpenChange={setShowSendDialog}
        onSuccess={() => {
          refetch();
        }}
      />
    </DashboardShell>
  );
}
