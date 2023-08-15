import { forwardRef } from 'react';

import classNames from 'classnames';

interface Hyperlink {
  children: any;
  size?: 'inherit' | 'xs' | 's' | 'm' | 'l';
  theme?: 'bare' | 'decorated' | 'silent';
  color?: 'gray' | 'inherit';
  href?: string;
  target?: string;
  onClick?: () => any;
}

const Hyperlink = forwardRef<HTMLAnchorElement, any>(
  ({ children, color = 'inherit', theme = 'bare', size = 'm', ...others }: Hyperlink, ref) => {
    const linkClassnames = classNames('cursor-pointer inline-flex', {
      'border-b border-primary-400': theme === 'decorated',
      'text-xs': size === 'xs',
      'text-sm': size === 's',
      'text-base': size === 'm',
      'text-lg': size === 'l',
      'text-gray-400 hover:text-gray-700': color === 'gray',
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
      </Tag>
    );
  }
);

export default Hyperlink;
