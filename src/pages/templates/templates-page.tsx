import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { templatesApi } from '@/services/templatesApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Plus, Search } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/shell';
import {
    TemplateDialog,
    TemplatesTable,
    DeleteTemplateDialog,
    ViewTemplateDialog,
} from '@/components/templates';
import { EmailTemplate } from '@/types';

export default function TemplatesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
    const [viewingTemplate, setViewingTemplate] = useState<EmailTemplate | null>(null);

    // Fetch templates or search results
    const { data, isLoading, isError } = useQuery({
        queryKey: ['templates', searchQuery],
        queryFn: async () => {
            if (searchQuery) {
                const response = await templatesApi.search(searchQuery);
                return response.data;
            } else {
                const response = await templatesApi.getAll();
                return response.data;
            }
        },
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // The search query state is already set by the input onChange,
        // and the query will re-run automatically due to the queryKey dependency
    };

    const handleEditTemplate = (template: EmailTemplate) => {
        setEditingTemplate(template);
    };

    const handleDeleteTemplate = (id: number) => {
        setShowDeleteConfirm(id);
    };

    const handleViewTemplate = (template: EmailTemplate) => {
        setViewingTemplate(template);
    };

    return (
        <DashboardShell
            header="Email Templates"
            description="Manage your email templates for campaigns."
            toolbar={
                <div className="flex flex-col gap-2 sm:flex-row">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <Input
                            placeholder="Search templates..."
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
                        Add Template
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
                        There was an error loading templates. Please try again later.
                    </AlertDescription>
                </Alert>
            ) : (
                <TemplatesTable
                    templates={data?.content || []}
                    searchQuery={searchQuery}
                    onEdit={handleEditTemplate}
                    onDelete={handleDeleteTemplate}
                    onView={handleViewTemplate}
                />
            )}

            {/* Dialog Components */}
            <TemplateDialog
                open={showAddDialog}
                mode="add"
                onOpenChange={setShowAddDialog}
                onSuccess={() => setShowAddDialog(false)}
            />

            <TemplateDialog
                open={editingTemplate !== null}
                mode="edit"
                onOpenChange={(open) => !open && setEditingTemplate(null)}
                template={editingTemplate}
                onSuccess={() => setEditingTemplate(null)}
            />

            <DeleteTemplateDialog
                open={showDeleteConfirm !== null}
                onOpenChange={(open) => !open && setShowDeleteConfirm(null)}
                templateId={showDeleteConfirm}
            />

            <ViewTemplateDialog
                open={viewingTemplate !== null}
                onOpenChange={(open) => !open && setViewingTemplate(null)}
                template={viewingTemplate}
            />
        </DashboardShell>
    );
}