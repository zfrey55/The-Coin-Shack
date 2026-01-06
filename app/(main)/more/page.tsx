import { MoreContent } from '@/components/screens/MoreContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'More - The Coin Shack',
  description: 'Settings and account management',
};

export default function MorePage() {
  return <MoreContent />;
}

