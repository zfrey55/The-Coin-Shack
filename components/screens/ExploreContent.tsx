'use client';
import { useState } from 'react';
import { SearchBar } from '@/components/luxury/SearchBar';
import { StreamCard } from '@/components/luxury/StreamCard';
import { HostCard } from '@/components/luxury/HostCard';
import { mockStreams, mockHosts } from '@/lib/mock-data';
import { Filter, Grid3x3, List } from 'lucide-react';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';

export function ExploreContent() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['All', 'Live', 'Upcoming', 'Hosts', 'Games'];

  const filteredStreams = selectedCategory === 'All' || !selectedCategory
    ? mockStreams
    : selectedCategory === 'Live'
    ? mockStreams.filter(s => s.isLive)
    : selectedCategory === 'Upcoming'
    ? mockStreams.filter(s => !s.isLive)
    : mockStreams;

  return (
    <div className="container mx-auto px-4 py-6 pb-24 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-foreground">Explore</h1>
        <div className="flex items-center gap-2">
          <LuxuryButton
            variant={viewMode === 'grid' ? 'gold' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <Grid3x3 className="w-4 h-4" />
          </LuxuryButton>
          <LuxuryButton
            variant={viewMode === 'list' ? 'gold' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </LuxuryButton>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {categories.map((category) => (
          <LuxuryButton
            key={category}
            variant={selectedCategory === category || (!selectedCategory && category === 'All') ? 'gold' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category === 'All' ? null : category)}
          >
            {category}
          </LuxuryButton>
        ))}
      </div>

      {/* Content */}
      {(selectedCategory === 'All' || !selectedCategory || selectedCategory === 'Live' || selectedCategory === 'Upcoming') && (
        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
            {selectedCategory === 'Live' ? 'Live Streams' : selectedCategory === 'Upcoming' ? 'Upcoming Streams' : 'All Streams'}
          </h2>
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
            {filteredStreams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </section>
      )}

      {selectedCategory === 'Hosts' && (
        <section>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Featured Hosts</h2>
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
            {mockHosts.map((host) => (
              <HostCard key={host.id} host={host} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
