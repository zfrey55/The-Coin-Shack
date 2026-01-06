import { mockHosts } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export async function GET() {
  // In production: fetch from database
  return NextResponse.json(mockHosts, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}

