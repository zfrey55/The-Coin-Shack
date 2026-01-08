'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { LuxuryInput } from '@/components/luxury/LuxuryInput';
import { Post, Comment } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';
import { X, Send, Heart } from 'lucide-react';
import Image from 'next/image';

interface CommentsModalProps {
  post: Post;
  onClose: () => void;
  onComment?: (postId: string, content: string) => void;
}

export function CommentsModal({ post, onClose, onComment }: CommentsModalProps) {
  const { user } = useStore();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]); // TODO: Fetch from Firestore

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      postId: post.id,
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar || '',
      content: comment,
      timestamp: new Date(),
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setComment('');
    onComment?.(post.id, newComment.content);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm">
      <LuxuryCard variant="elevated" className="w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-display font-bold text-foreground">Comments</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--gold-secondary)]/30 flex-shrink-0">
                  <Image
                    src={comment.authorAvatar}
                    alt={comment.authorName}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-secondary rounded-lg p-3">
                    <p className="font-semibold text-foreground text-sm">{comment.authorName}</p>
                    <p className="text-foreground mt-1 break-words">{comment.content}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-1 px-1">
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeTime(comment.timestamp)}
                    </span>
                    <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      Like
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {user && (
          <form onSubmit={handleSubmit} className="p-4 border-t border-border">
            <div className="flex gap-2">
              <LuxuryInput
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1"
              />
              <LuxuryButton
                type="submit"
                variant="gold"
                disabled={!comment.trim()}
                aria-label="Post comment"
              >
                <Send className="w-4 h-4" />
              </LuxuryButton>
            </div>
          </form>
        )}
      </LuxuryCard>
    </div>
  );
}

