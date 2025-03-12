import LoginForm from '@/components/auth/login-form';
import AuthCard from '@/components/auth/auth-card';

export default function LoginPage() {
  return (
    <AuthCard title="Sign in to your account">
      <LoginForm />
    </AuthCard>
  );
}