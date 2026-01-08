'use client';
import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { StoriesBar } from '@/components/social/StoriesBar';
import { PostCard } from '@/components/social/PostCard';
import { CreatePostModal } from '@/components/social/CreatePostModal';
import { LuxuryButton } from '@/components/luxury/LuxuryButton';
import { mockPosts, mockStories } from '@/lib/mock-data';
import { Post, Story } from '@/lib/types';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

// Mock stories - in production, fetch from Firestore
const mockStories: Story[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Rari',
    userAvatar: mockHosts[0].avatar,
    image: 'https://images.unsplash.com/photo-1643393670577-b214e610c8f8?w=800',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000),
    views: 42,
    viewedBy: [],
  },
  {
    id: '2',
    userId: '2',
    userName: 'Mike',
    userAvatar: mockHosts[1].avatar,
    image: 'https://images.unsplash.com/photo-1745655604884-dd4fad590504?w=800',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 19 * 60 * 60 * 1000),
    views: 28,
    viewedBy: [],
  },
];

export function ExploreContent() {
  const { user } = useStore();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handleLike = async (postId: string) => {
    // TODO: Update in Firestore
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            likes: post.likedBy?.includes(user?.id || '') ? post.likes - 1 : post.likes + 1,
            likedBy: post.likedBy?.includes(user?.id || '')
              ? post.likedBy.filter(id => id !== user?.id)
              : [...(post.likedBy || []), user?.id || ''],
          }
        : post
    ));
  };

  const handleComment = async (postId: string, content: string) => {
    // TODO: Save comment to Firestore
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: post.comments + 1 }
        : post
    ));
    toast.success('Comment posted');
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setIsCreatingPost(false);
    toast.success('Post created!');
  };

  const handleStoryUpdate = (updatedStory: Story) => {
    setStories(stories.map(s => s.id === updatedStory.id ? updatedStory : s));
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-24 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-display font-bold text-foreground">Explore</h1>
        {user && (
          <LuxuryButton
            variant="gold"
            onClick={() => setIsCreatingPost(true)}
            aria-label="Create post"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Post</span>
          </LuxuryButton>
        )}
      </div>

      {/* Stories */}
      <StoriesBar stories={stories} onStoryUpdate={handleStoryUpdate} />

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts yet. Be the first to post!</p>
            {user && (
              <LuxuryButton
                variant="gold"
                className="mt-4"
                onClick={() => setIsCreatingPost(true)}
              >
                <Plus className="w-4 h-4" />
                Create Post
              </LuxuryButton>
            )}
          </div>
        ) : (
          posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PostCard
                post={post}
                onLike={handleLike}
                onComment={handleComment}
              />
            </motion.div>
          ))
        )}
      </div>

      {/* Create Post Modal */}
      {isCreatingPost && (
        <CreatePostModal
          onClose={() => setIsCreatingPost(false)}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
}
