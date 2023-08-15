import { ContentLayout } from '@/modules/application/components/DesignSystem';
import { Footer } from '@/modules/application/components/Footer';
import SearchForm from '@/modules/search/components/SearchForm';

export default async function IndexPage() {
  return (
    <ContentLayout>
      <ContentLayout.Content>
        <div className="relative flex h-screen w-full items-center justify-center">
          <SearchForm />
        </div>
      </ContentLayout.Content>
      <ContentLayout.Footer>
        <Footer />
      </ContentLayout.Footer>
    </ContentLayout>
  );
}
