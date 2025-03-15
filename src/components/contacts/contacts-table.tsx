import { Contact } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { contactsApi } from '@/services/contactsApi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PencilLine, Plus, Tag, Trash2, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';

interface ContactsTableProps {
  contacts: Contact[];
  searchQuery: string;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
  onAddTag: (contact: Contact) => void;
}

export function ContactsTable({
  contacts,
  searchQuery,
  onEdit,
  onDelete,
  onAddTag,
}: ContactsTableProps) {
  const queryClient = useQueryClient();

  const removeTagMutation = useMutation({
    mutationFn: ({ contactId, tag }: { contactId: number; tag: string }) =>
      contactsApi.removeTag(contactId, tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  if (contacts.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No contacts found.{' '}
        {searchQuery ? 'Try a different search term.' : 'Add your first contact to get started.'}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contacts</CardTitle>
        <CardDescription>{contacts.length} total contacts found</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">
                  {contact.firstName} {contact.lastName}
                </TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {contact.tags && contact.tags.length > 0 ? (
                      contact.tags.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center space-x-1 rounded-full bg-primary/10 px-2 py-1 text-xs"
                        >
                          <Tag className="h-3 w-3" />
                          <span>{tag}</span>
                          <button
                            onClick={() => removeTagMutation.mutate({ contactId: contact.id, tag })}
                            className="ml-1 text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">No tags</span>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 rounded-full px-2"
                      onClick={() => onAddTag(contact)}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Add
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
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
                        <DropdownMenuItem onClick={() => onEdit(contact)}>
                          <PencilLine className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => onDelete(contact.id)}
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
