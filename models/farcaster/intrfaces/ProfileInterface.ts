/* eslint-disable camelcase */

export interface ProfileInterface {
  id: number;
  followers?: number;
  followings?: number;
  username: string;
  display_name: string;
  bio?: string;
  avatar_url?: string;
  registered_at: number;
  updated_at: number;
}
