'use client';

import { useState } from 'react';

import { Input } from '@/modules/application/components/DesignSystem';

const SearchInterestsInput = ({ onSelect }) => {
  const [interest, setInterest] = useState<string>('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && interest.length > 0) {
      onSelect(interest);
      setInterest('');
    }
  };

  const handleChange = (e) => {
    setInterest(e.currentTarget.value);
  };

  return (
    <div>
      <label htmlFor="large-input" className="mb-2 block text-sm font-medium text-white dark:text-white">
        Type down your interests
      </label>
      <Input placeholder="NFT, sports, gaming..." onKeyDown={handleKeyDown} onChange={handleChange} value={interest} />
    </div>
  );
};

export default SearchInterestsInput;
