import * as React from 'react';
import {
  BarChart3,
  FileText,
  Home,
  Settings,
  Users,
} from 'lucide-react';

export interface NavigationItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

export const mainNavigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'Posts',
    href: '/dashboard/posts',
    icon: FileText,
  },
  {
    title: 'Users',
    href: '/dashboard/users',
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