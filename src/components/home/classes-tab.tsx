import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { GitGraph } from 'lucide-react';

interface ClassesTabProps {
  classDiagram: string;
}

export function ClassesTabContent({ classDiagram }: ClassesTabProps) {
  return (
    <Card className="border border-border/50 bg-card/50 shadow-lg backdrop-blur transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <GitGraph className="h-6 w-6 text-orange-500" />
          <CardTitle>Class Diagram</CardTitle>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Domain model showing relationships between core entities
        </p>
      </CardHeader>
      <CardContent>
        <div className="mermaid overflow-x-auto rounded-lg bg-muted/30 p-4">{classDiagram}</div>
      </CardContent>
    </Card>
  );
}
