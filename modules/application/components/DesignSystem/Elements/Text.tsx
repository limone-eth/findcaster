import { forwardRef } from 'react';

import classNames from 'classnames';

interface Text {
  children: any;
  spacing?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';
  size?: 'inherit' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
  tag?: 'span' | 'div' | 'p';
  fontFamily?: 'sans' | 'mono';
  textAlign?: 'left' | 'center' | 'right';
  color?:
    | 'default'
    | 'inherit'
    | 'white'
    | 'red-500'
    | 'gray-100'
    | 'gray-200'
    | 'gray-300'
    | 'gray-400'
    | 'gray-500'
    | 'gray-600'
    | 'gray-700'
    | 'gray-800'
    | 'gray-900'
    | 'yellow-900';
  fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  lineClamp?: 'none' | 1 | 2 | 3 | 4;
}

const Text = forwardRef<any, Text>(
  (
    {
      children,
      spacing = 'none',
      size = 'm',
      tag: Tag = 'p',
      fontWeight = 'normal',
      color = 'default',
      textAlign = 'left',
      fontFamily = 'sans',
      lineClamp = 'none',
    }: Text,
    ref
  ) => {
    const classNamesComputed = classNames({
      'font-mono': fontFamily === 'mono',
      'font-sans': fontFamily === 'sans',

      'text-left': textAlign === 'left',
      'text-center': textAlign === 'center',
      'text-right': textAlign === 'right',

      'mb-1': spacing === 'xs',
      'mb-2': spacing === 's',
      'mb-4': spacing === 'm',
      'mb-6': spacing === 'l',
      'mb-8': spacing === 'xl',

      'text-xxs tracking-wide': size === 'xxs',
      'text-xs': size === 'xs',
      'text-sm': size === 's',
      'text-base': size === 'm',
      'text-lg': size === 'l',
      'text-xl tracking-tight': size === 'xl',
      'text-3xl leading-tight tracking-tighter': size === 'xxl',
      'text-5xl leading-tight tracking-tighter': size === 'xxxl',
      'tracking-wide': (size === 's' || size === 'xs') && fontFamily === 'sans',

      'font-light': fontWeight === 'light',
      'font-normal': fontWeight === 'normal',
      'font-medium': fontWeight === 'medium',
      'font-semibold': fontWeight === 'semibold',
      'font-bold': fontWeight === 'bold',

      'text-red-300': color === 'red-500',
      'text-gray-100': color === 'gray-100',
      'text-gray-200': color === 'gray-200',
      'text-gray-300': color === 'gray-300',
      'text-gray-400': color === 'gray-400',
      'text-gray-500': color === 'gray-500',
      'text-gray-600': color === 'gray-600',
      'text-gray-700': color === 'gray-700',
      'text-gray-800': color === 'gray-800',
      'text-gray-900': color === 'gray-900',
      'text-yellow-900': color === 'yellow-900',
      'text-gray-900 dark:text-white': color === 'default',
      'text-white dark:text-gray-900': color === 'white',

      'line-clamp-none': lineClamp === 'none',
      'line-clamp-1': lineClamp === 1,
      'line-clamp-2': lineClamp === 2,
      'line-clamp-3': lineClamp === 3,
      'line-clamp-4': lineClamp === 4,
    });

    return (
      <Tag className={classNamesComputed} ref={ref}>
        {children}
      </Tag>
    );
  }
);

export default Text;
