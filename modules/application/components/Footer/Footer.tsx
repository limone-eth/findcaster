'use client';

import { format } from 'date-fns';

const Footer = () => (
  <div className="flex items-center justify-center bg-black p-5 text-sm tracking-wider text-gray-400 md:justify-between">
    {`© ${format(new Date(), 'yyyy')} Findcaster`}
  </div>
);

export default Footer;
