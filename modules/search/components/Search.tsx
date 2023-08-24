'use client';

import { useEffect, useState } from 'react';

import { XMarkIcon } from '@heroicons/react/20/solid';

import { Badge, Text } from '@/modules/application/components/DesignSystem';
import { InterestAdvancedSelect, PoapAdvancedSelect } from '@/modules/common/components/AdvancedSelect';
import ResultGrid from '@/modules/search/components/ResultGrid';
import useProfileSearch from '@/modules/search/hooks/useProfileSearch';

const Search = () => {
  const [poaps, setPoaps] = useState([]);
  const [interests, setInterests] = useState([]);

  const { profiles, handleSearch } = useProfileSearch();

  useEffect(() => {
    (async () => {
      await handleSearch(poaps, interests);
    })();
  }, [poaps, interests]);

  return (
    <div className="m-16">
      <div className="m-auto mb-10 w-1/2">
        <div className="flex flex-col gap-3">
          <InterestAdvancedSelect
            onSelect={(item) => {
              setInterests(interests.concat(item));
            }}
          />
          <PoapAdvancedSelect
            onSelect={(item) => {
              setPoaps(poaps.concat(item));
            }}
          />
        </div>

        {(poaps?.length > 0 || interests?.length > 0) && (
          <div className="mt-4">
            {poaps?.map((poap) => (
              <div key={poap.id} className="mb-3 mr-3 inline-block">
                <Badge color="white" size="s">
                  {poap.event_name}
                  <Badge.Icon
                    icon={<XMarkIcon className="w-4" />}
                    onClick={() => setPoaps(poaps.filter((_poap) => _poap.id !== poap.id))}
                  />
                </Badge>
              </div>
            ))}
            {interests?.map((interest) => (
              <div key={interest.id} className="mb-3 mr-3 inline-block">
                <Badge color="white" size="s">
                  {interest.name}
                  <Badge.Icon
                    icon={<XMarkIcon className="w-4" />}
                    onClick={() => setInterests(interests.filter((_interest) => _interest.id !== interest.id))}
                  />
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
      {profiles && profiles.length === 0 && (
        <Text size="xl" textAlign="center" fontFamily="mono" fontWeight="bold">
          No results found
        </Text>
      )}
      {profiles && profiles.length > 0 && <ResultGrid profiles={profiles} />}
    </div>
  );
};

export default Search;
