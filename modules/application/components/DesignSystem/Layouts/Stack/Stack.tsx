import classNames from 'classnames';

import findChildrenByRole from '@/modules/application/utils/findChildrenByRole';

import Item from './subcomponents/Item';

interface Stack {
  children: any;
  spacing?: 'none' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl';
  alignItems?: 'left' | 'center' | 'right';
  showDivider?: boolean;
  width?: 'full' | 'auto';
}

const Stack = ({ children, spacing = 'm', showDivider = false, alignItems = 'left', width = 'auto' }: Stack) => {
  const items = findChildrenByRole(children, 'Stack.Item');
  if (!items) {
    return null;
  }

  const stackClassNames = classNames({
    'divide-y divide-solid divide-gray-150 dark:divide-zinc-800': showDivider,
    'space-y-1': spacing === 'xxs',
    'space-y-2': spacing === 'xs',
    'space-y-3': spacing === 's',
    'space-y-4': spacing === 'm',
    'space-y-6': spacing === 'l',
    'space-y-8': spacing === 'xl',
    'space-y-10': spacing === 'xxl',
    'space-y-16': spacing === 'xxxl',
    'space-y-20': spacing === 'xxxxl',
    'w-full': width === 'full',
  });

  return children ? (
    <div className={stackClassNames}>
      {items.map((item: any) => {
        const { alignItems: itemAlignItems } = item.props;
        const stackItemClassNames = classNames({
          'flex flex-col': true,
          'items-center': itemAlignItems ? itemAlignItems === 'center' : alignItems === 'center',
          'items-start': itemAlignItems ? itemAlignItems === 'left' : alignItems === 'left',
          'flex flex-col items-end': itemAlignItems ? itemAlignItems === 'right' : alignItems === 'right',
        });
        return (
          <div key={`${item.toString()}_${item.key}`} className={stackItemClassNames}>
            {item}
          </div>
        );
      })}
    </div>
  ) : null;
};

export default Object.assign(Stack, { Item });
