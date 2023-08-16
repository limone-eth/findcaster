import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import { NextResponse } from 'next/server';

import supabase from '@/app/lib/supabase';
import { FarcasterProfileService } from '@/models/farcaster/services/FarcasterProfileService';

export async function GET(req: Request) {
  // Process a GET request
  const { searchParams } = new URL(req.url);
  const farcasterProfileService = new FarcasterProfileService(supabase);
  const username = searchParams.get('username');
  if (username) {
    const user = await farcasterProfileService.getByUsername(username);
    if (!user) {
      return NextResponse.json({ error: { message: 'User not found' } }, { status: 404 });
    }
    return NextResponse.json([user]);
  }
  const poapEventIds = searchParams.getAll('poapEventId');
  // TODO: add support for nftContractAddress
  // const nftContractAddress = searchParams.getAll('nftContractAddress');
  const limit: number = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : 12;
  const page: number = searchParams.get('page') ? parseInt(searchParams.get('page'), 10) : 0;
  const orderBy: string = searchParams.get('orderBy') ? searchParams.get('orderBy') : 'id';
  const orderDir: string = searchParams.get('orderDir') ? searchParams.get('orderDir') : 'asc';

  const query = `
      * 
      ${poapEventIds?.length > 0 ? ',poap_events!inner(*)' : ''}
    `;

  const supabaseQuery = supabase.from('profile').select(query);

  if (poapEventIds?.length > 0) {
    supabaseQuery.in('poap_events.id', poapEventIds);
  }

  const { data, error } = await supabaseQuery
    .range(page * limit, (page + 1) * limit - 1)
    .order(orderBy, { ascending: orderDir === 'asc', nullsFirst: false })
    .limit(limit);
  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json(data);
}
