import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { contactsApi } from '@/services/contactsApi';
import { Contact } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Plus, Search } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/shell';
import {
  AddTagDialog,
  ContactDialog,
  ContactsTable,
  DeleteContactDialog,
} from '@/components/contacts';

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showAddTagDialog, setShowAddTagDialog] = useState<Contact | null>(null);

  // Fetch contacts or search results
  const { data, isLoading, isError } = useQuery({
    queryKey: ['contacts', searchQuery],
    queryFn: async () => {
      if (searchQuery) {
        const response = await contactsApi.search(searchQuery);
        return response.data;
      } else {
        const response = await contactsApi.getAll();
        return response.data;
      }
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleDeleteContact = (id: number) => {
    setShowDeleteConfirm(id);
  };

  const handleAddTag = (contact: Contact) => {
    setShowAddTagDialog(contact);
  };

  return (
    <DashboardShell
      header="Contacts"
      description="Manage your contacts and their information."
      toolbar={
        <div className="flex flex-col gap-2 sm:flex-row">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search contacts..."
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
            Add Contact
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
            There was an error loading contacts. Please try again later.
          </AlertDescription>
        </Alert>
      ) : (
        <ContactsTable
          contacts={data?.content || []}
          searchQuery={searchQuery}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
          onAddTag={handleAddTag}
        />
      )}

      {/* Dialog Components */}
      <ContactDialog
        open={showAddDialog}
        mode="add"
        onOpenChange={setShowAddDialog}
        onSuccess={() => setShowAddDialog(false)}
      />

      <ContactDialog
        open={editingContact !== null}
        mode="edit"
        onOpenChange={(open) => !open && setEditingContact(null)}
        contact={editingContact}
        onSuccess={() => setEditingContact(null)}
      />

      <DeleteContactDialog
        open={showDeleteConfirm !== null}
        onOpenChange={(open) => !open && setShowDeleteConfirm(null)}
        contactId={showDeleteConfirm}
      />

      <AddTagDialog
        open={showAddTagDialog !== null}
        onOpenChange={(open) => !open && setShowAddTagDialog(null)}
        contact={showAddTagDialog}
      />
    </DashboardShell>
  );
}
