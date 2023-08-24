import useSWRInfinite from 'swr/infinite';

import { getProfilesApiEndpoint } from '@/models/profiles/services/internalApi/ProfileInternalApiService';
import { fetchFromAuthedApi } from '@/modules/common/utils/fetcher';

const LIMIT = 10;

const getSwrKey = (pageIndex, previousPageData, poaps, interests) =>
  getProfilesApiEndpoint(
    poaps?.map((poap) => poap.id),
    interests,
    pageIndex,
    LIMIT
  );

const useProfileSearch = (poaps, interests) => {
  const { data, size, setSize } = useSWRInfinite(
    (...args) => getSwrKey(...args, poaps, interests),
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
