'use client';
import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { EditShowModal } from '@/components/admin/EditShowModal';
import { mockStreams, mockHosts } from '@/lib/mock-data';
import { Stream } from '@/lib/types';
import { updateStream } from '@/lib/firestore';
import { Edit, Plus } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

// Map user IDs to host IDs (breakers)
const USER_TO_HOST_MAP: Record<string, string> = {
  '1': '1', // Rari
  '2': '2', // Mike
  '3': '3', // Dom
  '4': '4', // Manu
};

export default function MyShowsPage() {
  const { user } = useStore();
  const router = useRouter();
  const [myShows, setMyShows] = useState<Stream[]>([]);
  const [editingShow, setEditingShow] = useState<Stream | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Check if user is a breaker
    const hostId = USER_TO_HOST_MAP[user.id];
    if (!hostId) {
      // User is not a breaker, redirect
      toast.error('You do not have permission to manage shows');
      router.push('/');
      return;
    }

    // Filter shows for this breaker
    const breakerShows = mockStreams.filter(s => s.hostId === hostId);
    setMyShows(breakerShows);
  }, [user, router]);

  const handleEdit = (stream: Stream) => {
    setEditingShow(stream);
    setIsModalOpen(true);
  };

  const handleSave = async (showId: string, data: Partial<Stream>) => {
    try {
      await updateStream(showId, data);
      
      setMyShows(myShows.map(s => 
        s.id === showId ? { ...s, ...data } : s
      ));
      
      toast.success('Show updated successfully');
      setIsModalOpen(false);
      setEditingShow(null);
    } catch (error) {
      console.error('Error updating show:', error);
      toast.error('Error updating show');
      throw error;
    }
  };

  if (!user) {
    return null;
  }

  const host = mockHosts.find(h => h.id === USER_TO_HOST_MAP[user.id]);

  return (
    <div className="container mx-auto px-4 py-6 pb-24 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">My Shows</h1>
          {host && (
            <p className="text-muted-foreground mt-1">
              Manage shows for {host.name}
            </p>
          )}
        </div>
        <LuxuryButton variant="gold" onClick={() => {
          toast.info('Create new show feature coming soon');
        }}>
          <Plus className="w-4 h-4" />
          New Show
        </LuxuryButton>
      </div>

      {myShows.length === 0 ? (
        <LuxuryCard variant="elevated" className="p-12 text-center">
          <p className="text-muted-foreground mb-4">You don't have any shows yet.</p>
          <LuxuryButton variant="gold" onClick={() => {
            toast.info('Create new show feature coming soon');
          }}>
            <Plus className="w-4 h-4" />
            Create Your First Show
          </LuxuryButton>
        </LuxuryCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myShows.map((show) => (
            <LuxuryCard key={show.id} variant="elevated" className="overflow-hidden">
              <div className="relative aspect-video bg-muted">
                {show.thumbnail ? (
                  <Image
                    src={show.thumbnail}
                    alt={show.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--gold-muted)]/20 to-transparent">
                    <span className="text-4xl">🪙</span>
                  </div>
                )}
                {show.isLive && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    LIVE
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{show.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <span>{show.startsIn || 'No schedule'}</span>
                  {show.viewers !== undefined && (
                    <span>{show.viewers} viewers</span>
                  )}
                </div>
                <LuxuryButton
                  variant="outline"
                  className="w-full"
                  onClick={() => handleEdit(show)}
                >
                  <Edit className="w-4 h-4" />
                  Edit Show
                </LuxuryButton>
              </div>
            </LuxuryCard>
          ))}
        </div>
      )}

      <EditShowModal
        show={editingShow}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingShow(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}

