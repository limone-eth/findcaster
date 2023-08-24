import Link from 'next/link';

import { ProfileInterface } from '@/models/farcaster/interfaces/ProfileInterface';
import { Text } from '@/modules/application/components/DesignSystem';

const ProfileCard = ({ profile }: { profile: ProfileInterface }) => (
  <Link href={`https://warpcast.com/${profile.username}`} target="_blank" rel="noreferrer">
    <div className="flex h-full grow flex-col rounded-2xl border-2 border-violet-700 bg-gradient-to-tr from-violet-500/50 to-violet-600/50 p-4 shadow-2xl md:p-6">
      <div className="flex grow flex-col items-center justify-between">
        <div className="flex grow flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-16 w-16 rounded-full border border-violet-800"
            src={profile.avatar_url}
            alt={profile.display_name}
          />
          <div className="mb-5 mt-2 flex flex-col space-y-1">
            <Text size="xxl" fontWeight="bold" textAlign="center">
              {profile.display_name}
            </Text>
            <Text textAlign="center" color="gray-900" fontWeight="semibold">
              @{profile.username}
            </Text>
            {profile.bio && <Text textAlign="center">{profile.bio}</Text>}
          </div>
        </div>
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
