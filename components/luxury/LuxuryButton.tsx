import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface LuxuryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  shimmer?: boolean;
  children?: ReactNode;
  asChild?: boolean;
}

export function LuxuryButton({ variant = 'primary', size = 'md', shimmer = false, className, children, ...props }: LuxuryButtonProps) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    gold: 'bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold-primary)] text-white hover:from-[var(--gold-primary)] hover:to-[var(--gold-dark)] shadow-lg shadow-[var(--gold-primary)]/20',
    outline: 'border-2 border-[var(--gold-secondary)] text-foreground hover:bg-[var(--gold-secondary)]/10',
    ghost: 'text-foreground hover:bg-secondary',
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5', lg: 'px-6 py-3.5 text-lg' };
  
  return (
    <button className={cn('inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden font-medium', variants[variant], sizes[size], shimmer && 'gold-shimmer', className)} {...props}>
      {children}
    </button>
  );
}

