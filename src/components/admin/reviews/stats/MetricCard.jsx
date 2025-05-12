import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const MetricCard = ({
  icon,
  label,
  value,
  children,
  className = ''
}) => {
  return (
    <div className={`bg-white p-4 rounded-lg border shadow-sm ${className}`}>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
        {icon}
        <span>{label}</span>
      </div>

      <div className="text-2xl font-bold">
        {value}
      </div>

      {children}
    </div>
  );
};


MetricCard.Skeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-8 w-16 mt-1" />
      <Skeleton className="h-4 w-24 mt-2" />
    </div>
  )
}

export default MetricCard;