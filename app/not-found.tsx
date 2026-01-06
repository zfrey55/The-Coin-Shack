import Link from 'next/link';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <LuxuryCard variant="elevated" texture className="p-12 text-center max-w-md">
        <h1 className="text-6xl font-display font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-display font-semibold text-foreground mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <LuxuryButton variant="gold" shimmer asChild>
          <Link href="/">Go Home</Link>
        </LuxuryButton>
      </LuxuryCard>
    </div>
  );
}

