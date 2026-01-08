'use client';
import { Suspense } from 'react';
import { ExploreContent } from '@/components/screens/ExploreContent';

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-6">Loading...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
