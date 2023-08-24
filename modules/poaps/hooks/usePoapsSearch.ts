import { useState } from 'react';

import debounce from 'debounce';

import { PoapsInternalApiService } from '@/models/poaps/services/internalApi/PoapsInternalApiService';

const usePoapsSearch = () => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = debounce(async (_value) => {
    setIsLoading(true);
    const service = new PoapsInternalApiService();
    const results = await service.queryPoaps(_value);

    setOptions(results?.map((result) => ({ ...result, name: result.event_name })) || []);

    setIsLoading(false);
  }, 200);

  return { options, isLoading, handleSearch };
};

export default usePoapsSearch;
