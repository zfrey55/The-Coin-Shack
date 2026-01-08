'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { LuxuryBadge } from '@/components/luxury/LuxuryBadge';
import { Post, Comment } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { CommentsModal } from './CommentsModal';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, content: string) => void;
}

export function PostCard({ post, onLike, onComment }: PostCardProps) {
  const { user } = useStore();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(
    user ? post.likedBy?.includes(user.id) || false : false
  );
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setIsLiked(!isLiked);
    setLikeCount((prev) => isLiked ? prev - 1 : prev + 1);
    onLike?.(post.id);
  };

  const handleCommentClick = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setShowComments(true);
  };

  return (
    <>
      <LuxuryCard variant="elevated" className="overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 pb-3">
          <button
            onClick={() => router.push(`/host/${post.authorId}`)}
            className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--gold-secondary)]/30 flex-shrink-0"
          >
            <Image
              src={post.authorAvatar}
              alt={post.authorName}
              fill
              className="object-cover"
              sizes="48px"
            />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push(`/host/${post.authorId}`)}
                className="font-semibold text-foreground hover:opacity-80"
              >
                {post.authorName}
              </button>
              {post.authorIsVip && <LuxuryBadge variant="vip" size="sm" />}
              {post.authorIsHost && <LuxuryBadge variant="host" size="sm" />}
            </div>
            <p className="text-sm text-muted-foreground">{formatRelativeTime(post.timestamp)}</p>
          </div>
          <button
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="More options"
          >
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pb-3">
          <p className="text-foreground whitespace-pre-wrap break-words">{post.content}</p>
        </div>

        {/* Image */}
        {post.image && (
          <div className="relative w-full aspect-square bg-muted">
            <Image
              src={post.image}
              alt="Post image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority={false}
            />
          </div>
        )}

        {/* Actions */}
        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={cn(
                'flex items-center gap-2 text-sm transition-colors min-h-[44px] min-w-[44px]',
                isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'
              )}
              aria-label={`Like post by ${post.authorName}`}
            >
              <Heart className={cn('w-5 h-5 transition-all', isLiked && 'fill-current scale-110')} />
              <span className="font-medium">{likeCount}</span>
            </button>
            <button
              onClick={handleCommentClick}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px]"
              aria-label={`Comment on post by ${post.authorName}`}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{post.comments}</span>
            </button>
            <button
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px]"
              aria-label={`Share post by ${post.authorName}`}
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </LuxuryCard>

      {showComments && (
        <CommentsModal
          post={post}
          onClose={() => setShowComments(false)}
          onComment={onComment}
        />
      )}
    </>
  );
}

