import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { Button, Dropdown, Text } from '@/modules/application/components/DesignSystem';

const getOrderByLabel = (_orderBy) => {
  switch (_orderBy) {
    case 'id':
      return 'ID';
    case 'followers':
      return 'Followers';
    case 'following':
      return 'Followings';
    default:
      return 'ID';
  }
};

const OrderByFilter = ({ orderBy, onChangeOrderBy }) => (
  <div className="flex items-center space-x-1">
    <Text size="s">Order by:</Text>
    <Dropdown
      width="auto"
      spacing="s"
      target={
        <div className="flex cursor-pointer items-center space-x-1 text-gray-700 hover:text-gray-900 dark:text-zinc-300 dark:hover:text-zinc-100 ">
          <Text size="s" color="inherit" fontWeight="medium">
            {getOrderByLabel(orderBy)}
          </Text>
          <div>
            <ChevronDownIcon className="w-6" />
          </div>
        </div>
      }
    >
      <div>
        <Button size="xs" theme="bare" width="full" onClick={() => onChangeOrderBy('id')}>
          ID
        </Button>
        <Button size="xs" theme="bare" width="full" onClick={() => onChangeOrderBy('followers')}>
          Followers
        </Button>
        <Button size="xs" theme="bare" width="full" onClick={() => onChangeOrderBy('following')}>
          Followings
        </Button>
      </div>
    </Dropdown>
  </div>
);

export default OrderByFilter;
