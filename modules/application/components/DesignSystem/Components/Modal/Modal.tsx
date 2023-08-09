'use client';

import { Fragment, useRef } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import findChildByRole from '@/modules/application/utils/findChildByRole';

import Close from './components/Close';
import Body from './subcomponents/Body';

interface ModalInterface {
  children: any;
  spacing?: 's' | 'm' | 'l' | 'none';
  width?: 's' | 'm' | 'l' | 'xl' | 'xxl';
  onRequestClose: () => void;
  isOpen?: boolean;
  isCloseable?: boolean;
}

const Modal = ({
  children,
  onRequestClose,
  spacing = 'm',
  width = 'm',
  isOpen = false,
  isCloseable = true,
}: ModalInterface) => {
  const bodyNode = findChildByRole(children, 'Modal.Body');
  if (!bodyNode) {
    throw new Error('Modal.Body not found');
  }

  const modalPanelClassNames = classNames(
    'relative text-left bg-primary-600 rounded-lg shadow-xl transition-all sm:my-16 sm:w-full sm:max-w-lg ',
    {
      'shadow-gray-900/10 dark:shadow-black': true,
      'md:max-w-sm w-full': width === 's',
      'md:max-w-md w-full': width === 'm',
      'md:max-w-lg w-full': width === 'l',
      'md:max-w-2xl w-full': width === 'xl',
      'md:max-w-6xl w-full': width === 'xxl',
    }
  );

  const modalBodyClassNames = classNames({
    'p-0': spacing === 'none',
    'p-5': spacing === 's',
    'p-8': spacing === 'm',
    'p-10': spacing === 'l',
  });

  const bodyRef = useRef(null);

  // @todo-phil We should set this on onRequestClose, bit seems when we do and mount the modal, the first click closes it.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onClose = () => {};

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative" onClose={onClose} initialFocus={bodyRef}>
        <div className="fixed inset-0 bg-black opacity-50 transition-opacity" />

        <div className="fixed inset-0 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className={modalPanelClassNames}>
                  {isCloseable && <Close onRequestClose={onRequestClose} />}
                  <div className={modalBodyClassNames} ref={bodyRef}>
                    {bodyNode}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </motion.div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Object.assign(Modal, { Body });
