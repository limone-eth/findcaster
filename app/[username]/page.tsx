import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import PlausibleProvider from 'next-plausible';

import { getUrlIndex } from '@/models/application/services/UrlService';
import { FarcasterProfileService } from '@/models/farcaster/services/FarcasterProfileService';
import { Button, ContentLayout, Heading } from '@/modules/application/components/DesignSystem';
import { Footer } from '@/modules/application/components/Footer';
import ProfileCard from '@/modules/search/components/ProfileCard';
import SimilarProfiles from '@/modules/search/components/SimilarProfiles';

const ProjectPage = async ({ params }: { params: { username: string } }) => {
  const supabase = createServerComponentClient({ cookies });

  // get project data
  const farcasterProfileService = new FarcasterProfileService(supabase);
  const profile = await farcasterProfileService.getByUsername(params.username);
  if (!profile) notFound();

  return (
    <PlausibleProvider domain="findcaster-kappa.vercel.app" trackOutboundLinks={true}>
      <ContentLayout>
        <ContentLayout.Content>
          <div className="m-auto w-full max-w-[1500px] flex-1 px-5 py-10 md:px-0">
            <div className="flex flex-col items-start space-y-5 md:flex-row md:space-x-20">
              <div className="flex w-full max-w-md flex-col space-y-12">
                <div>
                  <Button href={getUrlIndex()}>Home</Button>
                </div>
                <ProfileCard key={profile.id} profile={profile} />
              </div>
              <div className="grow">
                <Heading size="xxl" level={0} textAlign="center">
                  Similar Profiles to @{profile.username}
                </Heading>
                <SimilarProfiles username={profile.username} topK={15} />
              </div>
            </div>
          </div>
        </ContentLayout.Content>
        <ContentLayout.Footer>
          <Footer />
        </ContentLayout.Footer>
      </ContentLayout>
    </PlausibleProvider>
  );
};

export default ProjectPage;
