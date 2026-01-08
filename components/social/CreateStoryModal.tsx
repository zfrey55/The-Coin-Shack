'use client';
import { useState, useRef } from 'react';
import { useStore } from '@/lib/store';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Story } from '@/lib/types';
import { X, Loader2 } from 'lucide-react';

interface CreateStoryModalProps {
  onClose: () => void;
  onStoryCreated: (story: Story) => void;
}

export function CreateStoryModal({ onClose, onStoryCreated }: CreateStoryModalProps) {
  const { user } = useStore();
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleCreate = async () => {
    if (!image || !user) {
      alert('Please add an image');
      return;
    }

    setUploading(true);

    try {
      const newStory: Story = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar || '',
        image,
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        views: 0,
        viewedBy: [],
      };

      // TODO: Save to Firestore
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

      onStoryCreated(newStory);
    } catch (error) {
      console.error('Error creating story:', error);
      alert('Error creating story');
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <LuxuryCard variant="elevated" className="w-full max-w-md">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold text-foreground">Create Story</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <ImageUpload
            currentImage={image || undefined}
            onImageChange={setImage}
            label="Story Image"
          />

          <div className="flex gap-3">
            <LuxuryButton variant="outline" onClick={onClose} className="flex-1" disabled={uploading}>
              Cancel
            </LuxuryButton>
            <LuxuryButton
              variant="gold"
              onClick={handleCreate}
              className="flex-1"
              disabled={!image || uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post Story'
              )}
            </LuxuryButton>
          </div>
        </div>
      </LuxuryCard>
    </div>
  );
}

