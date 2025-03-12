import Logo from '@/components/ui/logo.tsx';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthCard({ children, title }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-12">
          <Logo size="lg" />
        </div>

        <Card>
          <CardHeader className="text-center">
            <h2 className="text-3xl font-bold">{title}</h2>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}