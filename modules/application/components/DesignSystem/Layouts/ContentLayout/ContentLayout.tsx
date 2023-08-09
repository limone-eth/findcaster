import findChildByRole from '@/modules/application/utils/findChildByRole';

import Content from './subComponents/Content';
import Footer from './subComponents/Footer';
import Header from './subComponents/Header';

interface ContentLayout {
  children: any;
}

const ContentLayout = ({ children }: ContentLayout) => {
  const header = findChildByRole(children, 'ContentLayout.Header');
  const content = findChildByRole(children, 'ContentLayout.Content');
  const footer = findChildByRole(children, 'ContentLayout.Footer');

  return (
    <div className="flex min-h-screen flex-col">
      {header && <header>{header}</header>}
      <main>{content}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
};

export default Object.assign(ContentLayout, { Header, Content, Footer });
