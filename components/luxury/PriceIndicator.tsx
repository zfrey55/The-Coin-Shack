import { SpotPrice } from '@/lib/types';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceIndicatorProps {
  price: SpotPrice;
  className?: string;
}

export function PriceIndicator({ price, className }: PriceIndicatorProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{price.metal}</span>
        <div className={cn('flex items-center gap-1', price.trend === 'up' ? 'text-green-500' : 'text-red-500')}>
          {price.trend === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
        </div>
      </div>
      <span className="text-lg font-bold text-foreground">{price.price}</span>
    </div>
  );
}

