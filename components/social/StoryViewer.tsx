'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Story } from '@/lib/types';
import { X } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface StoryViewerProps {
  story: Story;
  allStories: Story[];
  onClose: () => void;
  onStoryUpdate?: (story: Story) => void;
}

export function StoryViewer({ story, allStories, onClose, onStoryUpdate }: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(
    allStories.findIndex(s => s.id === story.id)
  );
  const [progress, setProgress] = useState(0);

  const currentStory = allStories[currentStoryIndex];

  useEffect(() => {
    if (!currentStory) {
      onClose();
      return;
    }

    setProgress(0);

    // Mark as viewed
    if (onStoryUpdate && currentStory) {
      const updatedStory = {
        ...currentStory,
        viewedBy: [...(currentStory.viewedBy || []), 'current-user'], // TODO: Use actual user ID
        views: (currentStory.views || 0) + 1,
      };
      onStoryUpdate(updatedStory);
    }

    // Progress bar animation (5 seconds)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 2; // Update every 100ms
      });
    }, 100);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStoryIndex, currentStory]);

  const handleNext = () => {
    if (currentStoryIndex < allStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    }
  };

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-black/30">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Story Image */}
      <div className="relative w-full h-full">
        <Image
          src={currentStory.image}
          alt={currentStory.userName}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center gap-3 z-10">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
          <Image
            src={currentStory.userAvatar}
            alt={currentStory.userName}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold">{currentStory.userName}</p>
          <p className="text-white/70 text-xs">{formatRelativeTime(currentStory.timestamp)}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Navigation */}
      <div className="absolute inset-0 flex">
        <button
          onClick={handlePrevious}
          className="flex-1"
          aria-label="Previous story"
        />
        <button
          onClick={handleNext}
          className="flex-1"
          aria-label="Next story"
        />
      </div>
    </div>
  );
}

