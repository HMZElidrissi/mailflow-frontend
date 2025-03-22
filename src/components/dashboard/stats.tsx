import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Eye, Mail, MousePointerClick } from 'lucide-react';
import { emailsApi } from '@/services/emailsApi';
import { formatPercentage } from '@/lib/utils.ts';

export function DashboardStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['email-stats', 'summary'],
    queryFn: async () => {
      const response = await emailsApi.getEmailStats();
      return response.data;
    },
  });

  const emailStats = [
    {
      title: 'Total Sent',
      value: stats ? stats.totalSent.toLocaleString() : '0',
      description: stats
        ? `${formatPercentage(stats.sentChangePercentage)} from last month`
        : 'Loading...',
      icon: Mail,
    },
    {
      title: 'Total Opened',
      value: stats ? stats.totalOpened.toLocaleString() : '0',
      description: stats
        ? `${formatPercentage(stats.openedChangePercentage)} from last month`
        : 'Loading...',
      icon: Eye,
    },
    {
      title: 'Total Clicked',
      value: stats ? stats.totalClicked.toLocaleString() : '0',
      description: stats
        ? `${formatPercentage(stats.clickedChangePercentage)} from last month`
        : 'Loading...',
      icon: MousePointerClick,
    },
    {
      title: 'Open Rate',
      value: stats ? `${stats.openRate}%` : '0%',
      description: stats
        ? `${formatPercentage(stats.openRateChangePercentage)} from last month`
        : 'Loading...',
      icon: BarChart,
    },
  ];

  if (isLoading) {
    return (
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-4 rounded bg-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-full rounded bg-gray-200" />
              <div className="mt-2 h-4 w-full rounded bg-gray-200" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {emailStats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground text-yellow-600">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
