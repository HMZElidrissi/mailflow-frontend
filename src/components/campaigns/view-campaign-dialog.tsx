import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { campaignsApi } from '@/services/campaignsApi';
import { Campaign } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Loader2, Mail, MousePointerClick } from 'lucide-react';

interface ViewCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign | null;
}

export function ViewCampaignDialog({ open, onOpenChange, campaign }: ViewCampaignDialogProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch campaign stats
  const { data: campaignWithStats, isLoading } = useQuery({
    queryKey: ['campaign', campaign?.id, 'stats'],
    queryFn: () => campaignsApi.getStats(campaign!.id),
    enabled: open && !!campaign,
  });

  // Reset tab when opening with a new campaign
  useEffect(() => {
    if (open) {
      setActiveTab('overview');
    }
  }, [open, campaign?.id]);

  if (!campaign) return null;

  const displayCampaign = campaignWithStats?.data || campaign;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{campaign.name}</DialogTitle>
          <DialogDescription>Campaign details and performance statistics</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Status</p>
                <Badge variant={displayCampaign.active ? 'default' : 'secondary'}>
                  {displayCampaign.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Trigger Tag</p>
                <Badge variant="outline">{displayCampaign.triggerTag}</Badge>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Template</p>
                <p className="text-sm">
                  {displayCampaign.templateName || `Template #${displayCampaign.templateId}`}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm">{new Date(displayCampaign.createdAt).toLocaleString()}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm">{new Date(displayCampaign.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-sm font-medium">
                      <Mail className="mr-2 h-4 w-4 text-primary" />
                      Sent
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{displayCampaign.stats?.sent || 0}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-sm font-medium">
                      <Eye className="mr-2 h-4 w-4 text-primary" />
                      Opened
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{displayCampaign.stats?.opened || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      {displayCampaign.stats && displayCampaign.stats.sent > 0
                        ? `${((displayCampaign.stats.opened / displayCampaign.stats.sent) * 100).toFixed(1)}%`
                        : '0%'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-sm font-medium">
                      <MousePointerClick className="mr-2 h-4 w-4 text-primary" />
                      Clicked
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{displayCampaign.stats?.clicked || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      {displayCampaign.stats && displayCampaign.stats.opened > 0
                        ? `${((displayCampaign.stats.clicked / displayCampaign.stats.opened) * 100).toFixed(1)}%`
                        : '0%'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
