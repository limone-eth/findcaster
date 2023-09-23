'use client';

import { useState } from 'react';

import { Input } from '@/modules/application/components/DesignSystem';

const SearchProfileInput = ({ onSelect }) => {
  const [query, setQuery] = useState<string>('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      onSelect(query);
    }
  };

  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <div>
      {
        // <label htmlFor="large-input" className="mb-2 block text-sm font-medium text-white dark:text-white">
        // Type in keywords, we'll do the rest!
        // </label>
      }
      <Input placeholder="Find me people who..." onKeyDown={handleKeyDown} onChange={handleChange} value={query} />
    </div>
  );
};

export default SearchProfileInput;
