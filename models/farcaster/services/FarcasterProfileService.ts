import { SupabaseClient } from '@supabase/supabase-js';

import { ProfileInterface } from '@/models/farcaster/intrfaces/ProfileInterface';

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
}
