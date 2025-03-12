import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';

export default function DashboardLayout() {
  // const { token } = useSelector((state: RootState) => state.auth);

  // if (!token) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <SidebarProvider>
        <div className="w-full flex h-screen overflow-x-auto">
          <DashboardSidebar />
          <SidebarInset className="flex flex-col w-full">
            <DashboardHeader />
            <div className="w-full flex-1 p-4 overflow-x-auto">
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}