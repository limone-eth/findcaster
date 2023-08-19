'use client';

import { Hyperlink, Text } from '@/modules/application/components/DesignSystem';

const Footer = () => (
  <div className="flex items-center justify-between p-5 text-sm tracking-wider text-gray-400 md:justify-between">
    <div>
      <Text>
        We're in{' '}
        <Hyperlink theme="decorated" href="https://buildspace.so/">
          Buildspace
        </Hyperlink>{' '}
        S4
      </Text>
    </div>
    <div>
      <Text>
        by{' '}
        <Hyperlink target="_blank" theme="decorated" href="https://warpcast.com/limone.eth">
          limone.eth
        </Hyperlink>{' '}
        •{' '}
        <Hyperlink target="_blank" theme="decorated" href="https://warpcast.com/strangequirks">
          phil
        </Hyperlink>{' '}
        •{' '}
        <Hyperlink target="_blank" theme="decorated" href="https://warpcast.com/antimofm.eth">
          antimo
        </Hyperlink>
      </Text>
    </div>
  </div>
);

export default Footer;
