import { Text } from '@/modules/application/components/DesignSystem';

const InterestSearchResultItem = ({ item }) => (
  <div className="w-full p-3">
    <Text size="s" color="white" fontWeight="medium" lineClamp={1}>
      {item.name}
    </Text>
  </div>
);

export default InterestSearchResultItem;
