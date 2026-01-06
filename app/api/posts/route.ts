import { mockPosts } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export async function GET() {
  // In production: fetch from database
  return NextResponse.json(mockPosts, {
    headers: {
      'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30',
    },
  });
}

