import RegisterForm from '@/components/auth/register-form';
import AuthCard from '@/components/auth/auth-card';

export default function RegisterPage() {
  return (
    <AuthCard title="Create your account">
      <RegisterForm />
    </AuthCard>
  );
}
