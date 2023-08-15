import { ContentLayout } from '@/modules/application/components/DesignSystem';
import { Footer } from '@/modules/application/components/Footer';
import Search from '@/modules/search/components/Search';

export default async function IndexPage() {
  return (
    <ContentLayout>
      <ContentLayout.Content>
        <div className="relative flex h-screen w-full items-center justify-center">
          <Search />
        </div>
      </ContentLayout.Content>
      <ContentLayout.Footer>
        <Footer />
      </ContentLayout.Footer>
    </ContentLayout>
  );
}
