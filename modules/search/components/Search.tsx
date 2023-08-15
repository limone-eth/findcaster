'use client';

import { useState } from 'react';

import { Text } from '@/modules/application/components/DesignSystem';
import SearchForm from '@/modules/search/components/SearchForm';

const Search = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <SearchForm onResults={(results) => setUser(results)} />
      {user && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Text key={user.id}>{user.username}</Text>
        </div>
      )}
    </div>
  );
};

export default Search;
