import classNames from 'classnames';

import Option from './subcomponents/Option';

interface SelectInterface {
  children: any;
  onBlur?: any;
  onChange?: any;
  required?: boolean;
  value?: any;
  name?: string;
  size?: 's' | 'm';
  status?: '' | 'disabled' | 'invalid';
}

const Select = ({
  name,
  size = 'm',
  value,
  required = false,
  status = '',
  children,
  onChange,
  onBlur,
}: SelectInterface) => {
  const selectClassNames = classNames(
    'w-full bg-primary-50 dark:bg-zinc-850 font-mono border-gray-300 text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-zinc-500 font-medium border-b-8 border-r-8 border-primary-800 focus:outline-none',
    {
      'focus:ring-transparent dark:border-zinc-600 focus:border-primary-700 dark:focus:border-zinc-500':
        status !== 'invalid',
      'border-pink-600 focus:border-pink-600 focus:ring-pink-600': status === 'invalid',

      'h-12 text-base': size === 'm',
      'text-sm h-10': size === 's',

      'opacity-50': status === 'disabled',
    }
  );

  return (
    <select
      id={name}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      defaultValue={value}
      className={selectClassNames}
      required={required}
      disabled={status === 'disabled'}
    >
      {children}
    </select>
  );
};

export default Object.assign(Select, { Option });
