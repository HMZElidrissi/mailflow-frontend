export interface Email {
  id: number;
  campaignId: number;
  contactId: number;
  recipientEmail: string;
  subject: string;
  content: string;
  errorMessage?: string;
  status: EmailStatus;
  sentAt: string;
  createdAt: string;
}

export enum EmailStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  OPENED = 'OPENED',
  CLICKED = 'CLICKED',
  FAILED = 'FAILED',
}

export interface EmailStats {
  campaignId: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  failed: number;
  openRate: number;
  clickRate: number;
}
