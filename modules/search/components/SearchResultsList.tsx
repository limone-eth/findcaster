import { useState } from 'react';

import { Text } from '@/modules/application/components/DesignSystem';
import Spinner from '@/modules/common/components/animations/Spinner';
import ProfileCard from '@/modules/search/components/ProfileCard';
import useProfileSearch from '@/modules/search/hooks/useProfileSearch';

const SearchResultsList = ({ query }) => {
  const [orderBy, setOrderBy] = useState('id');
  const [orderDir, setOrderDir] = useState('asc');
  const { items, isLoading } = useProfileSearch(query, orderBy, orderDir);

  return (
    <div>
      {items?.length > 0 && (
        <div>
          <div className="m-auto w-full px-4 md:max-w-6xl md:px-0">
            <div className="flex justify-end space-x-5">
              {
                // <OrderByFilter orderBy={orderBy} onChangeOrderBy={(_orderBy) => setOrderBy(_orderBy)} />
                // <OrderDirectionFilter orderDir={orderDir} onChangeOrderDir={(_orderDir) => setOrderDir(_orderDir)} />
              }
            </div>
            <div className="grid gap-3 py-12 md:grid-cols-3 md:gap-10">
              {items.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </div>
      )}
      {isLoading && items?.length === 0 && (
        <div className="mx-auto justify-center text-center text-white">
          <Spinner size="l" align="center" />
          <div className="m-2">Our search elves are working overtime to find your perfect match! ✨</div>
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
