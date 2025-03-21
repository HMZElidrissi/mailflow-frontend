import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import { AppDispatch } from '@/store/store';
import Logo from '@/components/ui/logo';
import { LogIn, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Footer from '@/components/home/footer.tsx';

export default function MainLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const user = useSelector((state) => state.auth.user);
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };
  const isAuthenticated = !!user;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in');
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Logo size="sm" />
            </div>

            {/* User menu and theme toggle */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />

              {/* Mobile menu trigger */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px] p-0" aria-describedby="mobile-menu">
                  <VisuallyHidden>
                    <SheetTitle>
                      <span className="sr-only">Mobile Menu</span>
                    </SheetTitle>
                  </VisuallyHidden>
                  <div className="px-4 py-6">
                    <div className="mb-6">
                      <Logo size="sm" />
                    </div>
                    <nav className="space-y-2">
                      {isAuthenticated && (
                        <div className="mt-4 border-t pt-4">
                          <Button
                            variant="destructive"
                            className="flex w-full items-center space-x-2"
                            onClick={handleLogout}
                          >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                          </Button>
                        </div>
                      )}
                      {!isAuthenticated && (
                        <div className="mt-4 border-t pt-4">
                          <Button
                            variant="default"
                            className="flex w-full items-center space-x-2"
                            onClick={() => navigate('/sign-in')}
                          >
                            <LogIn className="h-5 w-5" />
                            <span>Sign In</span>
                          </Button>
                        </div>
                      )}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Conditional display: User dropdown menu or Sign In button */}
              {isAuthenticated ? (
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10">
                        <Avatar className="h-10 w-10 border border-muted">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user?.email?.substring(0, 2).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => navigate('/profile')}
                        className="cursor-pointer"
                      >
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate('/settings')}
                        className="cursor-pointer"
                      >
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  className="hidden items-center gap-2 md:flex"
                  onClick={() => navigate('/sign-in')}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="container mx-auto px-4 py-8"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      {/*<footer className="border-t bg-card/80 py-6 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center space-x-2">
              <Circle className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-muted-foreground">
                mailflow © {new Date().getFullYear()}
              </span>
            </div>
            <div className="mt-4 md:mt-0">
              <nav className="flex items-center space-x-4 text-sm text-muted-foreground">
                <Link to="/help" className="hover:text-foreground">
                  Help
                </Link>
                <Link to="/privacy" className="hover:text-foreground">
                  Privacy
                </Link>
                <Link to="/terms" className="hover:text-foreground">
                  Terms
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
      */}
      <Footer />
    </div>
  );
}
