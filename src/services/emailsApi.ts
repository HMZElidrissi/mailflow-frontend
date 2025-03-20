import api from '@/services/api';
import { Email, EmailStats } from '@/types';

export const emailsApi = {
  getById: async (id: number) => {
    return api.get<Email>(`/emails/${id}`);
  },

  getByCampaign: async (campaignId: number) => {
    return api.get<Email[]>(`/emails/campaign/${campaignId}`);
  },

  getByContact: async (contactId: number) => {
    return api.get<Email[]>(`/emails/contact/${contactId}`);
  },

  getCampaignStats: async (campaignId: number) => {
    return api.get<EmailStats>(`/emails/campaign/${campaignId}/stats`);
  },

  getRecent: async (limit = 10) => {
    return api.get<Email[]>(`/emails/recent?limit=${limit}`);
  },

  sendEmail: async (campaignId: number, contactId: number, templateId: number) => {
    return api.post<Email>(
      `/emails/campaign/${campaignId}/contact/${contactId}/template/${templateId}`
    );
  },

  retryFailed: async (minutes = 60) => {
    return api.post<Email[]>(`/emails/retry?minutes=${minutes}`);
  },
};
