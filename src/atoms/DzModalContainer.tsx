import React, { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
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
    absolute
    top-0
    left-0
    w-full
    h-full
    bg-black-100
    bg-opacity-30
    backdrop-blur-[5px]
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
  const [isShowingBackdrop, setIsShowingBackdrop] = useState(false);
  const containerBackdropRef = useRef<HTMLDivElement>(null);
  const onClickClose = () => {
    if (disableBackdrop) {
      return;
    }
    setIsShowingBackdrop(false);
  };
  const onContainerTransitionEnd = () => {
    if (!isShowingBackdrop) {
      setIsModalOpen(false);
      onClose?.();
    }
  };
  const onClickContainerBackdrop = event => {
    if (event.target === containerBackdropRef.current) {
      onClickClose();
    }
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isModalOpen) {
      setIsShowingBackdrop(true);
    }
  }, [isModalOpen]);

  useKeyDownCallback('Escape', onClose ? onClose : () => {});

  return (
    <div
      className={cn(styles.container, isModalOpen ? 'visible' : 'invisible')}
    >
      {!disableBackdrop && (
        <div
          className={cn(
            styles.containerBackdrop,
            `transition-opacity ease-in duration-100 ${
              isShowingBackdrop ? 'opacity-100' : 'opacity-0'
            }`
          )}
          onClick={onClickContainerBackdrop}
          ref={containerBackdropRef}
        />
      )}

      <div
        className={cn(
          styles.contentContainer,
          className || '',
          disableBackdrop
            ? ''
            : `transition-opacity ease-in delay-[20ms] ${
                isShowingBackdrop
                  ? 'duration-200 opacity-100'
                  : 'duration-100 opacity-0'
              }`
        )}
        onTransitionEnd={onContainerTransitionEnd}
      >
        {!disableBackdrop && (
          <div className={styles.closeContainer} onClick={onClickClose}>
            <Close fill="white" className={styles.closeIcon} />
            <span className={styles.closeText}>Close</span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default DzModalContainer;
