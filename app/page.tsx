import PlausibleProvider from 'next-plausible';

import { ContentLayout, Heading, Text } from '@/modules/application/components/DesignSystem';
import { Footer } from '@/modules/application/components/Footer';
import Search from '@/modules/search/components/Search';

export default async function IndexPage() {
  return (
    <PlausibleProvider domain="findcaster-kappa.vercel.app" trackOutboundLinks={true}>
      <ContentLayout>
        <ContentLayout.Content>
          <div className="mt-20">
            <Heading level={0} size="xxxl" textAlign="center">
              Findcaster
            </Heading>
            <Text textAlign="center" size="xl" fontFamily="mono">
              Connect with like-minded people on Farcaster
            </Text>
          </div>
          <Search />
        </ContentLayout.Content>
        <ContentLayout.Footer>
          <Footer />
        </ContentLayout.Footer>
      </ContentLayout>
    </PlausibleProvider>
  );
}
