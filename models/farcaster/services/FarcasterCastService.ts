import { SupabaseClient } from '@supabase/supabase-js';

import { CastInterface } from '@/models/farcaster/interfaces/CastInterface';

export const TABLE_CAST_NAME = 'casts';

export class FarcasterCastService {
  supabaseClient: SupabaseClient = null;

  constructor(_supabaseClient: SupabaseClient) {
    this.supabaseClient = _supabaseClient;
  }

  async getByAuthorFid(authorFid: string, limit = 10): Promise<CastInterface[]> {
    if (!authorFid) {
      return null;
    }
    const { data, error } = await this.supabaseClient
      .from(TABLE_CAST_NAME)
      .select('hash, text')
      .eq('author_fid', authorFid)
      .limit(10)
      .order('published_at', { ascending: false });
    if (error) {
      return null;
    }
    return data as CastInterface[];
  }
}
