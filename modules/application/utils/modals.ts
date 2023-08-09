'use client';

import { cloneElement } from 'react';

import { createRoot } from 'react-dom/client';

export const MODAL_ROOT_ID = 'modalRoot';

export const mountModal = (modalComponent) => {
  const modalRoot = document.getElementById(MODAL_ROOT_ID);
  const root = createRoot(modalRoot);
  root.render(
    cloneElement(modalComponent, {
      onRequestClose: () => {
        root.unmount();
      },
    })
  );
};
