import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import { AppDispatch } from '@/store/store';
import { Home, LogOut, PlusCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const MainLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primary/90">
                <Home className="h-5 w-5" />
                <span className="font-semibold">Home</span>
              </Link>
              <Link to="/posts" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <FileText className="h-5 w-5" />
                <span>Posts</span>
              </Link>
              <Link 
                to="/posts/create"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Create Post</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;