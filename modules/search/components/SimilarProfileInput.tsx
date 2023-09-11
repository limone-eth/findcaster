'use client';

import { useState } from 'react';

import { Input } from '@/modules/application/components/DesignSystem';

const SimilarProfileInput = ({ onSelect }) => {
  const [username, setUsername] = useState<string>('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && username.length > 0) {
      onSelect(username);
      setUsername('');
    }
  };

  const handleChange = (e) => {
    setUsername(e.currentTarget.value);
  };

  return (
    <div>
      <label htmlFor="large-input" className="mb-2 block text-sm font-medium text-white dark:text-white">
        Look for profiles similar to...
      </label>
      <Input
        placeholder="e.g., dwr.eth, limone.eth"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={username}
      />
    </div>
  );
};

export default SimilarProfileInput;
