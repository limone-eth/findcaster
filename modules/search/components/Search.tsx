'use client';

import { useState } from 'react';

import { Text } from '@/modules/application/components/DesignSystem';
import ResultGrid from '@/modules/search/components/ResultGrid';
import SearchForm from '@/modules/search/components/SearchForm';

const Search = () => {
  const [profiles, setProfiles] = useState(null);

  return (
    <div className="m-16">
      <SearchForm onResults={(results) => setProfiles(results)} />
      {profiles && profiles.length === 0 && <Text size="xl">No results found</Text>}
      {profiles && profiles.length > 0 && <ResultGrid profiles={profiles} />}
    </div>
  );
};

export default Search;
