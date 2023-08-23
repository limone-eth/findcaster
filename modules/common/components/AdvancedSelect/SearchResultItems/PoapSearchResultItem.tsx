import { Text } from '@/modules/application/components/DesignSystem';

const PoapSearchResultItem = ({ item }) => (
  <div className="w-full p-3">
    <Text size="s" color="gray-800" fontWeight="medium" lineClamp={1}>
      {item.name}
    </Text>
  </div>
);

export default PoapSearchResultItem;
