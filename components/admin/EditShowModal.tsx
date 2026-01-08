'use client';
import { useState, useEffect } from 'react';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { LuxuryInput } from '@/components/luxury/LuxuryInput';
import { ImageUpload } from './ImageUpload';
import { Stream } from '@/lib/types';
import { X } from 'lucide-react';

interface EditShowModalProps {
  show: Stream | null;
  onClose: () => void;
  onSave: (showId: string, data: Partial<Stream>) => Promise<void>;
  isOpen: boolean;
}

export function EditShowModal({ show, onClose, onSave, isOpen }: EditShowModalProps) {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [startsIn, setStartsIn] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (show) {
      setTitle(show.title);
      setThumbnail(show.thumbnail || null);
      setStartsIn(show.startsIn || '');
      setIsLive(show.isLive);
    }
  }, [show]);

  if (!isOpen || !show) return null;

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    setSaving(true);
    try {
      await onSave(show.id, {
        title,
        thumbnail: thumbnail || undefined,
        startsIn: startsIn || undefined,
        isLive,
      });
      onClose();
    } catch (error) {
      console.error('Error saving show:', error);
      alert('Error saving show');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <LuxuryCard variant="elevated" className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Edit Show: {show.hostName}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Show Title
              </label>
              <LuxuryInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter show title"
              />
            </div>

            <ImageUpload
              currentImage={thumbnail || undefined}
              onImageChange={setThumbnail}
              label="Show Thumbnail"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Starts In (optional)
              </label>
              <LuxuryInput
                value={startsIn}
                onChange={(e) => setStartsIn(e.target.value)}
                placeholder="e.g., '1 hour', '30 minutes', 'Tomorrow'"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isLive"
                checked={isLive}
                onChange={(e) => setIsLive(e.target.checked)}
                className="w-4 h-4 rounded border-border"
              />
              <label htmlFor="isLive" className="text-sm font-medium text-foreground">
                Show is currently live
              </label>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <LuxuryButton variant="outline" onClick={onClose} disabled={saving}>
              Cancel
            </LuxuryButton>
            <LuxuryButton variant="gold" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </LuxuryButton>
          </div>
        </div>
      </LuxuryCard>
    </div>
  );
}

