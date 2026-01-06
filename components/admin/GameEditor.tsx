'use client';
import { useState } from 'react';
import { Game } from '@/lib/types';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { formatCurrency } from '@/lib/utils';

interface GameEditorProps {
  game: Game;
  onSave?: (game: Game) => void;
  onCancel?: () => void;
}

export function GameEditor({ game, onSave, onCancel }: GameEditorProps) {
  const [editedGame, setEditedGame] = useState(game);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(editedGame);
  };

  return (
    <LuxuryCard variant="elevated" className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Game Name
          </label>
          <input
            id="name"
            type="text"
            value={editedGame.name}
            onChange={(e) => setEditedGame({ ...editedGame, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-[var(--input-background)] border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)]/50"
            required
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-foreground mb-2">
            Game Type
          </label>
          <select
            id="type"
            value={editedGame.type}
            onChange={(e) => setEditedGame({ ...editedGame, type: e.target.value as Game['type'] })}
            className="w-full px-4 py-2 rounded-lg bg-[var(--input-background)] border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)]/50"
            required
          >
            <option value="Coin Flip">Coin Flip</option>
            <option value="Case Break">Case Break</option>
            <option value="Auction">Auction</option>
            <option value="Mystery Box">Mystery Box</option>
          </select>
        </div>
        <div>
          <label htmlFor="prizePool" className="block text-sm font-medium text-foreground mb-2">
            Prize Pool
          </label>
          <input
            id="prizePool"
            type="number"
            value={editedGame.prizePool || 0}
            onChange={(e) => setEditedGame({ ...editedGame, prizePool: Number(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg bg-[var(--input-background)] border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)]/50"
            min="0"
            step="0.01"
          />
          {editedGame.prizePool && (
            <p className="text-sm text-muted-foreground mt-1">{formatCurrency(editedGame.prizePool)}</p>
          )}
        </div>
        <div className="flex items-center gap-3 pt-4">
          <LuxuryButton type="submit" variant="gold">
            Save Changes
          </LuxuryButton>
          <LuxuryButton type="button" variant="outline" onClick={onCancel}>
            Cancel
          </LuxuryButton>
        </div>
      </form>
    </LuxuryCard>
  );
}

