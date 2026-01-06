'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <LuxuryCard variant="elevated" texture className="p-12 text-center max-w-md">
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">Something went wrong!</h1>
        <p className="text-muted-foreground mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <LuxuryButton variant="gold" shimmer onClick={reset}>
            Try Again
          </LuxuryButton>
          <LuxuryButton variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </LuxuryButton>
        </div>
      </LuxuryCard>
    </div>
  );
}

