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

  async getSimilarProfilesByUsername(username: string): Promise<any[]> {
    const params = [`username=${username}`];
    const url = createUrl(`${ProfileInternalApiService.BASE_URL}`, params);
    const response = await this.executeGetQuery<any>(url);
    if (!response) {
      console.log(2, response, url);
      return null;
      throw new Error('Something went wrong.');
    }

    return response;
  }
}

export function getProfilesApiEndpoint(
  poapEventIds: number[],
  interests: string[],
  page = 0,
  limit = 10,
  orderBy = 'id',
  orderDir = 'desc'
) {
  const params = [
    ...poapEventIds.map((poapEventId) => `poapEventId=${poapEventId}`),
    ...interests.map((interest) => `interest=${interest}`),
  ];

  trackEvent(EVENT_SEARCH_STARTED, {
    poapEventIds,
    interests,
  });

  params.push(`page=${page}`);
  params.push(`limit=${limit}`);
  params.push(`orderBy=${orderBy}`);
  params.push(`orderDir=${orderDir}`);

  return createUrl(`/profiles/`, params);
}
