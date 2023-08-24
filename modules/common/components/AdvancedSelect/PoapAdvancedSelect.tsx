import { AdvancedSelect } from '@/modules/application/components/DesignSystem';
import { PoapSearchResultItem } from '@/modules/common/components/AdvancedSelect/SearchResultItems';
import usePoapsSearch from '@/modules/poaps/hooks/usePoapsSearch';

const PoapAdvancedSelect = ({ onSelect, onChange, footer, status, value, size, shouldCloseOnSelect }: any) => {
  const { options, handleSearch } = usePoapsSearch();

  return (
    <AdvancedSelect
      placeholder="Search by POAP e.g. NFT Denver..."
      options={options || []}
      renderOption={(option) => <PoapSearchResultItem item={option} />}
      onInputChange={handleSearch}
      onSelect={onSelect}
      onChange={onChange}
      footer={footer}
      status={status}
      size={size}
      value={value}
      shouldCloseOnSelect={shouldCloseOnSelect}
    />
  );
};

export default PoapAdvancedSelect;
