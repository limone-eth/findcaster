import classNames from 'classnames';

import findChildrenByRole from '@/modules/application/utils/findChildrenByRole';

import Header from './subcomponents/Header';
import HeaderCell from './subcomponents/HeaderCell';
import Row from './subcomponents/Row';
import RowCell from './subcomponents/RowCell';

interface Table {
  children: any;
  spacing?: 'none' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
  alignItems?: 'left' | 'center' | 'right';
  tableMode?: 'auto' | 'fixed';
  showDivider?: boolean;
}

const Table = ({ children, alignItems = 'left', tableMode = 'auto', showDivider = false }: Table) => {
  const rows = findChildrenByRole(children, 'Table.Row');
  const header = findChildrenByRole(children, 'Table.Header');

  const tableClassNames = classNames({
    'border dark:border-zinc-800 border-gray-150 w-full bg-white dark:bg-zinc-900': true,
    'text-left': alignItems === 'left',
    'text-center': alignItems === 'center',
    'text-right': alignItems === 'right',
    'table-auto': tableMode === 'auto',
    'table-fixed': tableMode === 'fixed',
  });

  const trClassNames = classNames({
    'border dark:border-zinc-800 border-gray-150': showDivider,
  });

  return children ? (
    <table className={tableClassNames}>
      {header}
      <tbody>
        {rows.map((row: any) => (
          <tr key={row.key} className={trClassNames}>
            {row}
          </tr>
        ))}
      </tbody>
    </table>
  ) : null;
};

export default Object.assign(Table, { Row, RowCell, Header, HeaderCell });
