'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Story } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { StoryViewer } from './StoryViewer';
import { CreateStoryModal } from './CreateStoryModal';

interface StoriesBarProps {
  stories: Story[];
  onStoryUpdate?: (story: Story) => void;
}

export function StoriesBar({ stories, onStoryUpdate }: StoriesBarProps) {
  const { user } = useStore();
  const router = useRouter();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isCreatingStory, setIsCreatingStory] = useState(false);

  // Group stories by user
  const storiesByUser = stories.reduce((acc, story) => {
    if (!acc[story.userId]) {
      acc[story.userId] = {
        user: {
          id: story.userId,
          name: story.userName,
          avatar: story.userAvatar,
        },
        stories: [],
      };
    }
    acc[story.userId].stories.push(story);
    return acc;
  }, {} as Record<string, { user: { id: string; name: string; avatar: string }; stories: Story[] }>);

  const storyList = Object.values(storiesByUser);

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
  };

  const handleCloseViewer = () => {
    setSelectedStory(null);
  };

  if (storyList.length === 0 && !user) {
    return null;
  }

  return (
    <>
      <div className="mb-6">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
          {/* Create Story Button */}
          {user && (
            <div className="flex-shrink-0 w-20 text-center">
              <button
                onClick={() => setIsCreatingStory(true)}
                className="relative w-16 h-16 rounded-full border-2 border-dashed border-[var(--gold-primary)] flex items-center justify-center bg-card hover:bg-secondary transition-colors mb-1"
                aria-label="Create story"
              >
                <Plus className="w-6 h-6 text-[var(--gold-primary)]" />
              </button>
              <p className="text-xs text-muted-foreground truncate mt-1">Your Story</p>
            </div>
          )}

          {/* Stories */}
          {storyList.map(({ user: storyUser, stories: userStories }) => {
            const latestStory = userStories[0];
            const hasUnviewed = user && latestStory.viewedBy && !latestStory.viewedBy.includes(user.id);
            
            return (
              <div
                key={storyUser.id}
                className="flex-shrink-0 w-20 text-center cursor-pointer"
                onClick={() => handleStoryClick(latestStory)}
              >
                <div
                  className={cn(
                    'relative w-16 h-16 rounded-full p-0.5 mb-1 mx-auto',
                    hasUnviewed
                      ? 'bg-gradient-to-tr from-[var(--gold-primary)] via-pink-500 to-purple-500'
                      : 'border-2 border-border'
                  )}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-card">
                    <Image
                      src={storyUser.avatar}
                      alt={storyUser.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground truncate">{storyUser.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          allStories={stories}
          onClose={handleCloseViewer}
          onStoryUpdate={onStoryUpdate}
        />
      )}

      {isCreatingStory && (
        <CreateStoryModal
          onClose={() => setIsCreatingStory(false)}
          onStoryCreated={(story) => {
            setIsCreatingStory(false);
            onStoryUpdate?.(story);
          }}
        />
      )}
    </>
  );
}

