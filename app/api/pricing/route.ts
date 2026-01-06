import { mockSpotPrices } from '@/lib/mock-data';
import { NextResponse } from 'next/server';

export async function GET() {
  // In production: fetch from real pricing API
  // Rate limiting placeholder
  if (process.env.NODE_ENV === 'production') {
    // Add rate limiting logic here
  }

  return NextResponse.json(mockSpotPrices, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}

