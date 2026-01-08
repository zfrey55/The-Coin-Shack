'use client';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SearchBar } from '@/components/luxury/SearchBar';
import { StreamCard } from '@/components/luxury/StreamCard';
import { HostCard } from '@/components/luxury/HostCard';
import { PriceIndicator } from '@/components/luxury/PriceIndicator';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { mockStreams, mockHosts, mockGames, mockSpotPrices } from '@/lib/mock-data';
import { Game } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { ExternalLink, TrendingUp } from 'lucide-react';

function GameCard({ game }: { game: Game }) {
  return (
    <LuxuryCard variant="bordered" className="p-4 min-w-[280px]">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-foreground">{game.name}</h4>
          <p className="text-sm text-muted-foreground">{game.type}</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{game.participants} participants</span>
        {game.prizePool && (
          <span className="font-semibold text-[var(--gold-primary)]">{formatCurrency(game.prizePool)}</span>
        )}
      </div>
    </LuxuryCard>
  );
}

export function HomeContent() {
  const liveStreams = mockStreams.filter(s => s.isLive);
  const upcomingStreams = mockStreams.filter(s => !s.isLive);

  return (
    <div className="container mx-auto px-4 py-6 pb-24 space-y-6">
      {/* Header with Logo */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 texture-overlay"
      >
        <div className="relative inline-block mb-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground gold-shimmer">
            The Coin Shack
          </h1>
        </div>
        <p className="text-muted-foreground">Luxury Live Coin Streaming & Commerce</p>
      </motion.header>

      {/* Search Bar */}
      <SearchBar />

      {/* Live Streams */}
      {liveStreams.length > 0 && (
        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Live Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveStreams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Streams */}
      {upcomingStreams.length > 0 && (
        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Upcoming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingStreams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Hosts */}
      <section>
        <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Featured Hosts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockHosts.map((host) => (
            <HostCard key={host.id} host={host} />
          ))}
        </div>
      </section>

      {/* Games Running Today */}
      {mockGames.length > 0 && (
        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Games Running Today</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4">
              {mockGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spot Pricing */}
      <section>
        <LuxuryCard variant="gold" texture className="p-6">
          <h2 className="text-2xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[var(--gold-primary)]" />
            Spot Prices
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockSpotPrices.map((price) => (
              <PriceIndicator key={price.metal} price={price} />
            ))}
          </div>
        </LuxuryCard>
      </section>

      {/* Promotional Purchase Card */}
      <section>
        <LuxuryCard variant="gold" texture className="p-6 gold-shimmer">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-display font-semibold text-foreground mb-2">
                Premium Coin Collection
              </h3>
              <p className="text-muted-foreground mb-4">
                Discover rare coins and exclusive collections from trusted dealers
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <LuxuryButton variant="gold" shimmer asChild>
                  <a href="https://shackpck.com" target="_blank" rel="noopener noreferrer">
                    Shop Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </LuxuryButton>
                <LuxuryButton variant="outline" asChild>
                  <a href="https://whatnot.com/user/thecoinshack" target="_blank" rel="noopener noreferrer">
                    View on Whatnot
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </LuxuryButton>
              </div>
            </div>
            <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1643393670577-b214e610c8f8?w=600"
                alt="Premium coins"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 192px"
              />
            </div>
          </div>
        </LuxuryCard>
      </section>
    </div>
  );
}

