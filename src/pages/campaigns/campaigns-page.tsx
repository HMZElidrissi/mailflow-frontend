import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { campaignsApi } from '@/services/campaignsApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Plus, Search } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/shell';
import {
  CampaignDialog,
  CampaignsTable,
  DeleteCampaignDialog,
  ViewCampaignDialog,
} from '@/components/campaigns';
import { Campaign } from '@/types';

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [viewingCampaign, setViewingCampaign] = useState<Campaign | null>(null);

  // Fetch campaigns or search results
  const { data, isLoading, isError } = useQuery({
    queryKey: ['campaigns', searchQuery],
    queryFn: async () => {
      if (searchQuery) {
        const response = await campaignsApi.search(searchQuery);
        return response.data;
      } else {
        const response = await campaignsApi.getAll();
        return response.data;
      }
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search query state is already set by the input onChange,
    // and the query will re-run automatically due to the queryKey dependency
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
  };

  const handleDeleteCampaign = (id: number) => {
    setShowDeleteConfirm(id);
  };

  const handleViewCampaign = (campaign: Campaign) => {
    setViewingCampaign(campaign);
  };

  return (
    <DashboardShell
      header="Campaigns"
      toolbar={
        <div className="flex flex-col gap-2 sm:flex-row">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[250px]"
            />
            <Button type="submit" variant="secondary">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Campaign
          </Button>
        </div>
      }
    >
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <Alert variant="destructive">
          <AlertDescription>
            There was an error loading campaigns. Please try again later.
          </AlertDescription>
        </Alert>
      ) : (
        <CampaignsTable
          campaigns={data?.content || []}
          searchQuery={searchQuery}
          onEdit={handleEditCampaign}
          onDelete={handleDeleteCampaign}
          onView={handleViewCampaign}
        />
      )}

      {/* Dialog Components */}
      <CampaignDialog
        open={showAddDialog}
        mode="add"
        onOpenChange={setShowAddDialog}
        onSuccess={() => setShowAddDialog(false)}
      />

      <CampaignDialog
        open={editingCampaign !== null}
        mode="edit"
        onOpenChange={(open) => !open && setEditingCampaign(null)}
        campaign={editingCampaign}
        onSuccess={() => setEditingCampaign(null)}
      />

      <DeleteCampaignDialog
        open={showDeleteConfirm !== null}
        onOpenChange={(open) => !open && setShowDeleteConfirm(null)}
        campaignId={showDeleteConfirm}
      />

      <ViewCampaignDialog
        open={viewingCampaign !== null}
        onOpenChange={(open) => !open && setViewingCampaign(null)}
        campaign={viewingCampaign}
      />
    </DashboardShell>
  );
}
