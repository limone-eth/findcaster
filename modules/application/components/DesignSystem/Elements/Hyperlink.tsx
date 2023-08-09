import { forwardRef } from 'react';

import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

interface Hyperlink {
  children: any;
  size?: 'inherit' | 'xs' | 's' | 'm' | 'l';
  theme?: 'bare' | 'decorated' | 'silent';
  color?: 'default' | 'gray' | 'inherit';
  href?: string;
  target?: string;
  onClick?: () => any;
}

const Hyperlink = forwardRef<HTMLAnchorElement, any>(
  ({ children, color = 'default', theme = 'bare', size = 'm', ...others }: Hyperlink, ref) => {
    const linkClassnames = classNames('cursor-pointer inline-flex', {
      'border-b border-primary-400 dark:border-zinc-600': theme === 'decorated',
      'text-xs font-medium': size === 'xs',
      'text-sm font-medium': size === 's',
      'text-base font-medium': size === 'm',
      'text-lg font-semibold': size === 'l',
      'text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-100': color === 'gray',
      'text-blue-800 hover:text-blue-900 dark:text-gray-200 dark:hover:text-white': color === 'default',
    });

    let Tag: any = 'a';
    let type: any = null;
    if (!others.href && others.onClick) {
      Tag = 'button';
      type = 'button';
    }

    return (
      <Tag
        className={linkClassnames}
        href={others.href}
        onClick={others.onClick}
        ref={ref}
        type={type}
        target={others.target}
      >
        {children}
        {others.target === '_blank' && theme === 'decorated' && (
          <ArrowUpRightIcon className="w-4 text-gray-400 dark:text-gray-500" />
        )}
      </Tag>
    );
  }
);

export default Hyperlink;
