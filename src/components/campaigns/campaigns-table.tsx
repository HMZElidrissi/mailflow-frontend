import { campaignsApi } from '@/services/campaignsApi';
import { Campaign } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, MoreHorizontal, Pause, PencilLine, Play, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';

interface CampaignsTableProps {
  campaigns: Campaign[];
  searchQuery: string;
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: number) => void;
  onView: (campaign: Campaign) => void;
}

export function CampaignsTable({
  campaigns,
  searchQuery,
  onEdit,
  onDelete,
  onView,
}: CampaignsTableProps) {
  const queryClient = useQueryClient();

  const toggleActivationMutation = useMutation({
    mutationFn: ({ id, activate }: { id: number; activate: boolean }) => {
      return activate ? campaignsApi.activate(id) : campaignsApi.deactivate(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  const handleToggleActivation = (campaign: Campaign) => {
    toggleActivationMutation.mutate({
      id: campaign.id,
      activate: !campaign.active,
    });
  };

  if (campaigns.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No campaigns found.{' '}
        {searchQuery ? 'Try a different search term.' : 'Add your first campaign to get started.'}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaigns</CardTitle>
        <CardDescription>{campaigns.length} total campaigns found</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Trigger Tag</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{campaign.triggerTag}</Badge>
                </TableCell>
                <TableCell>{campaign.templateName || `Template #${campaign.templateId}`}</TableCell>
                <TableCell>
                  <Badge variant={campaign.active ? 'default' : 'secondary'}>
                    {campaign.active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(campaign.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView(campaign)}>
                          <Eye className="h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-muted-foreground focus:text-muted-foreground"
                          onClick={() => onEdit(campaign)}
                        >
                          <PencilLine className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-muted-foreground focus:text-muted-foreground"
                          onClick={() => handleToggleActivation(campaign)}
                        >
                          {campaign.active ? (
                            <>
                              <Pause className="h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => onDelete(campaign.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
