export interface Campaign {
  id: number;
  name: string;
  triggerTag: string;
  templateId: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  templateName?: string;
  stats?: {
    sent: number;
    opened: number;
    clicked: number;
  };
}

export interface CampaignRequest {
  name: string;
  triggerTag: string;
  templateId: number;
  active: boolean;
}
