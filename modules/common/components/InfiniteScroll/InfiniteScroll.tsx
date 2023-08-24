import { isMobile } from 'react-device-detect';
import ReactInfiniteScrollComponent from 'react-infinite-scroll-component';

import ManualInfiniteScroll from './components/ManualInfiniteScroll';

const MODE_MANUAL = 'manual'; // Click to load more.
const MODE_AUTO = 'auto'; // When mobile, use manual mode.

interface InfiniteScroll {
  mode?: 'manual' | 'auto';
  dataLength?: number;
  next: () => any;
  hasMore: boolean;
  loader: any;
  style?: any;
  children: any;
  scrollableTarget?: string;
  inverse?: boolean;
}

const InfiniteScroll = ({
  dataLength,
  next,
  style,
  hasMore,
  loader,
  children,
  mode = MODE_AUTO,
  scrollableTarget,
  inverse,
}: InfiniteScroll) => {
  if (mode === MODE_MANUAL || (mode === MODE_AUTO && isMobile)) {
    return (
      <ManualInfiniteScroll next={next} hasMore={hasMore} inverse={inverse}>
        {children}
      </ManualInfiniteScroll>
    );
  }

  return (
    <ReactInfiniteScrollComponent
      style={style}
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader={loader}
      scrollableTarget={scrollableTarget}
      inverse={inverse}
    >
      {children}
    </ReactInfiniteScrollComponent>
  );
};

export default InfiniteScroll;
