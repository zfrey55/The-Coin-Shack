import { mockStreams } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export async function GET() {
  // In production: fetch from database
  return NextResponse.json(mockStreams, {
    headers: {
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
    },
  });
}

