import { useEffect, useState } from 'react';

import { ProfileInternalApiService } from '@/models/profiles/services/internalApi/ProfileInternalApiService';

const useSimilarProfiles = (username: string, topK = 10) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!username) return;

      try {
        const profileInternalApiService = new ProfileInternalApiService(true);
        const similarProfiles = await profileInternalApiService.getSimilarProfilesByUsername(username, topK);

        setData(similarProfiles);
        setIsLoading(false);
      } catch (error) {
        setData(null);
        setIsLoading(false);
      }
    })();
  }, [username]);

  return { data, isLoading };
};

export default useSimilarProfiles;
