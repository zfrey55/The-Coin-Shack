'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LuxuryCard } from './LuxuryCard';
import { LuxuryBadge } from './LuxuryBadge';
import { Host } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';

interface HostCardProps {
  host: Host;
  className?: string;
}

export function HostCard({ host, className }: HostCardProps) {
  const router = useRouter();

  return (
    <LuxuryCard
      variant="elevated"
      texture
      onClick={() => router.push(`/host/${host.id}`)}
      className={cn('p-4', className)}
    >
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--gold-secondary)]/30">
            <Image
              src={host.avatar}
              alt={host.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          {host.isLive && (
            <div className="absolute -top-1 -right-1">
              <LuxuryBadge variant="live" size="sm" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{host.name}</h3>
            {host.isVip && <LuxuryBadge variant="vip" size="sm" />}
          </div>
          {host.bio && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{host.bio}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {host.followers !== undefined && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{host.followers.toLocaleString()}</span>
              </div>
            )}
            {host.nextLiveTime && !host.isLive && (
              <span>Live in {host.nextLiveTime}</span>
            )}
          </div>
        </div>
      </div>
    </LuxuryCard>
  );
}

