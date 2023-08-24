import classNames from 'classnames';

interface Heading {
  children: any;
  spacing?: 'none' | 's' | 'm' | 'l' | 'xl';
  size?: 'inherit' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
  textAlign?: 'left' | 'center' | 'right';
  color?: 'inherit' | 'white' | 'black';
  level?: 0 | 1 | 2 | 3 | 4;
  fontFamily?: 'sans' | 'mono';
}

const Heading = ({
  children,
  spacing = 'none',
  level = 2,
  color = 'white',
  textAlign = 'left',
  fontFamily = 'sans',
  size = 'm',
}: Heading) => {
  const classNamesComputed = classNames({
    'font-bold': true,

    'font-mono': fontFamily === 'mono',
    'font-sans': fontFamily === 'sans',

    'text-left': textAlign === 'left',
    'text-center': textAlign === 'center',
    'text-right': textAlign === 'right',

    'mb-2': spacing === 's',
    'mb-4': spacing === 'm',
    'mb-6': spacing === 'l',
    'mb-8': spacing === 'xl',

    'text-sm': size === 's',
    'text-lg': size === 'm',
    'text-xl': size === 'l',
    'text-2xl': size === 'xl',
    'text-3xl': size === 'xxl',
    'text-6xl': size === 'xxxl',

    'leading-tight tracking-tight': level === 0 || level === 1 || level === 2,
    'leading-snug': level === 3 || level === 4,

    'text-white': color === 'white',
    'text-gray-900': color === 'black',
  });

  let Tag;
  switch (level) {
    case 0:
    case 1:
      Tag = 'h1';
      break;
    case 3:
      Tag = 'h3';
      break;
    case 4:
      Tag = 'h4';
      break;
    default:
      Tag = 'h2';
      break;
  }

  return <Tag className={classNamesComputed}>{children}</Tag>;
};

export default Heading;
