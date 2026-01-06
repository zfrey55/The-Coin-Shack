import { ChatsContent } from '@/components/screens/ChatsContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Feed - The Coin Shack',
  description: 'Connect with coin collectors and hosts',
};

export default function ChatsPage() {
  return <ChatsContent />;
}

