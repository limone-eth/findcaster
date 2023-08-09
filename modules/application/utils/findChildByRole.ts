import findChildrenByRole from '@/modules/application/utils/findChildrenByRole';

export default function findChildByRole(children, role) {
  const nodes = findChildrenByRole(children, role, 1);
  if (!nodes || nodes.length === 0) {
    return null;
  }

  return nodes[0];
}
