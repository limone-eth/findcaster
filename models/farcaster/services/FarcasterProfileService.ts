import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { SupabaseClient } from '@supabase/supabase-js';

import { ProfileInterface } from '@/models/farcaster/interfaces/ProfileInterface';
import supabaseClient from '@/modules/application/utils/supabaseClient';

export const TABLE_PROFILE_NAME = 'profile';

export class FarcasterProfileService {
  supabaseClient: SupabaseClient = null;

  constructor(_supabaseClient: SupabaseClient) {
    this.supabaseClient = _supabaseClient;
  }

  async getById(id: number): Promise<ProfileInterface> {
    const { data, error } = await this.supabaseClient.from(TABLE_PROFILE_NAME).select().eq('id', id).single();
    if (error || !data) {
      return null;
    }

    return data as ProfileInterface;
  }

  async getByUsername(username: string): Promise<ProfileInterface> {
    if (!username) {
      return null;
    }
    const { data, error } = await this.supabaseClient
      .from(TABLE_PROFILE_NAME)
      .select()
      .eq('username', username)
      .single();
    if (error) {
      return null;
    }
    return data as ProfileInterface;
  }

  async query(
    interests: string[],
    poapEventIds: string[],
    options: { page: number; limit: number; orderBy: Partial<ProfileInterface>; orderDir: 'asc' | 'desc' }
  ): Promise<ProfileInterface[]> {
    const { page, limit, orderBy, orderDir } = options;
    if (interests?.length > 0) {
      const { data, error } = await this.supabaseClient
        .rpc('get_profiles_by_interest', {
          interest: interests.map((i) => `'${i}'`).join(' | '),
          poap_event_ids: poapEventIds ?? [],
        })
        .range(page * limit, (page + 1) * limit - 1)
        .order(orderBy as string, { ascending: orderDir === 'asc', nullsFirst: false })
        .limit(limit);
      if (error) {
        throw error;
      }
      return data;
    }

    let supabaseQuery: PostgrestFilterBuilder<any, any, any>;
    if (poapEventIds?.length > 0) {
      supabaseQuery = supabaseClient
        .from('profile')
        .select('*,poap_events!inner(*)')
        .in('poap_events.id', poapEventIds);
    } else {
      supabaseQuery = supabaseClient.from('profile').select('*');
    }

    const { data, error } = await supabaseQuery
      .range(page * limit, (page + 1) * limit - 1)
      .order(orderBy as string, { ascending: orderDir === 'asc', nullsFirst: false })
      .limit(limit);
    if (error) {
      throw error;
    }
    return data as unknown as ProfileInterface[];
  }
}
