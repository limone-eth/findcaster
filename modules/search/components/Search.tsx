'use client';

import { useState } from 'react';

import { XMarkIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

import { Badge } from '@/modules/application/components/DesignSystem';
import { PoapAdvancedSelect } from '@/modules/common/components/AdvancedSelect';
import SearchInterestsInput from '@/modules/search/components/SearchInterestsInput';
import SearchResultsList from '@/modules/search/components/SearchResultsList';
import SimilarProfileInput from '@/modules/search/components/SimilarProfileInput';

const Search = () => {
  const router = useRouter();
  const [poaps, setPoaps] = useState([]);
  const [interests, setInterests] = useState([]);

  return (
    <div className="m-16">
      <div className="m-auto mb-10 md:w-1/2">
        <SimilarProfileInput
          onSelect={(item) => {
            router.push(`${item}`);
          }}
        />
      </div>
      <div className="m-auto mb-10 md:w-1/2">
        <div className="grid gap-4 md:grid-cols-2">
          <SearchInterestsInput
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
              <div key={interest} className="mb-3 mr-3 inline-block">
                <Badge color="white" size="s">
                  {interest}
                  <Badge.Icon
                    icon={<XMarkIcon className="w-4" />}
                    onClick={() => setInterests(interests.filter((_interest) => _interest !== interest))}
                  />
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
      {(poaps?.length > 0 || interests?.length > 0) && <SearchResultsList poaps={poaps} interests={interests} />}
    </div>
  );
};

export default Search;
