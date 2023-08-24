import { executeGetQuery } from '@/models/application/services/InternalApiService';

export const fetchFromAuthedApi = (url) => executeGetQuery(url, true);
