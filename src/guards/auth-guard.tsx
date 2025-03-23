import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '@/store/store';
import { fetchCurrentUser } from '@/features/auth/authSlice';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
  requiredRoles?: string[];
}

export default function AuthGuard({ children, requiredRoles }: AuthGuardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { token, user, loading } = useSelector((state: RootState) => state.auth);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (token && !user) {
        await dispatch(fetchCurrentUser());
      }
      setIsVerifying(false);
    };

    verifyAuth();
  }, [token, user, dispatch]);

  if (isVerifying || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Authenticating...</span>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (requiredRoles && requiredRoles.length > 0 && user) {
    const hasRequiredRole = requiredRoles.some((role) => user.roles.includes(role));

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}
