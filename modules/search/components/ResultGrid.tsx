import { ProfileInterface } from '@/models/farcaster/interfaces/ProfileInterface';
import ProfileCard from '@/modules/search/components/ProfileCard';

const ResultGrid = ({ profiles }: { profiles: ProfileInterface[] }) => (
  <div className="grid grid-cols-5 gap-4">
    {profiles.map((profile) => (
      <ProfileCard profile={profile} />
    ))}
  </div>
);

export default ResultGrid;
