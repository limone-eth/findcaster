import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import { NextResponse } from 'next/server';

import supabaseClient from '@/modules/application/utils/supabaseClient';

export async function GET(req: Request) {
  // Process a GET request
  const { searchParams } = new URL(req.url);

  const name = searchParams.get('name');
  const limit: number = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : 10;
  const page: number = searchParams.get('page') ? parseInt(searchParams.get('page'), 10) : 0;

  const { data, error } = await supabaseClient
    .from('poap_events')
    .select('id, event_name, event_url, image_url')
    .textSearch('event_name', `${name}:*`)
    .range(page * limit, (page + 1) * limit - 1)
    .limit(limit);
  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json(data);
}
