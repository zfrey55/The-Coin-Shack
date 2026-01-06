import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface LuxuryCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated' | 'gold';
  texture?: boolean;
  onClick?: () => void;
}

export function LuxuryCard({ children, className, variant = 'default', texture = false, onClick }: LuxuryCardProps) {
  const variants = {
    default: 'bg-card border border-border',
    bordered: 'bg-card border-2 border-[var(--gold-secondary)]/30',
    elevated: 'bg-card shadow-lg hover:shadow-xl',
    gold: 'bg-gradient-to-br from-[var(--gold-muted)]/10 to-transparent border border-[var(--gold-secondary)]/40 gold-glow',
  };
  
  return <div className={cn('rounded-xl overflow-hidden transition-all duration-300', variants[variant], texture && 'texture-overlay', onClick && 'cursor-pointer hover:scale-[1.02]', className)} onClick={onClick}>{children}</div>;
}

