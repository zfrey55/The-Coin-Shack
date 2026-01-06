'use client';
import { useState } from 'react';
import Image from 'next/image';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { LuxuryBadge } from '@/components/luxury/LuxuryBadge';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { mockStreams, mockHosts } from '@/lib/mock-data';
import { Stream } from '@/lib/types';
import { formatTime } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Calendar, List, Filter } from 'lucide-react';

type ViewMode = 'list' | 'calendar';

export function ScheduleContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedHost, setSelectedHost] = useState<string | null>(null);
  const [selectedGameType, setSelectedGameType] = useState<string | null>(null);

  const filteredStreams = mockStreams.filter(stream => {
    if (selectedHost && stream.hostId !== selectedHost) return false;
    return true;
  });

  const today = new Date();
  const todayStreams = filteredStreams.filter(s => !s.isLive);

  return (
    <div className="container mx-auto px-4 py-6 pb-24 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-foreground">Schedule</h1>
        <div className="flex items-center gap-2">
          <LuxuryButton
            variant={viewMode === 'list' ? 'gold' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </LuxuryButton>
          <LuxuryButton
            variant={viewMode === 'calendar' ? 'gold' : 'outline'}
            size="sm"
            onClick={() => setViewMode('calendar')}
            aria-label="Calendar view"
          >
            <Calendar className="w-4 h-4" />
          </LuxuryButton>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filter:</span>
        </div>
        <select
          value={selectedHost || ''}
          onChange={(e) => setSelectedHost(e.target.value || null)}
          className="px-4 py-2 rounded-lg bg-[var(--input-background)] border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)]/50"
        >
          <option value="">All Hosts</option>
          {mockHosts.map(host => (
            <option key={host.id} value={host.id}>{host.name}</option>
          ))}
        </select>
        <select
          value={selectedGameType || ''}
          onChange={(e) => setSelectedGameType(e.target.value || null)}
          className="px-4 py-2 rounded-lg bg-[var(--input-background)] border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)]/50"
        >
          <option value="">All Game Types</option>
          <option value="Coin Flip">Coin Flip</option>
          <option value="Case Break">Case Break</option>
          <option value="Auction">Auction</option>
          <option value="Mystery Box">Mystery Box</option>
        </select>
      </div>

      {viewMode === 'list' ? (
        <>
          {/* Upcoming Shows Today */}
          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">
              Upcoming Shows Today
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todayStreams.map((stream) => (
                <LuxuryCard key={stream.id} variant="elevated" className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--gold-secondary)]/30 flex-shrink-0">
                      <Image
                        src={stream.hostAvatar}
                        alt={stream.hostName}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">{stream.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{stream.hostName}</p>
                      {stream.startsIn && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[var(--gold-primary)]">
                            Starts in {stream.startsIn}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </LuxuryCard>
              ))}
            </div>
          </section>

          {/* Weekly Schedule */}
          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">
              This Week
            </h2>
            <div className="space-y-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <LuxuryCard key={day} variant="bordered" className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">{day}</h3>
                  <div className="space-y-2">
                    {todayStreams.slice(0, 2).map((stream, idx) => (
                      <div key={`${day}-${idx}`} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--gold-secondary)]/30">
                          <Image
                            src={stream.hostAvatar}
                            alt={stream.hostName}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{stream.title}</p>
                          <p className="text-xs text-muted-foreground">{stream.hostName}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">2:00 PM</span>
                      </div>
                    ))}
                  </div>
                </LuxuryCard>
              ))}
            </div>
          </section>
        </>
      ) : (
        <LuxuryCard variant="elevated" className="p-12 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-display font-semibold text-foreground mb-2">Calendar View</h3>
          <p className="text-muted-foreground">Coming soon! Use list view for now.</p>
        </LuxuryCard>
      )}
    </div>
  );
}

