import { useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';

export function BreadcrumbNav() {
  const location = useLocation();
  const paths = location.pathname
    .split('/')
    .filter((path) => path !== 'dashboard' && Boolean(path));

  return (
    <Breadcrumb className="flex items-center">
      <BreadcrumbItem>
        <BreadcrumbLink className="text-gray-400 hover:text-gray-500 mr-3" href="/dashboard">
          <Home className="h-4 w-4" />
        </BreadcrumbLink>
      </BreadcrumbItem>
      {paths.map((path, index) => {
        const href = `/${['dashboard', ...paths.slice(0, index + 1)].join('/')}`;
        const isLast = index === paths.length - 1;
        const label = path.charAt(0).toUpperCase() + path.slice(1);

        return (
          <BreadcrumbItem key={path}>
            <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
            <BreadcrumbLink
              href={href}
              className={cn('text-gray-500 hover:text-gray-700', isLast && 'font-semibold')}
            >
              {label !== 'Dashboard' ? label : 'Home'}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}