'use client';

import { forwardRef, useState } from 'react';

import classNames from 'classnames';

interface Textarea {
  name: string;
  size?: 's' | 'm';
  rows?: number;
  placeholder?: string;
  value?: string;
  required?: boolean;
  showCount?: boolean;
  status: '' | 'disabled' | 'invalid';
  maxLength?: number;
  onChange?: (any) => any;
  onClick?: () => any;
}

const Textarea = forwardRef<HTMLTextAreaElement, Textarea>(
  (
    {
      name,
      size = 'm',
      rows = 4,
      placeholder,
      value,
      required = false,
      status = '',
      maxLength = null,
      showCount = false,
      onChange,
      onClick,
    }: Textarea,
    ref
  ) => {
    const inputClassNames = classNames(
      'w-full bg-transparent border-gray-300 text-gray-900 placeholder-gray-400 dark:placeholder-zinc-500 font-medium rounded-lg border',
      {
        'resize-none overflow-hidden dark:text-gray-50': true,
        'focus:ring-transparent dark:border-zinc-600 focus:border-yellow-400 dark:focus:border-zinc-500':
          status !== 'invalid',
        'border-pink-600 focus:border-pink-600 focus:ring-pink-600': status === 'invalid',
        'text-sm': size === 's',
        'text-base min-h-[48px]': size === 'm',
        'opacity-50': status === 'disabled',
      }
    );

    const [inputValue, setInputValue] = useState(value);

    return (
      <div className="relative flex w-full grow">
        <textarea
          ref={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          className={inputClassNames}
          required={required}
          disabled={status === 'disabled'}
          maxLength={maxLength}
          onChange={(e) => {
            onChange && onChange(e);
            setInputValue(e.target.value);
          }}
          value={value}
          rows={rows}
          onClick={() => {
            onClick && onClick();
          }}
        />
        {showCount && maxLength && (
          <div
            className={`absolute bottom-3 right-1 mr-3 mt-1 bg-white text-xs font-medium leading-none dark:bg-zinc-800 ${
              inputValue?.length >= maxLength ? 'font-semibold text-red-600' : 'text-gray-500 dark:text-gray-600'
            }`}
          >
            {inputValue?.length || 0}/{maxLength}
          </div>
        )}
      </div>
    );
  }
);

export default Textarea;
