export interface Profile {
  id: number;
  owner?: string | null;
  username?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
  avatarVerified?: boolean | null;
  followers?: number | null;
  following?: number | null;
  bio?: string | null;
  referrer?: string | null;
  registeredAt?: Date;
  updatedAt?: Date;
}
