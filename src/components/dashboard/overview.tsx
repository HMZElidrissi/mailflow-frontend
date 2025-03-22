import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import { emailsApi } from '@/services/emailsApi';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function AnalyticsOverview() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['email-analytics'],
    queryFn: async () => {
      const response = await emailsApi.getAnalytics();
      return response.data;
    },
  });

  const chartData = {
    labels: stats?.labels || [],
    datasets: [
      {
        label: 'Sent',
        data: stats?.sent || [],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
        pointStyle: false,
      },
      {
        label: 'Opened',
        data: stats?.opened || [],
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        tension: 0.4,
        fill: true,
        pointStyle: false,
      },
      {
        label: 'Clicked',
        data: stats?.clicked || [],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointStyle: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 12,
          },
        },
      },
      y: {
        border: {
          display: false,
          dash: [4, 4],
        },
        grid: {
          color: '#e2e8f0',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  if (isLoading) {
    return <div className="h-[350px] w-full animate-pulse rounded-lg bg-gray-200" />;
  }

  return (
    <div className="h-[350px] w-full">
      <Line options={options as never} data={chartData as never} />
    </div>
  );
}
