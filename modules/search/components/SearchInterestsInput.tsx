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
    <Input
      placeholder="Search by interests e.g. NFT, blockchain, web3..."
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      value={interest}
    />
  );
};

export default SearchInterestsInput;
