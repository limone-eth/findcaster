import {
  executeGetQuery as apiServiceExecuteGetQuery,
  executePostQuery as apiServiceExecutePostQuery,
} from '@/models/application/services/InternalApiService';

export abstract class AbstractInternalApiService {
  protected readonly throwErrors: boolean;

  constructor(throwErrors = false) {
    this.throwErrors = throwErrors;
  }

  async executeGetQuery<T>(endpoint: string): Promise<T> {
    return apiServiceExecuteGetQuery(encodeURI(endpoint), this.throwErrors);
  }

  async executePostQuery<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    return apiServiceExecutePostQuery(encodeURI(endpoint), data, this.throwErrors);
  }
}
