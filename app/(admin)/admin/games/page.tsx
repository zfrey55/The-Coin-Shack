import { GameEditor } from '@/components/admin/GameEditor';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { mockGames } from '@/lib/mock-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Games - Admin - The Coin Shack',
  description: 'Admin panel for managing games',
};

export default function AdminGamesPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-display font-bold text-foreground">Manage Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockGames.map((game) => (
          <GameEditor key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

