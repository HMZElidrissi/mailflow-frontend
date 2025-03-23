import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ChevronDown, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import NavItem from '@/components/dashboard/nav-item';
// import { RootState } from '@/store/store';
import { logout } from '@/features/auth/authSlice';
import { mainNavigation, secondaryNavigation } from '@/config/dashboard';
import Logo from '@/components/icons/logo.tsx';

export function DashboardSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { user } = useSelector((state: RootState) => state.auth);
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await dispatch(logout() as never);
      navigate('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
      setIsLoading(false);
    }
  };

  // if (!user) {
  //   return null;
  // }

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user.email?.substring(0, 2).toUpperCase();

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-800">
      <SidebarHeader className="flex items-center justify-center px-4 py-12">
        <Logo />
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          <div className="space-y-3">
            {mainNavigation.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </div>

          <SidebarSeparator className="my-4" />

          <div className="space-y-3">
            {secondaryNavigation.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </div>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-2 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="w-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Avatar className="h-8 w-8 border-2 border-white ring-2 ring-gray-100 dark:border-gray-900 dark:ring-gray-800">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex flex-col items-start">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {user.name || 'User'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{user.email}</span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4 text-gray-500" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name || 'User'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => navigate('/dashboard/settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center text-red-600 dark:text-red-400"
                  onSelect={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
                      <span>Signing out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
