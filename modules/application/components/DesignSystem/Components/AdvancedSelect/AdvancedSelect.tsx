'use client';

import { cloneElement, useCallback, useEffect, useState } from 'react';

import classNames from 'classnames';
import { useCombobox } from 'downshift';

import { Input } from '@/modules/application/components/DesignSystem';
import { isObject } from '@/modules/common/utils/objectUtils';
import { isString } from '@/modules/common/utils/stringUtils';

import NoResultsItem from './components/NoResultsItem';

const getSelectedItemFromValue = (value) => {
  if (isString(value)) {
    return { name: value };
  }

  if (isObject(value)) {
    return value;
  }

  return null;
};

interface AdvancedSelectInterface {
  renderOption: (any) => any;
  placeholder?: string;
  size?: 's' | 'm' | 'xl';
  status?: '' | 'disabled' | 'invalid';
  onChange?: (any) => any;
  onSelect?: (any) => any;
  onInputChange?: (any) => any;
  footer?: any;
  options?: any;
  allowCustomValues?: boolean;
  shouldCloseOnSelect?: boolean;
  value?: any;
}

const AdvancedSelect = ({
  placeholder = 'Search...',
  onChange,
  onSelect,
  status = '',
  footer,
  value,
  onInputChange,
  options = [],
  renderOption,
  allowCustomValues = false,
  size = 'm',
  shouldCloseOnSelect = true,
}: AdvancedSelectInterface) => {
  const [selectedItem, setSelectedItem] = useState(getSelectedItemFromValue(value));

  useEffect(() => {
    if (value) {
      setSelectedItem(getSelectedItemFromValue(value));
    }
  }, [value]);

  const stateReducer = useCallback((state, actionAndChanges) => {
    const { type, changes } = actionAndChanges;
    switch (type) {
      case useCombobox.stateChangeTypes.ItemClick:
        if (!shouldCloseOnSelect) {
          return {
            ...changes,
            isOpen: state.isOpen,
          };
        }
        return changes;
      default:
        return changes; // Otherwise business as usual.
    }
  }, []);

  const { isOpen, getMenuProps, getInputProps, highlightedIndex, getItemProps, inputValue, selectItem, setInputValue } =
    useCombobox({
      items: options,
      itemToString(item) {
        return item ? item.name : '';
      },
      selectedItem,
      onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
        if (onSelect) {
          onSelect(newSelectedItem);
          setInputValue('');
        } else {
          setSelectedItem(newSelectedItem);
          onChange && onChange(newSelectedItem);
        }
      },
      stateReducer,
    });

  const handleInputChange = (event) => {
    if (!event.target.value) {
      selectItem(null);
      return onChange && onChange(event.target.value);
    }

    if (!onInputChange) {
      return null;
    }

    return onInputChange(event.target.value);
  };

  return (
    <div>
      <div className="relative">
        <Input
          size={size}
          status={status}
          {...getInputProps({
            placeholder,
            onChange: (e) => handleInputChange(e),
            onBlur: (e) => {
              if (!allowCustomValues) {
                if (!selectedItem || selectedItem.name !== inputValue) {
                  // Small delay to allow actions (if there are any) before the menu closes.
                  setTimeout(() => {
                    onChange && onChange(null);
                    setInputValue('');
                  }, 200);
                }
                return;
              }

              const label = e.target.value;

              if (selectedItem) {
                if (selectedItem.name === label) {
                  return;
                }
              }

              onChange && onChange(label);
            },
          })}
        />
      </div>
      <ul {...getMenuProps()} className="relative" id="downshift" aria-labelledby="downshift">
        {status !== 'disabled' && isOpen && (options?.length > 0 || inputValue?.length > 0) ? (
          <div className="absolute z-10 mt-2 w-full rounded-lg border border-violet-700 bg-violet-600 shadow-xl shadow-violet-900/80">
            <div className="max-h-52 overflow-y-auto">
              {options.map((option, index) => {
                const isSelectedItem = selectedItem?.name === option?.name;
                const isHighlighted = highlightedIndex === index;
                const classes = classNames('cursor-pointer', {
                  'bg-violet-800': isHighlighted || isSelectedItem,
                });

                return (
                  <div {...getItemProps({ key: index, index, item: option })} className={classes}>
                    {renderOption(option)}
                  </div>
                );
              })}
              {options?.length === 0 && (
                <div>
                  <NoResultsItem />
                </div>
              )}
            </div>
            {footer && (
              <div className="border-t border-gray-300">{cloneElement(footer, { inputValue: inputValue || '' })}</div>
            )}
          </div>
        ) : null}
      </ul>
    </div>
  );
};

export default AdvancedSelect;
