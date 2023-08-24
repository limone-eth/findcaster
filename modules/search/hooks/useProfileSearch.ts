import { useState } from 'react';

import { EVENT_SEARCH_STARTED, trackEvent } from '@/models/application/services/TrackingService';
import { ProfileInternalApiService } from '@/models/profiles/services/internalApi/ProfileInternalApiService';

const useProfileSearch = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (poaps) => {
    if (poaps?.length > 0) {
      trackEvent(EVENT_SEARCH_STARTED);

      setIsLoading(true);
      const service = new ProfileInternalApiService();
      const results = await service.getProfiles(poaps.map((poapsItem) => poapsItem.id));

      setProfiles(results || []);

      setIsLoading(false);
    } else {
      setProfiles([]);
    }
  };

  return { profiles, isLoading, handleSearch };
};

export default useProfileSearch;
