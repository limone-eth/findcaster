import './globals.css';

import { ReactNode } from 'react';

import localFont from 'next/font/local';

import { MODAL_ROOT_ID } from '@/modules/application/utils/modals';

const satoshi = localFont({ src: '../fonts/satoshi/Satoshi-Variable.woff2', variable: '--font-satoshi' });

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-violet-500">
      <body className={`${satoshi.variable} relative font-sans font-medium antialiased`}>
        {children}
        <div id={MODAL_ROOT_ID} />
      </body>
    </html>
  );
}
