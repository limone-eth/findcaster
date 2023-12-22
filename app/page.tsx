import Image from 'next/image';
import PlausibleProvider from 'next-plausible';

import { ContentLayout, Heading, Text } from '@/modules/application/components/DesignSystem';
import { Footer } from '@/modules/application/components/Footer';
import Search from '@/modules/search/components/Search';

export default async function IndexPage({ searchParams }: { searchParams: { username: string; error: boolean } }) {
  return (
    <PlausibleProvider domain="findcaster.com" trackOutboundLinks={true}>
      <ContentLayout>
        <ContentLayout.Content>
          <div className="mt-5 flex flex-col items-center justify-center text-center">
            <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
            <Heading level={0} size="xxxl" textAlign="center">
              Findcaster
            </Heading>
            <Text textAlign="center" size="xl" fontFamily="mono">
              The best place to find people on Farcaster.
            </Text>
          </div>
          {searchParams?.error && (
            <div className="m-auto mt-10 max-w-2xl rounded-2xl bg-red-500 p-4">
              <Text size="m" textAlign="center" fontFamily="mono">
                Sorry, we don't seem to have <strong>@{searchParams.username}</strong> in our database.
              </Text>
            </div>
          )}
          <Search />
        </ContentLayout.Content>
        <ContentLayout.Footer>
          <Footer />
        </ContentLayout.Footer>
      </ContentLayout>
    </PlausibleProvider>
  );
}
