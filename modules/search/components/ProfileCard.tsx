import Link from 'next/link';
import numeral from 'numeral';

import { getPoapEventUrl, getWarpcastCastUrl, getWarpcastUrl } from '@/models/application/services/UrlService';
import { ProfileInterface } from '@/models/farcaster/interfaces/ProfileInterface';
import { Badge, Text } from '@/modules/application/components/DesignSystem';

const ProfileCard = ({ profile, searchedInterests }: { profile: ProfileInterface; searchedInterests: string[] }) => {
  const matchingCasts =
    searchedInterests?.length > 0 && profile.matching_casts?.length > 0
      ? profile.matching_casts
          .filter((c) => searchedInterests.some((castText) => c.text.toLowerCase().includes(castText.toLowerCase())))
          .map((cast) => {
            const matchingInterests = searchedInterests.filter((castText) =>
              cast.text.toLowerCase().includes(castText.toLowerCase())
            );
            return {
              hash: cast.hash,
              matchingInterests,
            };
          })
      : [];
  return (
    <div className="flex h-full grow flex-col rounded-3xl border-4 border-violet-600 bg-gradient-to-tr from-violet-500/50 to-violet-600/50 p-4 shadow-lg md:p-6">
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
            <div className="inline-block w-24 rounded-xl bg-violet-600 p-3 text-center text-xl font-semibold text-white">
              {numeral(profile.followers || 0).format('0,0a')}
            </div>
            <Text size="s" fontWeight="semibold">
              Followers
            </Text>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <div className="inline-block w-24 rounded-xl bg-violet-600 p-3 text-center text-xl font-semibold text-white">
              {numeral(profile.following || 0).format('0,0a')}
            </div>
            <Text size="s" fontWeight="semibold">
              Following
            </Text>
          </div>
        </div>
        <hr />
        <div className="mt-4 flex">
          {profile.matching_poaps?.length > 0 &&
            profile.matching_poaps.map((poap) => (
              <Link href={getPoapEventUrl(poap.id)} target="_blank" rel="noreferrer">
                <div key={poap.id} className="mb-3 mr-3 inline-block">
                  <Badge color="green" size="xs">
                    {/* Link to poap https://poap.gallery/event/poap.id */}
                    {poap.name}
                  </Badge>
                </div>
              </Link>
            ))}
          {matchingCasts?.length > 0 &&
            matchingCasts.map((cast, index) => (
              <Link href={getWarpcastCastUrl(profile.username, cast.hash)} target="_blank" rel="noreferrer">
                <div key={index} className="mb-3 mr-3 inline-block">
                  <Badge color="blue" size="xs">
                    {cast.matchingInterests[0]}
                  </Badge>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
