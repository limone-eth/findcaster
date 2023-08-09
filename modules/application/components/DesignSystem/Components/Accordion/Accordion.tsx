'use client';

import { Children, createContext, useContext, useMemo, useState } from 'react';

import findChildrenByRole from '@/modules/application/utils/findChildrenByRole';

import Item from './subcomponents/Item';

interface AccordionContextInterface {
  index?: number;
  isActive?: boolean;
  onChange: (any) => any;
}

const AccordionContext = createContext<AccordionContextInterface>({} as AccordionContextInterface);
export const useAccordion = () => useContext(AccordionContext);

interface AccordionInterface {
  children: any;
}

const Accordion = ({ children }: AccordionInterface) => {
  const items = findChildrenByRole(children, 'Accordion.Item');
  if (!items) {
    return null;
  }

  const [activeIndex, setActiveIndex] = useState(0);

  const onChange = (index) => {
    setActiveIndex(() => (index === activeIndex ? -1 : index));
  };

  return Children.map(children, (child, index) => {
    const isActive = activeIndex === index;

    const memoizedContextValue = useMemo(
      () => ({
        isActive,
        index,
        onChange,
      }),
      [isActive, index]
    );

    return <AccordionContext.Provider value={memoizedContextValue}>{child}</AccordionContext.Provider>;
  });
};

export default Object.assign(Accordion, { Item });
