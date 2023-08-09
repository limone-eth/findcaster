'use client';

import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { Text } from '../../../Elements';
import { useAccordion } from '../Accordion';

interface Item {
  children: any;
  header: any;
}

const ItemHeader = ({ children }) => {
  const { isActive, index, onChange } = useAccordion();

  const className = classNames('py-4', {
    'cursor-pointer': !isActive,
    'py-4': true,
  });

  return (
    <motion.div
      onClick={() => {
        if (isActive) {
          return;
        }

        return onChange(index);
      }}
      className={className}
    >
      <Text fontFamily="sans" fontWeight="bold">
        {children}
      </Text>
    </motion.div>
  );
};

const ItemPanel = ({ children }) => {
  const { isActive } = useAccordion();

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Item = ({ children, header }: Item) => (
  <div className="overflow-hidden">
    <ItemHeader>{header}</ItemHeader>
    <ItemPanel>{children}</ItemPanel>
  </div>
);

Item.role = 'Accordion.Item';
Item.displayName = 'Accordion.Item';

export default Item;
