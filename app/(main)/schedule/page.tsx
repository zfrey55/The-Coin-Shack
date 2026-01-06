import { ScheduleContent } from '@/components/screens/ScheduleContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule - The Coin Shack',
  description: 'View upcoming shows and events',
};

export default function SchedulePage() {
  return <ScheduleContent />;
}

