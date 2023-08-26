import classNames from 'classnames';

import Spinner from '@/modules/common/components/animations/Spinner';

const mapThemeBorder = {
  solid: '',
  ghost: '',
  bare: '',
};

const mapThemeColor = {
  solid: {
    default: `text-primary-900 bg-white disabled:bg-gray-150 disabled:text-gray-400 shadow-special
    hover:bg-gray-100`,
    red: `text-white bg-red-500 disabled:bg-red-400
    hover:bg-red-600 active:bg-red-600
    focus:bg-red-600 focus:shadow-outline-danger`,
    green: `text-white bg-green-500 disabled:bg-green-500
    hover:bg-green-600 active:bg-green-600
    focus:bg-green-600 focus:shadow-outline-danger`,
    white: 'bg-white focus:bg-gray-200 focus:shadow-outline',
    gray: 'bg-gray-150 hover:bg-gray-300 disabled:bg-gray-300/80 disabled:text-gray-400 focus:shadow-outline',
  },
  ghost: {
    default: `bg-transparent border border-violet-800 text-primary-50 shadow-special`,
    red: `hover:text-red-400 text-red-500 border-red-500
    hover:border-red-400 focus:shadow-outline-danger`,
    green: `text-green-500 border-green-500 hover:border-green-600 focus:bg-green-500 focus:shadow-outline-danger`,
    white: 'text-white border-white hover:text-gray-900 hover:bg-white focus:shadow-outline',
    gray: `text-gray-700 border-gray-300 active:bg-zinc-600 hover:border-gray-500`,
  },
  bare: {
    default: 'text-gray-800 hover:text-black',
    red: 'text-red-500',
    green: 'text-green-500',
    white: 'text-white',
    gray: 'text-gray-600 hover:text-gray-800',
  },
};

const mapBaseSize = {
  xs: {
    full: 'h-7 px-2 text-sm w-full',
    auto: 'h-8 px-2 text-sm',
    square: 'h-7 w-7 text-sm',
    round: 'h-7 w-7 text-sm',
    none: 'h-7 text-sm',
  },
  s: {
    full: 'h-9 md:h-10 px-4 text-sm w-full',
    auto: 'h-9 md:h-10 px-4 text-sm ',
    square: 'h-9 w-9 md:h-10 md:w-10 text-sm shrink-0',
    round: 'h-9 w-9 md:h-10 md:w-10 text-sm shrink-0',
    none: 'h-9 md:h-10 text-sm',
  },
  m: {
    full: 'h-14 px-4 w-full',
    auto: 'h-14 px-6',
    square: 'h-14 w-12 shrink-0',
    round: 'h-14 w-12 rounded-full shrink-0',
    none: 'h-14',
  },
  l: {
    full: 'h-16 px-5 text-2xl w-full',
    auto: 'h-16 px-5 text-2xl',
    square: 'h-16 w-16 text-2xl  shrink-0',
    round: 'h-16 w-16 text-2xl rounded-full shrink-0',
    none: 'h-16 text-2xl',
  },
  xl: {
    full: 'h-20 px-8 text-2xl w-full',
    auto: 'h-20 px-8 text-2xl',
    square: 'h-20 w-20 text-2xl shrink-0',
    round: 'h-20 w-20 text-2xl rounded-full shrink-0',
    none: 'h-20 text-2xl',
  },
};

const mapAlign = {
  center: 'justify-center',
  left: 'justify-start',
  right: 'justify-end',
};

const getButtonChildren = (children) => {
  let buttonChildren = children;
  if (!Array.isArray(buttonChildren)) {
    buttonChildren = [buttonChildren];
  }

  buttonChildren = buttonChildren.map((child) => {
    if (child?.type?.role === 'Button.Icon') {
      return <div key="icon">{child}</div>;
    }

    if (typeof child === 'string' || child instanceof String) {
      return <div key={`label-${child}`}>{child}</div>;
    }

    return null;
  });

  return buttonChildren;
};

const ButtonBase = ({ theme, size, color, status, width, align, children, onClick, type, forwardRef }) => {
  const buttonChildren = getButtonChildren(children);

  const className = classNames(
    'flex relative items-center space-x-2 whitespace-no-wrap disabled:cursor-not-allowed focus:outline-none transition duration-300 font-medium',
    mapThemeBorder[theme],
    mapThemeColor[theme][color],
    mapBaseSize[size][width],
    mapAlign[align]
  );

  return (
    <button
      /* eslint-disable react/button-has-type */
      type={type}
      onClick={onClick}
      disabled={status === 'disabled' || status === 'busy'}
      className={className}
      ref={forwardRef}
    >
      {status === 'busy' ? (
        <div className="flex items-center space-x-2">
          <Spinner size="s" />
        </div>
      ) : (
        <div className="flex items-center space-x-3 whitespace-pre">
          {buttonChildren.filter((buttonChild) => buttonChild)}
        </div>
      )}
    </button>
  );
};

export default ButtonBase;
