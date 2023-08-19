import { ProfileInterface } from '@/models/farcaster/interfaces/ProfileInterface';

const ProfileCard = ({ profile }: { profile: ProfileInterface }) => (
  <div className="mt-8">
    <a href={`https://warpcast.com/${profile.username}`} target="_blank" rel="noreferrer">
      <div className="flex max-w-sm flex-col justify-between overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="px-6 py-4">
          <img className="mr-4 h-16 w-16 rounded-full" src={profile.avatar_url} alt="Avatar of Jonathan Reinink" />
          <div className="text-xl font-bold">{profile.display_name}</div>
          <div className="mb-2 text-sm text-gray-600">@{profile.username}</div>
          <p id="bio" className="whitespace-normal text-base text-gray-700">
            {profile.bio}
          </p>
        </div>
        <div className="flex flex-auto whitespace-nowrap p-6">
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
