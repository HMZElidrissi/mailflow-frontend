import api from '@/services/api';
import { Email } from '@/types';

export const emailsApi = {
  getById: async (id: number) => {
    return api.get<Email>(`/emails/${id}`);
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

  getEmailStats: async () => {
    return api.get<{
      totalSent: number;
      totalOpened: number;
      totalClicked: number;
      openRate: number;
      sentChangePercentage: number;
      openedChangePercentage: number;
      clickedChangePercentage: number;
      openRateChangePercentage: number;
    }>('/emails/stats');
  },

  getAnalytics: async (period = 'year') => {
    return api.get<{
      labels: string[];
      sent: number[];
      opened: number[];
      clicked: number[];
    }>(`/emails/analytics?period=${period}`);
  },
};
