import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ThemeProvider } from '@/components/theme/theme-provider';
import MainLayout from '@/layouts/main-layout';
import DashboardLayout from '@/layouts/dashboard-layout';
import HomePage from '@/pages/home/home-page';
import LoginPage from '@/pages/auth/login-page';
import DashboardPage from '@/pages/dashboard/dashboard-page';
import ContactsPage from '@/pages/contacts/contacts-page';
import CampaignsPage from '@/pages/campaigns/campaigns-page';
import TemplatesPage from '@/pages/templates/templates-page';
import EmailsPage from '@/pages/emails/emails-page';
import NotFoundPage from '@/pages/home/not-found-page';
import RegisterPage from '@/pages/auth/register-page.tsx';
import UnauthorizedPage from '@/pages/home/unauthorized-page.tsx';

function App() {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <Router>
        <Routes>
          <Route path="/sign-in" element={!token ? <LoginPage /> : <Navigate to="/dashboard" />} />
          <Route path="/sign-in" element={!token ? <LoginPage /> : <Navigate to="/dashboard" />} />
          <Route
            path="/sign-up"
            element={!token ? <RegisterPage /> : <Navigate to="/dashboard" />}
          />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

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
            <Route path="emails" element={<EmailsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
