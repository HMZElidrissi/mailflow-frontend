import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { EmailStatus } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusBadge = (status: EmailStatus) => {
  switch (status) {
    case EmailStatus.SENT:
      return 'outline';
    case EmailStatus.DELIVERED:
      return 'secondary';
    case EmailStatus.OPENED:
      return 'default';
    case EmailStatus.CLICKED:
      return 'ghost';
    case EmailStatus.FAILED:
      return 'destructive';
    default:
      return 'outline';
  }
};
