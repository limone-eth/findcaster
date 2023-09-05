import Spinner from '@/modules/common/components/animations/Spinner';

export default async function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner size="xl" />
    </div>
  );
}
