'use client';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { LuxuryBadge } from '@/components/luxury/LuxuryBadge';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { StreamCard } from '@/components/luxury/StreamCard';
import { mockHosts, mockStreams, mockGames } from '@/lib/mock-data';
import { useStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { Share2, Users, Calendar } from 'lucide-react';

export default function HostPage() {
  const params = useParams();
  const hostId = params?.id as string;
  const router = useRouter();
  const { user, setUser } = useStore();
  const host = mockHosts.find(h => h.id === hostId);
  const hostStreams = mockStreams.filter(s => s.hostId === hostId);
  const hostGames = mockGames.filter(g => g.hostId === hostId);
  const isFollowing = user?.isFollowing?.includes(hostId) || false;

  if (!host) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Host not found</p>
        <LuxuryButton variant="outline" className="mt-4" onClick={() => router.push('/')}>
          Go Home
        </LuxuryButton>
      </div>
    );
  }

  const handleFollow = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    const newFollowing = isFollowing
      ? user.isFollowing?.filter(id => id !== hostId) || []
      : [...(user.isFollowing || []), hostId];
    setUser({ ...user, isFollowing: newFollowing });
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Banner */}
      <div className="relative h-48 bg-gradient-to-br from-[var(--gold-muted)]/20 to-transparent texture-overlay">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        {/* Avatar and Info */}
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
          <div className="relative">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-card shadow-lg">
              <Image
                src={host.avatar}
                alt={host.name}
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
            {host.isLive && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <LuxuryBadge variant="live" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-display font-bold text-foreground">{host.name}</h1>
              {host.isVip && <LuxuryBadge variant="vip" />}
            </div>
            {host.bio && (
              <p className="text-muted-foreground mb-4">{host.bio}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {host.followers !== undefined && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{host.followers.toLocaleString()} followers</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <LuxuryButton
                variant={isFollowing ? 'outline' : 'gold'}
                onClick={handleFollow}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </LuxuryButton>
              <LuxuryButton variant="outline">
                <Share2 className="w-4 h-4" />
                Share
              </LuxuryButton>
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="space-y-6">
          {/* Upcoming Shows */}
          {hostStreams.filter(s => !s.isLive).length > 0 && (
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Upcoming Shows
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hostStreams.filter(s => !s.isLive).map(stream => (
                  <StreamCard key={stream.id} stream={stream} />
                ))}
              </div>
            </section>
          )}

          {/* Past Shows */}
          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Past Shows</h2>
            <LuxuryCard variant="bordered" className="p-6 text-center">
              <p className="text-muted-foreground">No past shows available</p>
            </LuxuryCard>
          </section>

          {/* Games */}
          {hostGames.length > 0 && (
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Games</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hostGames.map(game => (
                  <LuxuryCard key={game.id} variant="elevated" className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">{game.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{game.type}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{game.participants} participants</span>
                      {game.prizePool && (
                        <span className="font-semibold text-[var(--gold-primary)]">
                          {formatCurrency(game.prizePool)}
                        </span>
                      )}
                    </div>
                  </LuxuryCard>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

