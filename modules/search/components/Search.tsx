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
          <div className="flex items-center space-x-4">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={user.username} src={user.avatar_url} className="h-10 w-10 rounded-full" />
            </div>
            <Text key={user.id}>{user.username}</Text>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
