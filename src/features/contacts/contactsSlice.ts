import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

interface Contact {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  tags: Set<string>;
  createdAt: string;
  updatedAt: string;
}

interface ContactRequest {
  email: string;
  firstName: string;
  lastName: string;
  tags: string[];
}

interface ContactsState {
  contacts: Contact[];
  totalElements: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  searchQuery: string;
}

interface PageResponse {
  content: Contact[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async ({ query, page, size }: { query?: string; page: number; size: number }) => {
    const endpoint = query
      ? `/api/v1/contacts/search?query=${query}&page=${page}&size=${size}`
      : `/api/v1/contacts?page=${page}&size=${size}`;

    const response = await api.get<PageResponse>(endpoint);
    return response.data;
  }
);

export const createContact = createAsyncThunk(
  'contacts/createContact',
  async (contact: ContactRequest) => {
    const response = await api.post('/api/v1/contacts', contact);
    return response.data;
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, contact }: { id: number; contact: ContactRequest }) => {
    const response = await api.put(`/api/v1/contacts/${id}`, contact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id: number) => {
    await api.delete(`/api/v1/contacts/${id}`);
    return id;
  }
);

export const addTagToContact = createAsyncThunk(
  'contacts/addTag',
  async ({ id, tags }: { id: number; tags: string[] }) => {
    const response = await api.post(`/api/v1/contacts/${id}/tags`, { tags });
    return response.data;
  }
);

export const removeTagFromContact = createAsyncThunk(
  'contacts/removeTag',
  async ({ id, tags }: { id: number; tags: string[] }) => {
    const response = await api.delete(`/api/v1/contacts/${id}/tags`, {
      data: { tags }
    });
    return response.data;
  }
);

const initialState: ContactsState = {
  contacts: [],
  totalElements: 0,
  loading: false,
  error: null,
  currentPage: 0,
  pageSize: 10,
  searchQuery: ''
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 0; // Reset to first page on new search
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 0; // Reset to first page when changing page size
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch contacts
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.content;
        state.totalElements = action.payload.totalElements;
        state.currentPage = action.payload.pageNo;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contacts';
      })

      // Create contact
      .addCase(createContact.fulfilled, (state) => {
        state.loading = false;
        // We'll fetch the updated list instead of trying to update the state directly
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create contact';
      })

      // Update contact
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        const updatedContact = action.payload;
        state.contacts = state.contacts.map(contact =>
          contact.id === updatedContact.id ? updatedContact : contact
        );
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update contact';
      })

      // Delete contact
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        state.totalElements -= 1;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete contact';
      })

      // Add tag
      .addCase(addTagToContact.fulfilled, (state, action) => {
        state.loading = false;
        const updatedContact = action.payload;
        state.contacts = state.contacts.map(contact =>
          contact.id === updatedContact.id ? updatedContact : contact
        );
      })
      .addCase(addTagToContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add tag';
      })

      // Remove tag
      .addCase(removeTagFromContact.fulfilled, (state, action) => {
        state.loading = false;
        const updatedContact = action.payload;
        state.contacts = state.contacts.map(contact =>
          contact.id === updatedContact.id ? updatedContact : contact
        );
      })
      .addCase(removeTagFromContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to remove tag';
      });
  }
});

export const { setSearchQuery, setCurrentPage, setPageSize, clearError } = contactsSlice.actions;
export default contactsSlice.reducer;