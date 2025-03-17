import api from '@/services/api';
import { Campaign, CampaignRequest, PageResponse } from '@/types';

export const campaignsApi = {
  getAll: async (page = 0, size = 20) => {
    return api.get<PageResponse<Campaign>>(`/campaigns?page=${page}&size=${size}`);
  },

  search: async (query: string, page = 0, size = 20) => {
    return api.get<PageResponse<Campaign>>(
      `/campaigns/search?query=${query}&page=${page}&size=${size}`
    );
  },

  getById: async (id: number) => {
    return api.get<Campaign>(`/campaigns/${id}`);
  },

  create: async (campaign: CampaignRequest) => {
    return api.post<Campaign>('/campaigns', campaign);
  },

  update: async (id: number, campaign: CampaignRequest) => {
    return api.put<Campaign>(`/campaigns/${id}`, campaign);
  },

  delete: async (id: number) => {
    return api.delete(`/campaigns/${id}`);
  },

  activate: async (id: number) => {
    return api.post<Campaign>(`/campaigns/${id}/activate`);
  },

  deactivate: async (id: number) => {
    return api.post<Campaign>(`/campaigns/${id}/deactivate`);
  },

  getStats: async (id: number) => {
    return api.get<Campaign>(`/campaigns/${id}/stats`);
  },
};
