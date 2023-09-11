import { PineconeClient, ScoredVector } from '@pinecone-database/pinecone';
import { pipeline } from '@xenova/transformers';

import { ProfileInterface } from '@/models/farcaster/interfaces/ProfileInterface';
import { FarcasterCastService } from '@/models/farcaster/services/FarcasterCastService';
import { FarcasterProfileService } from '@/models/farcaster/services/FarcasterProfileService';
import supabaseClient from '@/modules/application/utils/supabaseClient';

const PINECONE_INDEX = 'findcaster';

const MODEL_NAME = 'embed-english-v2.0';

export interface PineconeProfileDoc extends ScoredVector {
  metadata: {
    loc: string;
    pageContent: string;
    profileId: number;
  };
}

export const searchPinecone = async (query: string): Promise<PineconeProfileDoc[]> => {
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: 'gcp-starter',
    apiKey: process.env.PINECONE_KEY,
  });
  const pineconeIndex = pinecone.Index(PINECONE_INDEX);

  const generateEmbedding = await pipeline(MODEL_NAME);

  const queryEmbedding = await generateEmbedding(query);

  // Query Pinecone index and return top 10 document matches
  const { matches } = await pineconeIndex.query({
    queryRequest: {
      topK: 10,
      vector: queryEmbedding,
      includeMetadata: true,
      includeValues: true,
    },
  });
  return matches as unknown as PineconeProfileDoc[];
};

export const searchSimilarProfileOnPinecone = async (profile: ProfileInterface) => {
  const farcasterCastService = new FarcasterCastService(supabaseClient);
  const farcasterProfileService = new FarcasterProfileService(supabaseClient);
  const casts = await farcasterCastService.getByAuthorFid(profile.id.toString());
  const castArray = casts?.map((cast) => cast.text).join(' | ');
  const query = `${profile.username} ${profile.bio} ${castArray}`;
  const pineconeMatches = await searchPinecone(query);
  const profileIds = pineconeMatches.map((match) => match.metadata.profileId);
  const profiles = await farcasterProfileService.getByIds(profileIds);
  return profiles.map((p) => ({
    ...p,
    match: pineconeMatches.find((match) => match.metadata.profileId === p.id).score,
  }));
};