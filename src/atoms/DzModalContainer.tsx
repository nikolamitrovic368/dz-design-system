import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Close } from '../svgIcons';
import { useKeyDownCallback } from '../hooks/useKeyDownCallback';
import { cn } from '../utils/classnames';

interface DzModalContainerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
}

const styles: any = {
  container: `
    bg-black-40
    bg-opacity-50
    backdrop-blur-[6px]
    fixed
    z-[999]
    w-screen
    h-screen
    top-0
    left-0
    px-[1.25rem]
    py-[4.125rem]
    md:py-0
    flex
    items-center
    justify-center
    overflow-y-scroll
  `,
  contentContainer: `
    bg-white-100
    relative
    m-auto
    p-[1.25rem]
  `,
  closeContainer: `
    flex
    flex-wrap
    content-center
    justify-end
    h-[1.25rem]
    w-full
  `,
  closeIcon: `        
    cursor-pointer
  `,
};

export const DzModalContainer = ({
  children,
  isOpen,
  onClose,
  className,
}: DzModalContainerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const containerRef = useRef<HTMLDivElement>(null);
  const onClickClose = () => {
    setIsModalOpen(false);
    onClose?.();
  };
  const onClickContainer = event => {
    if (event.target === containerRef.current) {
      onClickClose();
    }
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useKeyDownCallback('Escape', onClose ? onClose : () => {});

  return isModalOpen ? (
    <div
      className={styles.container}
      onClick={onClickContainer}
      ref={containerRef}
    >
      <div className={cn(styles.contentContainer, className || '')}>
        <div className={styles.closeContainer}>
          <Close onClick={onClickClose} className={styles.closeIcon} />
        </div>
        {children}
      </div>
    </div>
  ) : null;
};

export default DzModalContainer;
