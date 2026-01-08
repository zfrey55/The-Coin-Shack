'use client';
import { useState } from 'react';
import { ManageShowsTable } from '@/components/admin/ManageShowsTable';
import { EditShowModal } from '@/components/admin/EditShowModal';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { mockStreams } from '@/lib/mock-data';
import { Stream } from '@/lib/types';
import { updateStream } from '@/lib/firestore';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminShowsPage() {
  const [streams, setStreams] = useState<Stream[]>(mockStreams);
  const [editingShow, setEditingShow] = useState<Stream | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (stream: Stream) => {
    setEditingShow(stream);
    setIsModalOpen(true);
  };

  const handleDelete = async (streamId: string) => {
    if (!confirm('Are you sure you want to delete this show?')) return;
    
    try {
      // TODO: Implement delete in Firestore
      setStreams(streams.filter(s => s.id !== streamId));
      toast.success('Show deleted successfully');
    } catch (error) {
      console.error('Error deleting show:', error);
      toast.error('Error deleting show');
    }
  };

  const handleSave = async (showId: string, data: Partial<Stream>) => {
    try {
      // Update in Firestore (or mock data for now)
      await updateStream(showId, data);
      
      // Update local state
      setStreams(streams.map(s => 
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

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-foreground">Manage Shows</h1>
        <LuxuryButton variant="gold" onClick={() => {
          // TODO: Implement create new show
          toast.info('Create new show feature coming soon');
        }}>
          <Plus className="w-4 h-4" />
          New Show
        </LuxuryButton>
      </div>
      
      <LuxuryCard variant="elevated" className="p-6">
        <ManageShowsTable 
          streams={streams} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </LuxuryCard>

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

