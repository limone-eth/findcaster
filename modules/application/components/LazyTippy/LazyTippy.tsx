'use client';

import { forwardRef, useState } from 'react';

import Tippy from '@tippyjs/react';

const LazyTippy = forwardRef<any, any>((props: any, ref) => {
  const [mounted, setMounted] = useState(false);

  const lazyPlugin = {
    fn: () => ({
      onMount: () => setMounted(true),
      onHidden: () => setMounted(false),
    }),
  };

  const computedProps: { plugins?: any; render?: any; content?: any } = { ...props };

  computedProps.plugins = [lazyPlugin, ...(props.plugins || [])];

  if (props.render) {
    computedProps.render = (...args) => (mounted ? props.render(...args) : '');
  } else {
    computedProps.content = mounted ? props.content : '';
  }

  return <Tippy {...computedProps} ref={ref} />;
});

export default LazyTippy;
