import { useState } from 'react';

import { Button, Stack } from '@/modules/application/components/DesignSystem';

interface ManualInfiniteScroll {
  next: () => any;
  hasMore: boolean;
  children: any;
  inverse?: boolean;
}

const ManualInfiniteScroll = ({ next, hasMore, inverse, children }: ManualInfiniteScroll) => {
  const [isLoading, setIsLoading] = useState(false);

  const items = [<Stack.Item key="children">{children}</Stack.Item>];
  if (hasMore) {
    items.push(
      <Stack.Item key="loadMore">
        <div className="m-auto">
          <Button
            size="s"
            status={isLoading ? 'busy' : ''}
            onClick={async () => {
              setIsLoading(true);
              await next();
              setIsLoading(false);
            }}
          >
            Show more
          </Button>
        </div>
      </Stack.Item>
    );
  }

  if (inverse) {
    items.reverse();
  }

  return <Stack spacing="l">{items}</Stack>;
};

export default ManualInfiniteScroll;
