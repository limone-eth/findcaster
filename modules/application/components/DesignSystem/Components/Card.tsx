import classNames from 'classnames';

interface Card {
  children: any;
  spacing?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';
  elevation?: 'none' | 's' | 'm' | 'l' | 'xl';
  theme?: 'solid' | 'ghost';
  isOverflowHidden?: boolean;
}

const Card = ({ children, spacing = 'm', elevation = 'none', theme = 'solid', isOverflowHidden = false }: Card) => {
  const containerClassNames = classNames({
    'flex flex-col rounded-xl w-full': true,

    'bg-primary-800 border-2 border-primary-600': theme === 'solid',
    'bg-transparent border-2': theme === 'ghost',

    'p-2': spacing === 'xs',
    'p-3 md:p-4': spacing === 's',
    'p-4 md:p-6': spacing === 'm',
    'p-5 md:p-8': spacing === 'l',
    'p-6 md:p-10': spacing === 'xl',

    'shadow-none': elevation === 'none',
    'shadow-sm': elevation === 's',
    'shadow-md': elevation === 'm',
    'shadow-lg': elevation === 'l',
    'shadow-xl': elevation === 'xl',

    'overflow-hidden': isOverflowHidden,
  });

  if (!Array.isArray(children)) {
    children = [children];
  }

  return <div className={containerClassNames}>{children}</div>;
};

export default Card;
