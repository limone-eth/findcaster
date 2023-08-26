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
  color?: 'red' | 'white' | 'purple' | 'green' | 'gray' | 'blue';
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
      'bg-gray-800 text-gray-200 border-gray-800': color === 'white' && theme === 'solid',
      'bg-gray-100 text-gray-600 border-gray-100': color === 'gray' && theme === 'solid',
      'text-green-800 bg-green-50 border-green-100': color === 'green' && theme === 'solid',
      'bg-red-100 text-red-700 border-red-100': color === 'red' && theme === 'solid',
      'bg-blue-50 text-blue-500 border-blue-50': color === 'blue' && theme === 'solid',
      'bg-violet-300 text-violet-900 border-violet-300': color === 'purple' && theme === 'solid',

      // theme ghost
      'bg-transparent': theme === 'ghost',
      'border-gray-500 text-gray-700': color === 'white' && theme === 'ghost',
      'border-gray-300 text-gray-500': color === 'gray' && theme === 'ghost',
      'border-green-700 text-green-700': color === 'green' && theme === 'ghost',
      'border-red-600 text-red-600': color === 'red' && theme === 'ghost',
      'border-violet-700 text-violet-700': color === 'purple' && theme === 'ghost',
      'border-blue-500 text-blue-500': color === 'blue' && theme === 'ghost',

      // theme bare
      'bg-transparent border-transparent px-0': theme === 'bare',
      'text-gray-700': color === 'white' && theme === 'bare',
      'text-gray-500': color === 'gray' && theme === 'bare',
      'text-green-600': color === 'green' && theme === 'bare',
      'text-red-800': color === 'red' && theme === 'bare',
      'text-blue-500': color === 'blue' && theme === 'bare',
      'text-violet-700': color === 'purple' && theme === 'bare',

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
