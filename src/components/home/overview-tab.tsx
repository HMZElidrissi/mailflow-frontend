import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { TechnicalStack } from '@/components/home/technical-stack.tsx';

interface OverviewTabContentProps {
  markdownContent: string;
}

export function OverviewTabContent({ markdownContent }: OverviewTabContentProps) {
  return (
    <>
      {/* Application Flow & Technical Stack */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border border-border/50 bg-card/50 shadow-lg backdrop-blur transition-all duration-300">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-orange-500" />
              <CardTitle>Application Flow</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="prose dark:prose-invert">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </CardContent>
        </Card>

        <Card className="border border-border/50 bg-card/50 shadow-lg backdrop-blur transition-all duration-300">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-orange-500" />
              <CardTitle>Technical Stack</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <TechnicalStack />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
