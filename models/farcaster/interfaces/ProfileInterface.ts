/* eslint-disable camelcase */
import { MatchingCastInterface, MatchingPoapInterface } from '@/app/api/profiles/utils';

export interface ProfileInterface {
  id: number;
  followers?: number;
  following?: number;
  username: string;
  display_name: string;
  bio?: string;
  avatar_url?: string;
  registered_at: number;
  updated_at: number;
  matching_casts: MatchingCastInterface[];
  matching_poaps?: MatchingPoapInterface[];
}
