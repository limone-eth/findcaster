'use client';

import { Hyperlink, Text } from '@/modules/application/components/DesignSystem';

const Footer = () => (
  <div className="flex items-center justify-center p-5 text-sm tracking-wider text-gray-400 md:justify-between">
    <div>
      <Text>
        We're in{' '}
        <Hyperlink theme="decorated" href="https://buildspace.so/">
          Buildspace
        </Hyperlink>{' '}
        S4
      </Text>
    </div>
  </div>
);

export default Footer;
