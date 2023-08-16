import { ProfileInterface } from '@/models/farcaster/interfaces/ProfileInterface';

const ProfileCard = ({ profile }: { profile: ProfileInterface }) => (
  <div className="mt-8">
    <a href={`https://warpcast.com/${profile.username}`} target="_blank" rel="noreferrer">
      <div className="flex h-64 max-w-sm flex-col justify-between overflow-hidden rounded shadow-lg ">
        <div className="px-6 py-4">
          <img className="mr-4 h-16 w-16 rounded-full" src={profile.avatar_url} alt="Avatar of Jonathan Reinink" />
          <div className="text-xl font-bold">{profile.display_name}</div>
          <div className="mb-2 text-sm text-gray-600">@{profile.username}</div>
          <p id="bio" className="whitespace-normal text-base text-gray-700">
            Underneath the starry night, whispers of adventure carried on the gentle breeze, guiding wanderers toward
            the unknown horizon.
          </p>
        </div>
        <div className="p-6">
          <div>
            <span className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              {profile.followers} followers
            </span>
            <span className="ml-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              {profile.following} following
            </span>
          </div>
        </div>
      </div>
    </a>
  </div>
);

export default ProfileCard;
