import { AbstractInternalApiService } from '@/models/application/services/internalApi/AbstractInternalApiService';

export class PoapsInternalApiService extends AbstractInternalApiService {
  private static BASE_URL = '/poaps';

  async queryPoaps(name: string, limit = 50): Promise<any[]> {
    const response = await this.executeGetQuery<any>(`${PoapsInternalApiService.BASE_URL}?name=${name}&limit=${limit}`);
    if (!response) {
      throw new Error('Something went wrong.');
    }

    return response;
  }
}
