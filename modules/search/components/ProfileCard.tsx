import Link from 'next/link';
import numeral from 'numeral';

import { getWarpcastUrl } from '@/models/application/services/UrlService';
import { ProfileInterface } from '@/models/farcaster/interfaces/ProfileInterface';
import { Text } from '@/modules/application/components/DesignSystem';

const ProfileCard = ({ profile }: { profile: ProfileInterface }) => (
  <div className="flex h-full grow flex-col rounded-3xl border-2 border-violet-900 bg-violet-800 p-4 shadow-md md:p-6">
    <div className="flex grow flex-col items-center justify-between">
      <Link href={getWarpcastUrl(profile.username)} target="_blank" rel="noreferrer">
        <div className="flex grow flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-16 w-16 rounded-full border border-violet-800"
            src={profile.avatar_url}
            alt={profile.display_name}
          />
          <div className="mb-5 mt-2 flex flex-col space-y-2">
            <Text size="xxl" fontWeight="bold" textAlign="center">
              {profile.display_name}
            </Text>
            <Text textAlign="center" color="gray-900" fontWeight="normal">
              @{profile.username}
            </Text>
            {profile.bio && <Text textAlign="center">{profile.bio}</Text>}
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-center space-x-8">
        <div className="flex flex-col items-center space-y-1">
          <div className="inline-block w-24 rounded-xl bg-violet-600 p-1 text-center text-xl font-semibold text-white">
            {numeral(profile.followers || 0).format('0,0a')}
          </div>
          <Text size="s" fontWeight="semibold">
            Followers
          </Text>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <div className="inline-block w-24 rounded-xl bg-violet-600 p-1 text-center text-xl font-semibold text-white">
            {numeral(profile.following || 0).format('0,0a')}
          </div>
          <Text size="s" fontWeight="semibold">
            Following
          </Text>
        </div>
      </div>
    </div>

    <div className="mt-10 text-white">
      <div>Matching Reason:</div>
      <br />
      <div>{profile.matchingReason}</div>
    </div>
  </div>
);

export default ProfileCard;
