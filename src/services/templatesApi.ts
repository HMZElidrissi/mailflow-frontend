import api from '@/services/api';
import { EmailTemplate, EmailTemplateRequest, PageResponse } from '@/types';

export const templatesApi = {
    getAll: async (page = 0, size = 10) => {
        return api.get<PageResponse<EmailTemplate>>(`/templates?page=${page}&size=${size}`);
    },

    search: async (query: string, page = 0, size = 10) => {
        return api.get<PageResponse<EmailTemplate>>(
            `/templates/search?query=${query}&page=${page}&size=${size}`
        );
    },

    getById: async (id: number) => {
        return api.get<EmailTemplate>(`/templates/${id}`);
    },

    create: async (template: EmailTemplateRequest) => {
        return api.post<EmailTemplate>('/templates', template);
    },

    update: async (id: number, template: EmailTemplateRequest) => {
        return api.put<EmailTemplate>(`/templates/${id}`, template);
    },

    delete: async (id: number) => {
        return api.delete(`/templates/${id}`);
    },

    renderTemplate: async (id: number, variables: Record<string, string>) => {
        return api.post<{ subject: string; content: string }>(`/templates/${id}/render`, variables);
    },
};