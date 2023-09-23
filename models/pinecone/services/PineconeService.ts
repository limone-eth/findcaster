import { PineconeClient, ScoredVector } from '@pinecone-database/pinecone';
import { pipeline } from '@xenova/transformers';
import { OpenAI } from 'langchain';
import { VectorDBQAChain } from 'langchain/chains';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

import { ProfileInterface } from '@/models/farcaster/interfaces/ProfileInterface';
import { FarcasterCastService } from '@/models/farcaster/services/FarcasterCastService';
import { FarcasterProfileService } from '@/models/farcaster/services/FarcasterProfileService';
import { askOpenAI } from '@/models/pinecone/services/OpenAIService';
import { TransformersJSEmbedding } from '@/models/pinecone/transformerJsEmbeddings';
import supabaseClient from '@/modules/application/utils/supabaseClient';

const PINECONE_INDEX = 'findcaster';

const MODEL_NAME = 'feature-extraction';

export interface PineconeProfileDoc extends ScoredVector {
  metadata: {
    loc: string;
    pageContent: string;
    profileId: number;
  };
}

export const searchPinecone = async (query: string, topK = 10): Promise<PineconeProfileDoc[]> => {
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: 'gcp-starter',
    apiKey: process.env.PINECONE_KEY,
  });
  const pineconeIndex = pinecone.Index(PINECONE_INDEX);

  // const pipeline = await PipelineSingleton.getInstance();
  const generateEmbedding = await pipeline(MODEL_NAME, 'Xenova/paraphrase-albert-small-v2');

  const queryEmbedding = await generateEmbedding(query, {
    pooling: 'mean',
    normalize: true,
  });
  // Query Pinecone index and return top 10 document matches
  const { matches } = await pineconeIndex.query({
    queryRequest: {
      topK,
      vector: Array.from(queryEmbedding.data),
      includeMetadata: true,
      includeValues: true,
    },
  });
  return matches as unknown as PineconeProfileDoc[];
};

export const searchSimilarProfileOnPinecone = async (profile: ProfileInterface, topK = 10) => {
  const farcasterProfileService = new FarcasterProfileService(supabaseClient);

  const farcasterCastService = new FarcasterCastService(supabaseClient);
  const casts = await farcasterCastService.getByAuthorFid(profile.id.toString(), 10);
  const castArray = casts?.map((cast) => cast.text).join(' ');
  const query = `${profile.username} ${profile.bio} ${castArray}`;
  const pineconeMatches = await searchPinecone(query, topK);
  const profileIds = pineconeMatches.map((match) => match.metadata.profileId);
  const profiles = await farcasterProfileService.getByIds(profileIds.filter((id) => id !== profile.id));
  return profiles
    .map((p) => {
      const x = pineconeMatches.find((match) => match.metadata.profileId === p.id);
      return {
        ...p,
        match: {
          score: x.score,
          pageContent: x.metadata.pageContent,
        },
      };
    })
    .sort((a, b) => b.match.score - a.match.score);
};

export const queryProfilesOnPinecone = async (query: string, topK = 10) => {
  const farcasterProfileService = new FarcasterProfileService(supabaseClient);
  const pineconeMatches = await searchPinecone(query, topK);
  const profileIds = pineconeMatches.map((match) => match.metadata.profileId);
  const profiles = await farcasterProfileService.getByIds(profileIds);
  return profiles
    .map((p) => {
      const x = pineconeMatches.find((match) => match.metadata.profileId === p.id);
      return {
        ...p,
        match: {
          score: x.score,
          pageContent: x.metadata.pageContent,
        },
      };
    })
    .sort((a, b) => b.match.score - a.match.score);
};

export const pineconeQueryDocs = async (query: string, topK = 10) => {
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: 'gcp-starter',
    apiKey: process.env.PINECONE_KEY,
  });
  const pineconeIndex = pinecone.Index(PINECONE_INDEX);
  const vectorStore = await PineconeStore.fromExistingIndex(
    new TransformersJSEmbedding({ modelName: 'Xenova/paraphrase-albert-small-v2' }),
    { pineconeIndex }
  );

  /* Use as part of a chain (currently no metadata filters) */
  const model = new OpenAI();
  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: topK,
    returnSourceDocuments: true,
  });
  const farcasterProfileService = new FarcasterProfileService(supabaseClient);
  const response = await chain.call({ query });
  const profileIds = response.sourceDocuments.map((match) => match.metadata.profileId);
  const profiles = await farcasterProfileService.getByIds(profileIds);
  return profiles
    .map((p) => {
      const x = response.sourceDocuments.find((match) => match.metadata.profileId === p.id);
      return {
        ...p,
        match: {
          score: x.score,
          pageContent: x.metadata.pageContent,
        },
      };
    })
    .sort((a, b) => b.match.score - a.match.score);
};

export const pineconeOpenAI = async (question: string, topK = 25) => {
  // Get Pinecone index
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: 'gcp-starter',
    apiKey: process.env.PINECONE_KEY,
  });
  // 4. Retrieve the Pinecone index
  const index = pinecone.Index('findcaster');

  // 5. Create query embedding
  const generateEmbedding = await pipeline('feature-extraction', 'Xenova/paraphrase-albert-small-v2');
  const queryEmbedding = await generateEmbedding(question, {
    pooling: 'mean',
    normalize: true,
  });
  // 6. Query Pinecone index and return top 10 matches
  const queryResponse = await index.query({
    queryRequest: {
      topK: 25,
      vector: Array.from(queryEmbedding.data),
      includeMetadata: true,
      includeValues: true,
    },
  });
  const context = queryResponse.matches
    .map((match) => {
      const { metadata }: any = match;
      return `[profileId: ${metadata?.profileId}] ${metadata?.pageContent}`;
    })
    .join(' -- ');
  const farcasterProfileService = new FarcasterProfileService(supabaseClient);
  const { response } = await askOpenAI(question, context);
  const matchingProfiles = JSON.parse(response).profiles;
  const profileIds = matchingProfiles.map((p: any) => p.profileId);
  const profiles = await farcasterProfileService.getByIds(profileIds);
  return profiles.map((profile) => {
    const matchingReason = matchingProfiles.find((p: any) => parseInt(p.profileId, 10) === profile.id).reason;
    return {
      ...profile,
      matchingReason,
    };
  });
};
