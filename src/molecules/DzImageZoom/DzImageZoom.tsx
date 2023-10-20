import React, { useEffect } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import PlusIcon from '../../svgIcons/plus';
import MinusIcon from '../../svgIcons/minus';
import { Close } from '../../svgIcons';
import { useIsSmallWindowSize } from '../../hooks/useIsSmallWindowSize';
import { useImageSize } from '../../hooks/useImageSize';
import useWindowSize from '../../hooks/useWindowSize';

const styles: any = {
  imageZoomModalContainer: `     
    fixed 
    h-screen 
    left-0    
    top-0 
    w-screen 
    z-[300]    
    bg-[#e8e8e8]
  `,
  modalHeaderContainer: `
    h-[3.75rem] 
    w-full 
    flex
    justify-end 
    md:justify-between
    align-center
    text-sm
    items-center
    px-[1.25rem]
    bg-white-100
  `,
  modalCloseButton: `
    flex-none
  `,
  plusButton: `
    mr-[2.5rem]
  `,
  icon: `
    mr-[0.6rem]
  `,
  closeIcon: `
    inline
    ml-[0.6rem]
  `,
};

interface DzImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl?: string;
  alt: string;
  isZoomEnabled?: boolean;
}

export const DzImageZoomModal = ({
  isOpen,
  onClose,
  imgUrl,
  alt,
  isZoomEnabled = true,
}: DzImageZoomModalProps) => {
  const isSmall = useIsSmallWindowSize();
  const onClickClose = () => onClose();
  const { width } = useWindowSize();
  const [imageDimensions, { error }] = useImageSize(imgUrl);

  const initialScale =
    imageDimensions && width
      ? width > imageDimensions.width
        ? width / imageDimensions.width
        : 1
      : 1;

  useEffect(() => {
    if (typeof window !== undefined) {
      window.document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }
  }, [isOpen]);

  return isOpen && imageDimensions && !error ? (
    <div className={styles.imageZoomModalContainer}>
      <TransformWrapper
        initialScale={initialScale}
        disablePadding
        disabled={!isZoomEnabled}
        pinch={{ disabled: !isZoomEnabled }}
        doubleClick={{ disabled: !isZoomEnabled }}
      >
        {({ zoomIn, zoomOut }) => (
          <>
            <div className={styles.modalHeaderContainer}>
              {!isSmall && (
                <div>
                  {isZoomEnabled && (
                    <>
                      <button
                        onClick={() => zoomIn()}
                        className={styles.plusButton}
                      >
                        <PlusIcon className={styles.icon} />
                        Zoom In
                      </button>
                      <button onClick={() => zoomOut()}>
                        <MinusIcon className={styles.icon} />
                        Zoom Out
                      </button>
                    </>
                  )}
                </div>
              )}
              <button
                className={styles.modalCloseButton}
                onClick={() => onClickClose()}
              >
                Close <Close className={styles.closeIcon} />
              </button>
            </div>
            <TransformComponent
              wrapperClass="!w-screen"
              contentClass="!w-screen"
            >
              <img
                src={imgUrl}
                alt={alt}
                className={
                  isZoomEnabled ? 'cursor-grab active:cursor-grabbing' : ''
                }
                style={{ pointerEvents: 'auto' }}
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  ) : null;
};
