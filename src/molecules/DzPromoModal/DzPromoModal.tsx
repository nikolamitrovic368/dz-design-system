import React, { useEffect } from 'react';
import {
  DzButton,
  DzModalContainer,
  DzTitle,
  TITLE_SIZES,
  TITLE_TYPES,
} from '../../atoms';
import useLockedBodyScroll from '../../hooks/useLockedBodyScroll';

export type DzPromoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  buttonText: string;
  onClick: () => void;
  imgSrc: string;
  imgAlt: string;
};

export const DzPromoModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  buttonText,
  onClick,
  imgSrc,
  imgAlt,
}: DzPromoModalProps) => {
  const [, setIsBodyScrollLocked] = useLockedBodyScroll(false, 'root');
  const onCloseModal = () => {
    onClose();
  };
  useEffect(() => setIsBodyScrollLocked(isOpen), [
    isOpen,
    setIsBodyScrollLocked,
  ]);

  return (
    <DzModalContainer
      isOpen={isOpen}
      onClose={onCloseModal}
      className="max-w-[57.875rem] md:max-h-[37.5rem] !p-0 flex flex-col md:flex-row"
    >
      <div className="md:w-1/2 md:max-h-[37.5rem] overflow-hidden">
        <img
          src={imgSrc}
          className="w-full h-[240px] md:h-full object-cover"
          alt={imgAlt}
        />
      </div>
      <div className="p-5 flex flex-col md:justify-between w-full md:w-1/2">
        <div>
          <DzTitle
            titleType={TITLE_TYPES.H1}
            titleSize={TITLE_SIZES.XL}
            title={title}
          />
          <DzTitle
            className="pt-1"
            titleType={TITLE_TYPES.P}
            titleSize={TITLE_SIZES.MD}
            title={subtitle}
          />
        </div>

        <DzButton
          onClick={() => onClick()}
          size="large"
          className="w-full mt-10"
        >
          {buttonText}
        </DzButton>
      </div>
    </DzModalContainer>
  );
};

export default DzPromoModal;
