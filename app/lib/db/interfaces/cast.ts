export interface Cast {
  hash: string;
  threadHash: string;
  parentHash: string | null;
  authorFid: number;
  authorUsername: string | null;
  authorDisplayName: string;
  authorPfpUrl: string | null;
  authorPfpVerified: boolean | null;
  text: string;
  publishedAt: Date;
  // TODO: uncomment this when we have mentions
  // mentions: ProfileCore[] | null
  repliesCount: number;
  reactionsCount: number;
  recastsCount: number;
  watchesCount: number;
  parentAuthorFid: number | null;
  parentAuthorUsername: string | null;
  deleted: boolean;
}
