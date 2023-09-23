import { AbstractInternalApiService } from '@/models/application/services/internalApi/AbstractInternalApiService';
import { EVENT_SEARCH_STARTED, trackEvent } from '@/models/application/services/TrackingService';
import { createUrl } from '@/models/application/services/UrlService';

export class ProfileInternalApiService extends AbstractInternalApiService {
  private static BASE_URL = '/profiles';

  async getProfiles(poapEventIds: number[], interests: string[]): Promise<any[]> {
    const params = [
      ...poapEventIds.map((poapEventId) => `poapEventId=${poapEventId}`),
      ...interests.map((interest) => `interest=${interest}`),
    ];
    const url = createUrl(`${ProfileInternalApiService.BASE_URL}/`, params);
    const response = await this.executeGetQuery<any>(url);
    if (!response) {
      throw new Error('Something went wrong.');
    }

    return response;
  }

  async getSimilarProfilesByUsername(username: string, topK = 10): Promise<any[]> {
    const params = [`username=${username}`, `topK=${topK}`];
    const url = createUrl(`${ProfileInternalApiService.BASE_URL}`, params);
    const response = await this.executeGetQuery<any>(url);
    if (!response) {
      throw new Error('Something went wrong.');
    }
    trackEvent(EVENT_SEARCH_STARTED, {
      username,
    });
    return response;
  }

  async queryProfilesSemantic(query: string, topK = 25): Promise<any[]> {
    const params = [`query=${query}`, `topK=${topK}`];
    const url = createUrl(`${ProfileInternalApiService.BASE_URL}`, params);
    const response = await this.executeGetQuery<any>(url);
    if (!response) {
      throw new Error('Something went wrong.');
    }
    trackEvent(EVENT_SEARCH_STARTED, {
      query,
    });
    return response;
  }
}

export function getProfilesApiEndpoint(query: string, page = 0, limit = 10, orderBy = 'id', orderDir = 'desc') {
  const params = [`textQueryAI=${query}`];

  trackEvent(EVENT_SEARCH_STARTED, {
    query,
  });

  params.push(`page=${page}`);
  params.push(`limit=${limit}`);
  params.push(`orderBy=${orderBy}`);
  params.push(`orderDir=${orderDir}`);

  return createUrl(`/profiles/`, params);
}
