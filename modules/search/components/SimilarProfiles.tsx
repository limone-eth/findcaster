'use client';

import { Text } from '@/modules/application/components/DesignSystem';
import Spinner from '@/modules/common/components/animations/Spinner';
import ProfileCard from '@/modules/search/components/ProfileCard';
import useSimilarProfiles from '@/modules/search/hooks/useSimilarProfiles';

const SearchResultsList = ({ username }) => {
  const { data, isLoading } = useSimilarProfiles(username);

  return (
    <div>
      {!isLoading && data?.length >= 0 && (
        <div className="grid gap-3 py-12 md:grid-cols-2 md:gap-6">
          {data.map((similarProfile) => (
            <ProfileCard key={similarProfile.id} profile={similarProfile} />
          ))}
        </div>
      )}
      {isLoading && (
        <div className="mt-20">
          <Spinner size="l" align="center" />
        </div>
      )}
      {!isLoading && data?.length === 0 && (
        <Text fontFamily="mono" color="gray-600" textAlign="center">
          <i>Sorry, we couldn't find any similar profiles right now.</i>
        </Text>
      )}
    </div>
  );
};

export default SearchResultsList;
