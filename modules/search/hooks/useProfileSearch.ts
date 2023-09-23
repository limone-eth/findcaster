import useSWRInfinite from 'swr/infinite';

import { getProfilesApiEndpoint } from '@/models/profiles/services/internalApi/ProfileInternalApiService';
import { fetchFromAuthedApi } from '@/modules/common/utils/fetcher';

const LIMIT = 9;

const getSwrKey = (pageIndex, previousPageData, query, orderBy, orderDir) =>
  getProfilesApiEndpoint(query, pageIndex, LIMIT, orderBy, orderDir);

const useProfileSearch = (query, orderBy, orderDir) => {
  const { data, size, setSize } = useSWRInfinite(
    (...args) => getSwrKey(...args, query, orderBy, orderDir),
    fetchFromAuthedApi,
    {
      revalidateOnFocus: true,
    }
  );

  const handleLoadMore = async () => {
    await setSize(size + 1);
  };

  const lastItemsRetrieved = data?.length > 0 ? data[data.length - 1] : null;

  return {
    items: data ? [].concat(...data) : [],
    hasMore: (lastItemsRetrieved as any)?.length === LIMIT,
    handleLoadMore,
    isLoading: data === undefined,
  };
};

export default useProfileSearch;
