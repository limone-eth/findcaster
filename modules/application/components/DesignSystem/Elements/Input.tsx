'use client';

import { useState, forwardRef } from 'react';

import classNames from 'classnames';

interface Input {
  name?: string;
  type?: string;
  size?: 's' | 'm' | 'xl';
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  required?: boolean;
  status?: '' | 'disabled' | 'invalid';
  theme?: 'default' | 'bare';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  maxLength?: number | undefined;
  showCount?: boolean;
  readOnly?: boolean;
  onChange?: any;
  onBlur?: any;
  onKeyDown?: any;
  onFocus?: any;
}

const Input = forwardRef<HTMLInputElement, Input>(
  (
    {
      defaultValue,
      name,
      type = 'text',
      size = 'm',
      placeholder,
      value,
      required = false,
      status = '',
      maxLength = undefined,
      showCount = false,
      fontWeight = 'medium',
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      theme = 'default',
      readOnly = false,
    }: Input,
    ref
  ) => {
    const inputClassNames = classNames(
      'px-3 w-full text-white bg-violet-700 placeholder-violet-400 rounded-xl focus:outline-none',
      {
        'border-0 pl-0 focus:ring-transparent': theme === 'bare',
        'border-1 focus:ring-transparent border-violet-800 focus:border-violet-900':
          status !== 'invalid' && theme === 'default',
        'border-1 border-red-600 focus:border-red-600 focus:ring-transparent':
          status === 'invalid' && theme === 'default',
        'text-xl leading-tight tracking-tight h-20': size === 'xl',
        'h-12': size === 'm',
        'text-sm h-10': size === 's',
        'font-normal': fontWeight === 'normal',
        'font-medium': fontWeight === 'medium',
        'font-semibold': fontWeight === 'semibold',
        'font-bold': fontWeight === 'bold',
        'opacity-50': status === 'disabled',
        'pr-16': showCount,
      }
    );

    const [inputValue, setInputValue] = useState(value);

    return (
      <div className="relative flex w-full grow flex-col">
        <input
          defaultValue={defaultValue}
          readOnly={readOnly}
          ref={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          className={inputClassNames}
          required={required}
          disabled={status === 'disabled'}
          maxLength={maxLength}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onChange={(e) => {
            onChange && onChange(e);
            setInputValue(e.target.value);
          }}
          value={value}
        />
        {showCount && maxLength && (
          <div
            className={`absolute right-0 top-4 mr-3 mt-1 text-xs font-medium leading-none ${
              inputValue && inputValue.length >= maxLength ? 'font-semibold text-red-600' : 'text-gray-300'
            }`}
          >
            {maxLength - (inputValue ? inputValue.length : 0)}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
