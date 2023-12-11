import React, { useEffect, useMemo } from 'react';
import {
  DzLink,
  DzMedia,
  DzModalContainer,
  DzTitle,
  TITLE_SIZES,
  TITLE_TYPES,
  MEDIA_TYPES,
  LINK_VARIANTS,
  TEXT_LINK_SIZES,
} from '../../atoms';
import useLockedBodyScroll from '../../hooks/useLockedBodyScroll';
import { BREAKPOINTS } from '../../layout/breakpoints';
import useWindowSize from '../../hooks/useWindowSize';

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
  ImgElement: any;
  url: string;
  openNewTab: boolean;
};

export const DzPromoModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  linkText = 'Explore',
  disableBackdrop = false,
  ImgElement,
  image,
  LinkElement = 'a',
  url,
  openNewTab = false,
}: Props) => {
  const [, setIsBodyScrollLocked] = useLockedBodyScroll(false, 'root');
  const onCloseModal = () => {
    onClose();
  };
  useEffect(() => setIsBodyScrollLocked(isOpen), [
    isOpen,
    setIsBodyScrollLocked,
  ]);

  const { width } = useWindowSize();
  const isSmall = useMemo(() => {
    return width <= BREAKPOINTS.MD;
  }, [width]);
  return (
    <DzModalContainer
      isOpen={isOpen}
      onClose={onCloseModal}
      disableBackdrop={disableBackdrop}
      className="max-w-[57.875rem] w-full md:h-[37.5rem] !p-0 flex flex-col md:flex-row"
    >
      <div className="flex flex-col md:flex-row max-w-[57.875rem] h-full">
        <DzMedia
          type={MEDIA_TYPES.IMAGE}
          ImgElement={ImgElement}
          LinkElement={LinkElement}
          imgClass="h-full" // sync storybook img behaviour with NextImage behaviour
          imageContainerClassName="md:w-1/2 h-60 md:h-auto"
          imgProps={{
            src: image.src,
            alt: image.alt,
            fill: true,
            sizes: '(max-width: 768px) 728px, 600px',
            priority: true,
            quality: 100,
            unoptimized: true,
          }}
        />
        <div className="p-5 flex flex-col md:justify-between md:w-1/2">
          <div>
            <DzTitle
              titleType={TITLE_TYPES.H1}
              titleSize={TITLE_SIZES[isSmall ? 'XL' : 'XXL']}
              title={title}
              className="mt-0 md:mt-[0.625rem]"
            />
            <DzTitle
              className="pt-1 mt-0 md:mt-[0.625rem]"
              titleType={TITLE_TYPES.P}
              titleSize={TITLE_SIZES[isSmall ? 'MD' : 'LG']}
              title={subtitle}
            />
          </div>

          <DzLink
            href={url}
            openNewTab={openNewTab}
            LinkElement={LinkElement}
            variant={LINK_VARIANTS.BUTTON}
            textLinkSize={TEXT_LINK_SIZES.MD}
            className="w-full mt-10 text-center py-[0.8125rem] px-[1.5625rem]"
          >
            {linkText}
          </DzLink>
        </div>
      </div>
    </DzModalContainer>
  );
};
