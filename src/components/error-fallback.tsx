import { FallbackProps } from 'react-error-boundary';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Card className="mx-auto mt-8 max-w-md">
      <CardHeader>
        <div className="flex items-center space-x-2 text-destructive">
          <AlertCircle className="h-6 w-6" />
          <h2 className="text-lg font-semibold">Something went wrong</h2>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          {error.message || 'An unexpected error occurred'}
        </p>
        <pre className="overflow-auto rounded-md bg-muted p-4 text-xs">{error.stack}</pre>
      </CardContent>
      <CardFooter>
        <Button onClick={resetErrorBoundary} variant="outline">
          Try again
        </Button>
      </CardFooter>
    </Card>
  );
}