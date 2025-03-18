import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ThemeProvider } from '@/components/theme/theme-provider';
import MainLayout from '@/layouts/main-layout';
import DashboardLayout from '@/layouts/dashboard-layout';
import HomePage from '@/pages/home/home-page.tsx';
import LoginPage from '@/pages/auth/login-page';
import DashboardPage from '@/pages/dashboard/dashboard-page.tsx';
import ContactsPage from '@/pages/contacts/contacts-page.tsx';
import CampaignsPage from '@/pages/campaigns/campaigns-page.tsx';
import TemplatesPage from '@/pages/templates/templates-page.tsx';

function App() {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <Router>
        <Routes>
          <Route path="/sign-in" element={!token ? <LoginPage /> : <Navigate to="/dashboard" />} />

          {/* Main Layout Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          {/* Dashboard Layout Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="campaigns" element={<CampaignsPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>

          {/*<Route path="*" element={<NotFoundPage />} />*/}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
