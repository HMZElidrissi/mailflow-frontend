import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function DashboardLayout() {
  const { token } = useSelector((state: RootState) => state.auth);

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-x-auto">
          <DashboardSidebar />
          <SidebarInset className="flex w-full flex-col">
            <DashboardHeader />
            <div className="w-full flex-1 overflow-x-auto p-4">
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
