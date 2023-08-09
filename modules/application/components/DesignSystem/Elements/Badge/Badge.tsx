import React from 'react';

import classNames from 'classnames';

import Icon from './subcomponents/Icon';

const getBadgeChildren = (children, lineClamp) => {
  let badgeChildren = children;

  if (!Array.isArray(badgeChildren)) {
    badgeChildren = [badgeChildren];
  }

  return badgeChildren.map((child) => {
    if (child?.type?.role === 'Badge.Icon') {
      return (
        <div className="flex items-center justify-center leading-none" key="icon">
          {child}
        </div>
      );
    }

    if (typeof child === 'string' || child instanceof String) {
      return (
        <div key="label" className={lineClamp ? 'line-clamp-1' : ''}>
          {child}
        </div>
      );
    }

    return null;
  });
};

interface Badge {
  children: any;
  size?: 'xs' | 's' | 'm' | 'l';
  theme?: 'solid' | 'ghost' | 'bare';
  color?: 'red' | 'white' | 'yellow' | 'green' | 'gray' | 'blue';
  transform?: 'uppercase' | 'lowercase' | 'capitalize';
  lineClamp?: boolean;
}

const Badge = React.forwardRef<any, any>(
  ({ theme = 'solid', size = 'm', color = 'gray', transform, lineClamp = false, children }: Badge, ref) => {
    const containerClassNames = classNames({
      // base
      'inline-flex items-center justify-between font-mono border min-w-0': true,

      // sizes
      'px-1 py-[0.18rem] text-xs space-x-2 rounded-lg font-medium': size === 'xs',
      'px-2 py-1 text-sm space-x-2 rounded-lg font-medium': size === 's',
      'px-3 py-1 text-base leading-tight space-x-2 rounded-lg font-medium': size === 'm',
      'px-3 py-1 text-lg leading-tight space-x-2 rounded-lg font-medium': size === 'l',

      // theme solid
      'bg-gray-800 text-gray-200 dark:bg-zinc-100 dark:text-gray-700 border-gray-800 dark:border-zinc-100':
        color === 'white' && theme === 'solid',
      'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-200 border-gray-100 dark:border-zinc-800':
        color === 'gray' && theme === 'solid',
      'text-green-800 bg-green-50 dark:bg-lime-900 dark:text-lime-500 border-green-100 dark:border-lime-900':
        color === 'green' && theme === 'solid',
      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-500 border-red-100 dark:border-red-900':
        color === 'red' && theme === 'solid',
      'bg-blue-50 text-blue-500 dark:bg-blue-900 dark:text-blue-100 border-blue-50 dark:border-blue-900':
        color === 'blue' && theme === 'solid',
      'bg-yellow-200 text-yellow-800 dark:bg-yellow-dark-900 dark:text-yellow-dark-500 border-yellow-50 dark:border-yellow-dark-900':
        color === 'yellow' && theme === 'solid',

      // theme ghost
      'bg-transparent': theme === 'ghost',
      'border-gray-500 text-gray-700 dark:border-zinc-400 dark:text-gray-200': color === 'white' && theme === 'ghost',
      'border-gray-300 dark:border-zinc-600 text-gray-500 dark:text-gray-200': color === 'gray' && theme === 'ghost',
      'border-green-700 dark:border-lime-500 text-green-700 dark:text-lime-500': color === 'green' && theme === 'ghost',
      'border-red-600 dark:border-red-500 text-red-600 dark:text-red-500': color === 'red' && theme === 'ghost',
      'border-yellow-700 dark:border-yellow-dark-400 text-yellow-700 dark:text-yellow-dark-400':
        color === 'yellow' && theme === 'ghost',
      'border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400': color === 'blue' && theme === 'ghost',

      // theme bare
      'bg-transparent border-transparent px-0': theme === 'bare',
      'text-gray-700 dark:text-gray-100': color === 'white' && theme === 'bare',
      'text-gray-500 dark:text-gray-300': color === 'gray' && theme === 'bare',
      'text-green-600 dark:text-lime-500': color === 'green' && theme === 'bare',
      'text-red-800 dark:text-pink-800': color === 'red' && theme === 'bare',
      'text-blue-500 dark:text-blue-400': color === 'blue' && theme === 'bare',
      'text-yellow-700 dark:text-yellow-dark-400': color === 'yellow' && theme === 'bare',

      // transforms
      uppercase: transform === 'uppercase',
      lowercase: transform === 'lowercase',
      capitalize: transform === 'capitalize',
    });

    return (
      <div className={containerClassNames} ref={ref}>
        {getBadgeChildren(children, lineClamp).filter(Boolean)}
      </div>
    );
  }
);

export default Object.assign(Badge, { Icon });
