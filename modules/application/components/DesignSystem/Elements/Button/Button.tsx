import { forwardRef } from 'react';

import Link from 'next/link';

import ButtonBase from './components/ButtonBase';
import Icon from './subcomponents/Icon';

interface Button {
  children: any;
  onClick?: any;
  target?: string;
  href?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  status?: '' | 'disabled' | 'busy';
  theme?: 'solid' | 'ghost' | 'bare';
  type?: 'button' | 'submit' | 'file' | 'link';
  color?: 'default' | 'red' | 'white' | 'gray' | 'green';
  width?: 'auto' | 'full' | 'square' | 'none' | 'round';
  align?: 'center' | 'left' | 'right';
}

const Button = forwardRef(({ ...props }: Button, ref) => {
  const buttonBaseProps = {
    theme: props.theme || 'solid',
    size: props.size || 'm',
    color: props.color || 'default',
    status: props.status || '',
    width: props.width || 'auto',
    align: props.align || 'center',
    children: props.children,
    onClick: props.onClick,
    href: props.href,
    target: props.target,
    type: props.type || 'button',
  };

  return props.href ? (
    <Link href={props.href} className="flex" target={props.target} passHref={true}>
      <ButtonBase {...buttonBaseProps} forwardRef={ref}>
        {props.children}
      </ButtonBase>
    </Link>
  ) : (
    <ButtonBase {...buttonBaseProps} forwardRef={ref}>
      {props.children}
    </ButtonBase>
  );
});

export default Object.assign(Button, { Icon });
