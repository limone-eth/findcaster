import { AdvancedSelect } from '@/modules/application/components/DesignSystem';
import { PoapSearchResultItem } from '@/modules/common/components/AdvancedSelect/SearchResultItems';
import usePoapsSearch from '@/modules/poaps/hooks/usePoapsSearch';

const PoapAdvancedSelect = ({ onSelect, onChange, footer, status, value, size, shouldCloseOnSelect }: any) => {
  const { options, handleSearch } = usePoapsSearch();

  return (
    <div>
      <label htmlFor="large-input" className="mb-2 block text-sm font-medium text-white dark:text-white">
        POAPs people collected
      </label>
      <AdvancedSelect
        placeholder="rAAVE Lisbon, ETHDenver 2022..."
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
    </div>
  );
};

export default PoapAdvancedSelect;
