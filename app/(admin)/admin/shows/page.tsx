import { ManageShowsTable } from '@/components/admin/ManageShowsTable';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { mockStreams } from '@/lib/mock-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Shows - Admin - The Coin Shack',
  description: 'Admin panel for managing shows',
};

export default function AdminShowsPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-display font-bold text-foreground">Manage Shows</h1>
      <LuxuryCard variant="elevated" className="p-6">
        <ManageShowsTable streams={mockStreams} />
      </LuxuryCard>
    </div>
  );
}

