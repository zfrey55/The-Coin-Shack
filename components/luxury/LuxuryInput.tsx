import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface LuxuryInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const LuxuryInput = forwardRef<HTMLInputElement, LuxuryInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border-2 border-border bg-input-background',
          'text-foreground placeholder:text-muted-foreground',
          'focus:outline-none focus:border-[var(--gold-primary)] focus:ring-2 focus:ring-[var(--gold-primary)]/20',
          'transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
    );
  }
);

LuxuryInput.displayName = 'LuxuryInput';

