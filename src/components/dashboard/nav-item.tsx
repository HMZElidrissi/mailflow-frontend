import { Link, useLocation } from 'react-router-dom';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export interface NavigationItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface NavItemProps {
  item: NavigationItem;
}

const NavItem = ({ item }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;

  return (
    <Link className="flex items-center gap-3" to={item.href}>
      <SidebarMenuButton
        className={cn(
          'relative p-5 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800',
          isActive && 'bg-gray-100 text-primary dark:bg-gray-800'
        )}
      >
        <item.icon
          className={cn('h-4 w-4', isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400')}
        />
        <span
          className={cn(
            'font-medium',
            isActive ? 'text-primary' : 'text-gray-700 dark:text-gray-300'
          )}
        >
          {item.title}
        </span>
      </SidebarMenuButton>
    </Link>
  );
};

export default NavItem;
