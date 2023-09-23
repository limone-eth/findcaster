import { NextResponse } from 'next/server';

import { pineconeOpenAI, pineconeQueryDocs, queryProfilesOnPinecone } from '@/models/pinecone/services/PineconeService';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  // Process a GET request
  const { searchParams } = new URL(req.url);

  const query = searchParams.get('query');
  const textQuery = searchParams.get('textQuery');
  const textQueryAI = searchParams.get('textQueryAI');
  const topK = searchParams.get('topK') ? parseInt(searchParams.get('topK'), 10) : 5;
  if (textQuery) {
    const results = await pineconeQueryDocs(textQuery, topK);
    return NextResponse.json(results);
  }
  if (textQueryAI) {
    const results = await pineconeOpenAI(textQueryAI, topK);
    return NextResponse.json(results);
  }
  const results = await queryProfilesOnPinecone(query, topK);
  return NextResponse.json(results);
  /* const farcasterProfileService = new FarcasterProfileService(supabaseClient);
  const username = searchParams.get('username');
  if (username) {
    const profile = await farcasterProfileService.getByUsername(username);
    if (!profile) {
      return NextResponse.json({ error: { message: 'User not found' } }, { status: 404 });
    }
    const topK = searchParams.get('topK') ? parseInt(searchParams.get('topK'), 10) : 10;
    const results = await searchSimilarProfileOnPinecone(profile, topK);
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
  } */
}
