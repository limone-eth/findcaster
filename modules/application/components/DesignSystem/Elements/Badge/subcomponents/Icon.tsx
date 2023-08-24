import { Hyperlink } from '@/modules/application/components/DesignSystem';

const Icon = ({ icon, onClick }) => {
  if (onClick) {
    return <Hyperlink onClick={onClick}>{icon}</Hyperlink>;
  }

  return icon;
};

Icon.role = 'Badge.Icon';
Icon.displayName = 'Badge.Icon';

export default Icon;
