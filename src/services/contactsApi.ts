import api from '@/services/api';
import { Contact, ContactRequest, PageResponse } from '@/types';

export const contactsApi = {
  getAll: async (page = 0, size = 10) => {
    return api.get<PageResponse<Contact>>(`/contacts?page=${page}&size=${size}`);
  },

  search: async (query: string, page = 0, size = 10) => {
    return api.get<PageResponse<Contact>>(
      `/contacts/search?query=${query}&page=${page}&size=${size}`
    );
  },

  getById: async (id: number) => {
    return api.get<Contact>(`/contacts/${id}`);
  },

  create: async (contact: ContactRequest) => {
    return api.post<Contact>('/contacts', contact);
  },

  update: async (id: number, contact: ContactRequest) => {
    return api.put<Contact>(`/contacts/${id}`, contact);
  },

  delete: async (id: number) => {
    return api.delete(`/contacts/${id}`);
  },

  addTag: async (contactId: number, tag: string) => {
    return api.post<Contact>(`/contacts/${contactId}/tags`, {
      tags: [tag],
    });
  },

  removeTag: async (contactId: number, tag: string) => {
    return api.delete<Contact>(`/contacts/${contactId}/tags`, {
      data: { tags: [tag] },
    });
  },
};
