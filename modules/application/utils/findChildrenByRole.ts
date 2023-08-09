import { Children } from 'react';

interface ChildType {
  role?: string;
}

export default function findChildrenByRole(children, role, limit: number | null = null) {
  const childrenArray = Children.toArray(children);

  const filteredChildren = childrenArray.filter((child: any) => child.type && (child.type as ChildType).role === role);
  if (!filteredChildren.length) {
    return null;
  }

  return limit ? filteredChildren.slice(0, limit) : filteredChildren;
}
