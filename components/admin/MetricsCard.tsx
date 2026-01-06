import { ReactNode } from 'react';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down';
  trendValue?: string;
  icon?: ReactNode;
  className?: string;
}

export function MetricsCard({ title, value, trend, trendValue, icon, className }: MetricsCardProps) {
  return (
    <LuxuryCard variant="elevated" className={cn('p-6', className)}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-[var(--gold-primary)]">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {trend && trendValue && (
          <div className={cn('flex items-center gap-1 text-sm', trend === 'up' ? 'text-green-500' : 'text-red-500')}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </LuxuryCard>
  );
}

