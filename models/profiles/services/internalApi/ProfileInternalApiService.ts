import { AbstractInternalApiService } from '@/models/application/services/internalApi/AbstractInternalApiService';
import { createUrl } from '@/models/application/services/UrlService';

export class ProfileInternalApiService extends AbstractInternalApiService {
  private static BASE_URL = '/profiles';

  async getProfiles(poapEventIds: number[]): Promise<any[]> {
    const params = poapEventIds.map((poapEventId) => `poapEventId=${poapEventId}`);
    const url = createUrl(`${ProfileInternalApiService.BASE_URL}/`, params);
    const response = await this.executeGetQuery<any>(url);
    if (!response) {
      throw new Error('Something went wrong.');
    }

    return response;
  }
}
