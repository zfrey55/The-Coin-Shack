'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { LuxuryInput } from '@/components/luxury/LuxuryInput';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Post } from '@/lib/types';
import { X, Loader2 } from 'lucide-react';

interface CreatePostModalProps {
  onClose: () => void;
  onPostCreated: (post: Post) => void;
}

export function CreatePostModal({ onClose, onPostCreated }: CreatePostModalProps) {
  const { user } = useStore();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleCreate = async () => {
    if (!content.trim() || !user) {
      alert('Please add some content');
      return;
    }

    setUploading(true);

    try {
      const newPost: Post = {
        id: Date.now().toString(),
        authorId: user.id,
        authorName: user.name,
        authorAvatar: user.avatar || '',
        authorIsVip: user.role === 'vip' || user.role === 'admin',
        authorIsHost: false, // TODO: Check if user is a host
        content: content.trim(),
        image: image || undefined,
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        likedBy: [],
      };

      // TODO: Save to Firestore
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

      onPostCreated(newPost);
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post');
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <LuxuryCard variant="elevated" className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold text-foreground">Create Post</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              What's on your mind?
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full px-4 py-2.5 rounded-lg border-2 border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[var(--gold-primary)] focus:ring-2 focus:ring-[var(--gold-primary)]/20 transition-all duration-200 min-h-[120px] resize-none"
              rows={4}
            />
          </div>

          <ImageUpload
            currentImage={image || undefined}
            onImageChange={setImage}
            label="Add Photo (Optional)"
          />

          <div className="flex gap-3">
            <LuxuryButton variant="outline" onClick={onClose} className="flex-1" disabled={uploading}>
              Cancel
            </LuxuryButton>
            <LuxuryButton
              variant="gold"
              onClick={handleCreate}
              className="flex-1"
              disabled={!content.trim() || uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post'
              )}
            </LuxuryButton>
          </div>
        </div>
      </LuxuryCard>
    </div>
  );
}

