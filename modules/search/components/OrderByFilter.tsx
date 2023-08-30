import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { Button, Dropdown, Text } from '@/modules/application/components/DesignSystem';

const getOrderByLabel = (_orderBy) => {
  switch (_orderBy) {
    case 'followers':
      return 'Followers';
    case 'following':
      return 'Followings';
    case 'id':
    default:
      return 'ID';
  }
};

const OrderByFilter = ({ orderBy, onChangeOrderBy }) => (
  <div className="flex items-center space-x-1">
    <Text size="s">Order by:&nbsp;</Text>
    <Dropdown
      width="auto"
      spacing="s"
      target={
        <div className="flex cursor-pointer items-center space-x-1 text-gray-700 hover:text-gray-900 dark:text-zinc-300 dark:hover:text-zinc-100 ">
          <Text size="s" color="white" fontWeight="medium">
            {getOrderByLabel(orderBy)}
          </Text>
          <div>
            <ChevronDownIcon className="w-6 text-white" />
          </div>
        </div>
      }
    >
      <div>
        <Button color="white" size="xs" theme="bare" width="full" onClick={() => onChangeOrderBy('id')}>
          ID
        </Button>
        <Button color="white" size="xs" theme="bare" width="full" onClick={() => onChangeOrderBy('followers')}>
          Followers
        </Button>
        <Button color="white" size="xs" theme="bare" width="full" onClick={() => onChangeOrderBy('following')}>
          Followings
        </Button>
      </div>
    </Dropdown>
  </div>
);

export default OrderByFilter;
