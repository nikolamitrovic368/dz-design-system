import React, { useEffect } from 'react';
import {
  DzLink,
  DzMedia,
  DzModalContainer,
  DzTitle,
  TITLE_SIZES,
  TITLE_TYPES,
} from '../../atoms';
import useLockedBodyScroll from '../../hooks/useLockedBodyScroll';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  disableBackdrop?: boolean;
  title: string;
  subtitle?: string;
  linkText: string;
  image: {
    src: string;
    alt: string;
  };
  LinkElement: any;
  url: string;
};

export const DzPromoModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  linkText = 'Explore',
  disableBackdrop = false,
  image,
  LinkElement = 'a',
  url,
}: Props) => {
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
      disableBackdrop={disableBackdrop}
      className="max-w-[57.875rem] md:h-[37.5rem] !p-0 flex flex-col md:flex-row"
    >
      <div className="md:w-1/2 max-md:h-[15rem] overflow-hidden">
        <DzMedia
          type="image"
          imgProps={image}
          LinkElement={LinkElement}
          className="h-full"
        />
      </div>
      <div className="p-5 flex flex-col md:justify-between w-full md:w-1/2">
        <div>
          <DzTitle
            titleType={TITLE_TYPES.H1}
            titleSize={TITLE_SIZES.XXL}
            title={title}
          />
          <DzTitle
            className="pt-1"
            titleType={TITLE_TYPES.P}
            titleSize={TITLE_SIZES.LG}
            title={subtitle}
          />
        </div>

        <DzLink
          href={url}
          LinkElement={LinkElement}
          className="w-full mt-10 text-center"
        >
          {linkText}
        </DzLink>
      </div>
    </DzModalContainer>
  );
};
