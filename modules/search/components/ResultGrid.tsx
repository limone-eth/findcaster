import { ProfileInterface } from '@/models/farcaster/interfaces/ProfileInterface';
import ProfileCard from '@/modules/search/components/ProfileCard';

const ResultGrid = ({ profiles }: { profiles: ProfileInterface[] }) => (
  <div className="m-auto w-full px-4 md:max-w-6xl md:px-0">
    <div className="grid gap-3 md:grid-cols-3 md:gap-6">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  </div>
);

export default ResultGrid;
