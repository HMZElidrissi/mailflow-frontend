import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Network } from 'lucide-react';

interface ArchitectureTabContentProps {
  flowDiagram: string;
}

export function ArchitectureTabContent({ flowDiagram }: ArchitectureTabContentProps) {
  return (
    <Card className="border border-border/50 bg-card/50 shadow-lg backdrop-blur transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Network className="h-6 w-6 text-orange-500" />
          <CardTitle>System Architecture</CardTitle>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Microservice architecture with synchronous (OpenFeign) and asynchronous (Kafka)
          communication
        </p>
      </CardHeader>
      <CardContent>
        <div className="mermaid overflow-x-auto rounded-lg bg-muted/30 p-4">{flowDiagram}</div>
      </CardContent>
    </Card>
  );
}
