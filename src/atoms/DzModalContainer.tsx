import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Close } from '../svgIcons';
import { useKeyDownCallback } from '../hooks/useKeyDownCallback';
import { cn } from '../utils/classnames';

interface DzModalContainerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  disableBackdrop?: boolean;
}

const styles: any = {
  container: `
    fixed
    z-[999]
    w-screen
    h-screen
    top-0
    left-0
    px-5
    py-[4.125rem]
    md:py-0
    flex
    items-center
    justify-center
    overflow-scroll
    overflow-x-hidden
  `,
  containerBackdrop: `
    bg-black-100
    bg-opacity-50
    backdrop-blur-[6px]  
  `,
  contentContainer: `
    bg-white-100
    relative
    m-auto
  `,
  closeContainer: `
    cursor-pointer
    flex
    items-center
    absolute
    z-[1]
    right-0
    top-[-1.8rem]
    text-xs
    text-white-100
    hover:underline
    active:underline
    focus:underline
    underline-offset-[0.375rem]
  `,
  closeIcon: `
    mr-[0.875rem]  
  `,
  closeText: `
    pt-[2px]
  `,
};

export const DzModalContainer = ({
  children,
  isOpen,
  onClose,
  className,
  disableBackdrop = false,
}: DzModalContainerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(disableBackdrop || isOpen);
  const containerRef = useRef<HTMLDivElement>(null);
  const onClickClose = () => {
    if (disableBackdrop) {
      return;
    }
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
      className={cn(
        styles.container,
        disableBackdrop ? '' : styles.containerBackdrop
      )}
      onClick={onClickContainer}
      ref={containerRef}
    >
      <div className={cn(styles.contentContainer, className || '')}>
        {!disableBackdrop && (
          <div className={styles.closeContainer} onClick={onClickClose}>
            <Close fill="white" className={styles.closeIcon} />
            <span className={styles.closeText}>Close</span>
          </div>
        )}
        {children}
      </div>
    </div>
  ) : null;
};

export default DzModalContainer;
