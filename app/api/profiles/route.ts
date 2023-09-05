import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import { NextResponse } from 'next/server';

import { searchSimilarProfileOnPinecone } from '@/app/lib/pinecone';
import { ProfileInterface } from '@/models/farcaster/interfaces/ProfileInterface';
import { FarcasterProfileService } from '@/models/farcaster/services/FarcasterProfileService';
import supabaseClient from '@/modules/application/utils/supabaseClient';

export async function GET(req: Request) {
  // Process a GET request
  const { searchParams } = new URL(req.url);
  const farcasterProfileService = new FarcasterProfileService(supabaseClient);
  const username = searchParams.get('username');
  if (username) {
    const user = await farcasterProfileService.getByUsername(username);
    if (!user) {
      return NextResponse.json({ error: { message: 'User not found' } }, { status: 404 });
    }
    const results = await searchSimilarProfileOnPinecone(user);
    return NextResponse.json(results);
  }

  const poapEventIds = searchParams.getAll('poapEventId');
  const interest = searchParams.getAll('interest');

  const limit: number = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : 10;
  const page: number = searchParams.get('page') ? parseInt(searchParams.get('page'), 10) : 0;
  const orderBy: string = searchParams.get('orderBy') ? searchParams.get('orderBy') : 'id';
  const orderDir: string = searchParams.get('orderDir') ? searchParams.get('orderDir') : 'asc';

  try {
    const data = await farcasterProfileService.query(interest, poapEventIds, {
      page,
      limit,
      orderBy: orderBy as Partial<ProfileInterface>,
      orderDir: orderDir as 'asc' | 'desc',
    });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
