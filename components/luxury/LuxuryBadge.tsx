import { cn } from '@/lib/utils';
import { Crown, Radio } from 'lucide-react';

interface LuxuryBadgeProps {
  variant: 'live' | 'vip' | 'host' | 'new' | 'featured';
  className?: string;
  size?: 'sm' | 'md';
}

export function LuxuryBadge({ variant, className, size = 'md' }: LuxuryBadgeProps) {
  const sizes = { sm: 'text-xs px-2 py-0.5', md: 'text-sm px-2.5 py-1' };
  
  if (variant === 'live') {
    return <div className={cn('inline-flex items-center gap-1.5 rounded-full bg-red-500 text-white live-pulse', sizes[size], className)}><Radio className="w-3 h-3" /><span>LIVE</span></div>;
  }
  if (variant === 'vip') {
    return <div className={cn('inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold-primary)] text-white gold-shimmer', sizes[size], className)}><Crown className="w-3 h-3" /><span>VIP</span></div>;
  }
  if (variant === 'host') {
    return <div className={cn('inline-flex items-center gap-1 rounded-full border border-[var(--gold-secondary)] text-[var(--gold-dark)] bg-[var(--gold-muted)]/30', sizes[size], className)}><span>HOST</span></div>;
  }
  if (variant === 'new') {
    return <div className={cn('inline-flex items-center gap-1 rounded-full bg-blue-500 text-white', sizes[size], className)}><span>NEW</span></div>;
  }
  return <div className={cn('inline-flex items-center gap-1 rounded-full bg-purple-500 text-white', sizes[size], className)}><span>FEATURED</span></div>;
}

