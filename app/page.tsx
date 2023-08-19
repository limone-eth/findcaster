import PlausibleProvider from 'next-plausible';

import { ContentLayout } from '@/modules/application/components/DesignSystem';
import { Footer } from '@/modules/application/components/Footer';
import Search from '@/modules/search/components/Search';

export default async function IndexPage() {
  return (
    <PlausibleProvider domain="findcaster-kappa.vercel.app" trackOutboundLinks={true}>
      <ContentLayout>
        <ContentLayout.Content>
          <Search />
        </ContentLayout.Content>
        <ContentLayout.Footer>
          <Footer />
        </ContentLayout.Footer>
      </ContentLayout>
    </PlausibleProvider>
  );
}
