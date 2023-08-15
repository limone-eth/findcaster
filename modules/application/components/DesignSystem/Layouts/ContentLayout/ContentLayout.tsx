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
    <div className="min-h-screen">
      {header && <header>{header}</header>}
      <div>{content}</div>
      {footer && <footer className="sticky top-[100vh]">{footer}</footer>}
    </div>
  );
};

export default Object.assign(ContentLayout, { Header, Content, Footer });
