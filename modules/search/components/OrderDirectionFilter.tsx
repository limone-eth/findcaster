import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { Button, Dropdown, Text } from '@/modules/application/components/DesignSystem';
import { capitalizeFirstLetter } from '@/modules/common/utils/stringUtils';

const OrderDirectionFilter = ({ orderDir, onChangeOrderDir }) => (
  <div className="flex items-center space-x-1">
    <Text size="s">Sort:&nbsp;</Text>
    <Dropdown
      width="auto"
      spacing="s"
      target={
        <div className="flex cursor-pointer items-center space-x-1 text-gray-700 hover:text-gray-900 dark:text-zinc-300 dark:hover:text-zinc-100 ">
          <Text size="s" color="white" fontWeight="medium">
            {capitalizeFirstLetter(orderDir)}
          </Text>
          <div>
            <ChevronDownIcon className="w-6 text-white" />
          </div>
        </div>
      }
    >
      <div>
        <Button color="white" size="xs" theme="bare" width="full" onClick={() => onChangeOrderDir('asc')}>
          Asc
        </Button>
        <Button color="white" size="xs" theme="bare" width="full" onClick={() => onChangeOrderDir('desc')}>
          Desc
        </Button>
      </div>
    </Dropdown>
  </div>
);

export default OrderDirectionFilter;
