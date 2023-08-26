'use client';

import { useEffect, useState } from 'react';

import { ShareIcon } from '@heroicons/react/24/outline';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { createUrl } from '@/models/application/services/UrlService';
import { Button } from '@/modules/application/components/DesignSystem';

const ShareSearch = ({ poaps, interests, orderBy, orderDir }) => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const params = [
      ...poaps.map((poap) => `poapEventId=${poap.id}`),
      ...interests.map((interest) => `interest=${interest}`),
    ];

    params.push(`orderBy=${orderBy}`);
    params.push(`orderDir=${orderDir}`);

    setUrl(`${window.location.href}${createUrl(``, params)}`);
  }, [poaps, interests, orderBy, orderDir]);

  return (
    <CopyToClipboard text={url}>
      <Button size="s" theme="bare" color="white">
        <Button.Icon icon={<ShareIcon className="w-5" />} />
        Share
      </Button>
    </CopyToClipboard>
  );
};

export default ShareSearch;
