import Link from 'next/link';

import { ProfileInterface } from '@/models/farcaster/interfaces/ProfileInterface';
import { Text } from '@/modules/application/components/DesignSystem';

const ProfileCard = ({ profile }: { profile: ProfileInterface }) => (
  <Link href={`https://warpcast.com/${profile.username}`} target="_blank" rel="noreferrer">
    <div className="flex h-full grow flex-col rounded-2xl border-2 border-violet-700 p-4 shadow-2xl md:p-6">
      <div className="flex grow flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-16 w-16 rounded-full border border-violet-800"
          src={profile.avatar_url}
          alt={profile.display_name}
        />
        <Text size="xxl" fontWeight="bold" textAlign="center" spacing="m">
          {profile.display_name}
        </Text>
        {profile.bio && (
          <Text textAlign="center" spacing="s">
            {profile.bio}
          </Text>
        )}
        <Text textAlign="center" spacing="xl" color="gray-800">
          @{profile.username}
        </Text>
        <div className="flex items-center justify-center space-x-4">
          <div className="inline-block rounded-2xl bg-violet-700 p-3 text-sm font-semibold text-white">
            {profile.followers} followers
          </div>
          <div className="inline-block rounded-2xl bg-violet-700 p-3 text-sm font-semibold text-white">
            {profile.following} following
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default ProfileCard;
