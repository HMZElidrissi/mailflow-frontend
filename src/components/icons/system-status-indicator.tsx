import React from 'react';
import { Link } from 'react-router-dom';

interface SystemStatusIndicatorProps {
  status: 'operational' | 'degraded' | 'outage';
  className?: string;
}

const statusConfig = {
  operational: {
    color: 'bg-green-500',
    text: 'All systems operational',
  },
  degraded: {
    color: 'bg-yellow-500',
    text: 'Some systems experiencing issues',
  },
  outage: {
    color: 'bg-red-500',
    text: 'Service outage detected',
  },
};

const SystemStatusIndicator: React.FC<SystemStatusIndicatorProps> = ({
  status = 'operational',
  className = 'text-sm text-gray-500 hover:text-gray-800 dark:text-white/60 dark:hover:text-white',
}) => {
  const { color, text } = statusConfig[status];

  return (
    <Link to="/status" className={`flex items-center gap-2 ${className}`}>
      <div className={`h-2 w-2 rounded-full ${color}`}></div>
      {text}
    </Link>
  );
};

export default SystemStatusIndicator;
