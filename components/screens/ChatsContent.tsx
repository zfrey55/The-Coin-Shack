'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LuxuryCard } from '@/components/luxury/LuxuryCard';
import { LuxuryBadge } from '@/components/luxury/LuxuryBadge';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { mockPosts } from '@/lib/mock-data';
import { Post } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
}

function PostCard({ post, onLike }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev: number) => isLiked ? prev - 1 : prev + 1);
    onLike?.(post.id);
  };

  return (
    <LuxuryCard variant="elevated" className="p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--gold-secondary)]/30 flex-shrink-0">
          <Image
            src={post.authorAvatar}
            alt={post.authorName}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground">{post.authorName}</span>
            {post.authorIsVip && <LuxuryBadge variant="vip" size="sm" />}
            {post.authorIsHost && <LuxuryBadge variant="host" size="sm" />}
          </div>
          <p className="text-sm text-muted-foreground">{formatRelativeTime(post.timestamp)}</p>
        </div>
      </div>
      <p className="text-foreground mb-3 whitespace-pre-wrap">{post.content}</p>
      {post.image && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3 bg-muted">
          <Image
            src={post.image}
            alt="Post image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}
      <div className="flex items-center gap-4 pt-3 border-t border-border">
        <button
          onClick={handleLike}
          className={cn(
            'flex items-center gap-2 text-sm transition-colors min-h-[44px] min-w-[44px]',
            isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'
          )}
          aria-label={`Like post by ${post.authorName}`}
        >
          <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
          <span>{likeCount}</span>
        </button>
        <button
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px]"
          aria-label={`Comment on post by ${post.authorName}`}
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments}</span>
        </button>
        <button
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px]"
          aria-label={`Share post by ${post.authorName}`}
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </LuxuryCard>
  );
}

const tabs = [
  { id: 'all', label: 'All Posts' },
  { id: 'following', label: 'Following' },
  { id: 'hosts', label: 'Hosts Only' },
] as const;

type TabId = typeof tabs[number]['id'];

export function ChatsContent() {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [posts, setPosts] = useState(mockPosts);

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'following') {
      // In real app, check if user is following the author
      return false; // Placeholder
    }
    if (activeTab === 'hosts') {
      return post.authorIsHost;
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-6 pb-24 space-y-6">
      <h1 className="text-3xl font-display font-bold text-foreground">Community Feed</h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors border-b-2 border-transparent min-h-[44px]',
              activeTab === tab.id
                ? 'text-[var(--gold-primary)] border-[var(--gold-primary)]'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))
        ) : (
          <LuxuryCard variant="default" className="p-12 text-center">
            <p className="text-muted-foreground">No posts found. Check back later!</p>
          </LuxuryCard>
        )}
      </div>

      {/* Infinite Scroll Placeholder */}
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">Loading more posts...</p>
      </div>
    </div>
  );
}

