import { AdvancedSelect } from '@/modules/application/components/DesignSystem';
import { InterestSearchResultItem } from '@/modules/common/components/AdvancedSelect/SearchResultItems';

const InterestAdvancedSelect = ({ onSelect, onChange, footer, status, value, size, shouldCloseOnSelect }: any) => {
  const options = [
    { name: 'Politics', id: 'politics' },
    { name: 'Events', id: 'events' },
    { name: 'Culture', id: 'culture' },
    { name: 'Sports', id: 'sports' },
    { name: 'Technology', id: 'technology' },
    { name: 'Wellness', id: 'wellness' },
    { name: 'Travel', id: 'travel' },
    { name: 'Fashion', id: 'fashion' },
    { name: 'Food', id: 'food' },
    { name: 'Relationships', id: 'relationships' },
    { name: 'Education', id: 'education' },
    { name: 'Environment', id: 'environment' },
    { name: 'Humor', id: 'humor' },
    { name: 'Parenting', id: 'parenting' },
    { name: 'Art', id: 'art' },
    { name: 'Issues', id: 'issues' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Gaming', id: 'gaming' },
    { name: 'Books', id: 'books' },
    { name: 'DIY', id: 'diy' },
    { name: 'NFT', id: 'nft' },
    { name: 'Artificial Intelligence', id: 'ai' },
    { name: 'Blockchain', id: 'blockchain' },
    { name: 'Cryptocurrencies', id: 'crypto' },
    { name: 'Decentralized Finance', id: 'defi' },
    { name: 'Smart Contracts', id: 'smart-contracts' },
    { name: 'NFTs', id: 'nfts' },
    { name: 'Cybersecurity', id: 'cybersecurity' },
    { name: 'Data Privacy', id: 'data-privacy' },
    { name: 'E-Commerce', id: 'e-commerce' },
    { name: 'Cloud Computing', id: 'cloud-computing' },
    { name: 'Startups', id: 'startups' },
    { name: 'Venture Capital', id: 'venture-capital' },
    { name: 'Tech Gadgets', id: 'tech-gadgets' },
    { name: 'Machine Learning', id: 'machine-learning' },
    { name: 'Virtual Reality', id: 'virtual-reality' },
    { name: 'Augmented Reality', id: 'augmented-reality' },
    { name: 'Web Development', id: 'web-development' },
    { name: 'SaaS', id: 'saas' },
    { name: 'Product Management', id: 'product-management' },
  ];

  return (
    <AdvancedSelect
      placeholder="Search by Interest..."
      options={options || []}
      renderOption={(option) => <InterestSearchResultItem item={option} />}
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

export default InterestAdvancedSelect;
