'use client';

import { forwardRef } from 'react';

import TippyReact from '@tippyjs/react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { LazyTippy } from '@/modules/application/components/LazyTippy';

interface DropdownInterface {
  children: any;
  target: any;
  spacing?: 'none' | 's' | 'm' | 'l';
  width?: 'auto' | 's' | 'm' | 'l';
  placement?: 'top' | 'bottom';
  scope?: 'local' | 'global';
  onVisible?: () => any;
  shouldHideOnClick?: boolean;
  isLazy?: boolean;
}

const Dropdown = forwardRef<any, any>(
  (
    {
      children,
      spacing = 'm',
      target,
      placement = 'bottom',
      width = 'm',
      onVisible,
      shouldHideOnClick = true,
      isLazy = false,
      scope = 'local',
    }: DropdownInterface,
    ref
  ) => {
    const dropdownClassNames = classNames({
      'bg-violet-700 border border-violet-800 rounded-lg shadow-violet-800 shadow-xl overflow-hidden': true,

      // spacing
      'p-0': spacing === 'none',
      'p-1': spacing === 's',
      'p-4': spacing === 'm',
      'p-6': spacing === 'l',

      // width
      'md:max-w-xxxs w-screen': width === 's',
      'md:max-w-xxs w-screen': width === 'm',
      'md:max-w-xs w-screen': width === 'l',
    });

    const TippyComponent = isLazy ? LazyTippy : TippyReact;

    return (
      <TippyComponent
        ref={ref}
        content={
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0,
                default: { duration: 0.2 },
              }}
              className={dropdownClassNames}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        }
        trigger="click"
        interactive={true}
        maxWidth="none"
        placement={placement}
        appendTo={scope === 'global' ? document.body : 'parent'}
        onMount={(instance) => {
          onVisible && onVisible();

          // Hide dropdown when item inside is clicked.
          if (shouldHideOnClick) {
            document.querySelector('[data-tippy-root]').addEventListener('click', () => {
              instance.hide();
            });
          }
        }}
      >
        {target}
      </TippyComponent>
    );
  }
);

export default Dropdown;
