import * as React from 'react';
import { Activity, FileText, Home, Inbox, Settings, Users } from 'lucide-react';

export interface NavigationItem {
  title: string;
  href: string;
  pattern?: string;
  icon: React.ElementType;
}

export const mainNavigation: NavigationItem[] = [
  {
    title: 'Home',
    href: '/dashboard',
    pattern: '^/dashboard$',
    icon: Home,
  },
  {
    title: 'Contacts',
    href: '/dashboard/contacts',
    pattern: '^/dashboard/contacts',
    icon: Users,
  },
  {
    title: 'Campaigns',
    href: '/dashboard/campaigns',
    pattern: '^/dashboard/campaigns',
    icon: Activity,
  },
  {
    title: 'Email Templates',
    href: '/dashboard/templates',
    pattern: '^/dashboard/templates',
    icon: FileText,
  },
  {
    title: 'Email Management',
    href: '/dashboard/emails',
    pattern: '^/dashboard/emails',
    icon: Inbox,
  },
];

export const secondaryNavigation: NavigationItem[] = [
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];
