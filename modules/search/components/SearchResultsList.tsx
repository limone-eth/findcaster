import { useState } from 'react';

import { Text } from '@/modules/application/components/DesignSystem';
import Spinner from '@/modules/common/components/animations/Spinner';
import { InfiniteScroll } from '@/modules/common/components/InfiniteScroll';
import OrderByFilter from '@/modules/search/components/OrderByFilter';
import OrderDirectionFilter from '@/modules/search/components/OrderDirectionFilter';
import ProfileCard from '@/modules/search/components/ProfileCard';
import useProfileSearch from '@/modules/search/hooks/useProfileSearch';

const SearchResultsList = ({ poaps, interests }) => {
  const [orderBy, setOrderBy] = useState('id');
  const [orderDir, setOrderDir] = useState('asc');
  const { items, hasMore, handleLoadMore, isLoading } = useProfileSearch(poaps, interests, orderBy, orderDir);

  return (
    <div>
      {items?.length > 0 && (
        <div>
          <InfiniteScroll
            style={{ overflowY: 'hidden' }} // Should not need this but for some reason I do?!
            dataLength={items.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={<Spinner />}
          >
            <div className="m-auto w-full px-4 md:max-w-6xl md:px-0">
              <div className="flex justify-end space-x-5">
                <OrderByFilter orderBy={orderBy} onChangeOrderBy={(_orderBy) => setOrderBy(_orderBy)} />
                <OrderDirectionFilter orderDir={orderDir} onChangeOrderDir={(_orderDir) => setOrderDir(_orderDir)} />
              </div>
              <div className="grid gap-3 py-12 md:grid-cols-3 md:gap-10">
                {items.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} searchedInterests={interests} />
                ))}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      )}
      {isLoading && items?.length === 0 && (
        <div>
          <Spinner size="l" align="center" />
        </div>
      )}

      {!isLoading && items?.length === 0 && (
        <Text fontFamily="mono" color="gray-600" textAlign="center">
          <i>No results found</i>
        </Text>
      )}
    </div>
  );
};

export default SearchResultsList;
