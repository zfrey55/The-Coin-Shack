'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LuxuryCard } from './LuxuryCard';
import { LuxuryBadge } from './LuxuryBadge';
import { Stream } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Eye, Clock } from 'lucide-react';

interface StreamCardProps {
  stream: Stream;
  className?: string;
}

export function StreamCard({ stream, className }: StreamCardProps) {
  const router = useRouter();

  return (
    <LuxuryCard
      variant="elevated"
      texture
      onClick={() => router.push(`/host/${stream.hostId}`)}
      className={cn('overflow-hidden', className)}
    >
      <div className="relative aspect-video bg-muted">
        {stream.thumbnail ? (
          <Image
            src={stream.thumbnail}
            alt={stream.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--gold-muted)]/20 to-transparent">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--gold-primary)]/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🪙</span>
              </div>
            </div>
          </div>
        )}
        {stream.isLive && (
          <div className="absolute top-3 left-3">
            <LuxuryBadge variant="live" />
          </div>
        )}
        {stream.viewers !== undefined && stream.isLive && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-white text-sm">
            <Eye className="w-3 h-3" />
            <span>{stream.viewers}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[var(--gold-secondary)]/30">
            <Image
              src={stream.hostAvatar}
              alt={stream.hostName}
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <span className="text-sm font-medium text-foreground">{stream.hostName}</span>
        </div>
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{stream.title}</h3>
        {stream.startsIn && !stream.isLive && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Starts in {stream.startsIn}</span>
          </div>
        )}
      </div>
    </LuxuryCard>
  );
}

