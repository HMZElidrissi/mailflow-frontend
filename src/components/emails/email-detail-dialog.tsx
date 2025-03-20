import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Email } from '@/types';
import { emailsApi } from '@/services/emailsApi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { getStatusBadge } from '@/lib/utils.ts';

interface EmailDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: Email | null;
}

export function EmailDetailDialog({ open, onOpenChange, email }: EmailDetailDialogProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Get the full email details
  const { data: emailDetails, isLoading } = useQuery({
    queryKey: ['email', email?.id],
    queryFn: async () => {
      if (!email?.id) return null;
      const response = await emailsApi.getById(email.id);
      return response.data;
    },
    enabled: open && !!email?.id,
  });

  // Use the full email details when available, fall back to the initial email
  const displayEmail = emailDetails || email;

  if (!displayEmail) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Email Details</DialogTitle>
          <DialogDescription>View details about this email communication.</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  <Badge variant={getStatusBadge(displayEmail.status)}>{displayEmail.status}</Badge>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Sent At</p>
                  <p className="text-sm">
                    {displayEmail.sentAt
                      ? new Date(displayEmail.sentAt).toLocaleString()
                      : 'Not sent yet'}
                  </p>
                </div>

                <div className="col-span-2 space-y-1">
                  <p className="text-sm font-medium">Recipient</p>
                  <p className="text-sm">{displayEmail.recipientEmail}</p>
                </div>

                <div className="col-span-2 space-y-1">
                  <p className="text-sm font-medium">Subject</p>
                  <p className="text-sm">{displayEmail.subject}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Campaign ID</p>
                  <p className="text-sm">{displayEmail.campaignId}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Contact ID</p>
                  <p className="text-sm">{displayEmail.contactId}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Created At</p>
                  <p className="text-sm">{new Date(displayEmail.createdAt).toLocaleString()}</p>
                </div>

                {displayEmail.errorMessage && (
                  <div className="col-span-2 space-y-1">
                    <p className="text-sm font-bold text-destructive">Error Message</p>
                    <p className="text-sm text-destructive">{displayEmail.errorMessage}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="content">
              <div className="my-2 rounded-md border p-4">
                <div className="space-y-2">
                  <div className="font-medium">Subject</div>
                  <div className="pb-2 text-sm">{displayEmail.subject}</div>
                  <div className="border-t pt-4 font-medium">Content</div>
                  <div className="rounded-md bg-muted p-4">
                    {displayEmail.content ? (
                      <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: displayEmail.content,
                        }}
                      />
                    ) : (
                      <p className="text-muted-foreground">Content not available</p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
