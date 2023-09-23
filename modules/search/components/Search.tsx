'use client';

import { useState } from 'react';

import Typewriter from 'typewriter-effect';

import SearchProfileInput from '@/modules/search/components/SearchProfileInput';
import SearchResultsList from '@/modules/search/components/SearchResultsList';

const Search = () => {
  const [query, setQuery] = useState('');
  return (
    <div className="m-16">
      <div className="mx-auto mb-4 flex justify-center gap-2 text-3xl font-bold text-white">
        Find me people who
        <Typewriter
          options={{
            strings: [' are into surfing', ' work in AI', ' like rock music', ' travel a lot', ' won an hackathon'],
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 0,
            wrapperClassName: 'text-3xl font-bold text-amber-300',
          }}
        />
      </div>

      <div className="m-auto mb-10 md:w-1/2">
        <SearchProfileInput
          onSelect={(_query) => {
            setQuery(_query);
          }}
        />
      </div>
      {query && <SearchResultsList query={query} />}
    </div>
  );
};

export default Search;
