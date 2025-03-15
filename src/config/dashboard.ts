import * as React from 'react';
import { Home, Settings, Users } from 'lucide-react';

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
];

export const secondaryNavigation: NavigationItem[] = [
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];