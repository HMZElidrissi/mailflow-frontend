import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import mermaid from 'mermaid';
import { GitGraph, Info, Network } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTabContent } from '@/components/home/overview-tab.tsx';
import { ArchitectureTabContent } from '@/components/home/architecture-tab.tsx';
import { ClassesTabContent } from '@/components/home/classes-tab.tsx';

interface TechnicalSpecsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  markdownContent: string;
  flowDiagram: string;
  classDiagram: string;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function TechnicalSpecs({
  activeTab,
  setActiveTab,
  markdownContent,
  flowDiagram,
  classDiagram,
}: TechnicalSpecsProps) {
  const [, setDiagramsRendered] = useState(false);

  useEffect(() => {
    mermaid.initialize({
      theme: 'dark',
      themeVariables: {
        darkMode: true,
        background: '#020817',
        mainBkg: '#1e293b',
        primaryColor: '#0f172a',
        primaryTextColor: '#f8fafc',
        secondaryColor: '#334155',
        lineColor: '#64748b',
        textColor: '#f8fafc',
        fontSize: '16px',
      },
      securityLevel: 'loose',
    });

    // Only run mermaid when the diagram tabs are active
    if (activeTab === 'architecture' || activeTab === 'classes') {
      setTimeout(() => {
        mermaid.run();
        setDiagramsRendered(true);
      }, 100);
    }
  }, [activeTab]);

  return (
    <motion.section variants={itemVariants} className="mb-8">
      <Card className="border border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Technical Specifications</CardTitle>
          <CardDescription>
            Details about the architecture and implementation of mailflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="mb-8 flex justify-start">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="architecture" className="flex items-center gap-2">
                  <Network className="h-4 w-4" />
                  <span>Architecture</span>
                </TabsTrigger>
                <TabsTrigger value="classes" className="flex items-center gap-2">
                  <GitGraph className="h-4 w-4" />
                  <span>Classes</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview">
              <OverviewTabContent markdownContent={markdownContent} />
            </TabsContent>

            <TabsContent value="architecture">
              <ArchitectureTabContent flowDiagram={flowDiagram} />
            </TabsContent>

            <TabsContent value="classes">
              <ClassesTabContent classDiagram={classDiagram} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.section>
  );
}
