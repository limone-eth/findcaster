import findChildrenByRole from '@/modules/application/utils/findChildrenByRole';

interface Row {
  children: any;
}

const Row = ({ children }: Row) => {
  const cells = findChildrenByRole(children, 'Table.RowCell');

  if (!cells) return null;

  return (
    <>
      {cells.map((cell: any) => (
        <td key={cell.key} className="p-4">
          {cell}
        </td>
      ))}
    </>
  );
};

Row.role = 'Table.Row';
Row.displayName = 'Table.Row';

export default Row;
