import React, { useCallback, useMemo } from 'react';
import {
  BUTTON_SIZES,
  DzButton,
  DzLink,
  DzMedia,
  DzText,
  DzTitle,
  MEDIA_ASPECT_RATIOS,
  MEDIA_OBJECT_FIT,
  MEDIA_VIDEO_PLAY_ICON_TYPES,
  TEXT_TYPES,
  TITLE_TYPES,
} from '../../../atoms';
import { cn } from '../../../utils/classnames';
import { priceFormatter } from '../../../utils/formatters';
import { CardArtworkData } from './types';
import { globalStyles, stylesSizes } from './styles';
import { mergeStyles } from '../../../lib/styles';
import { CardSizes, typeToSize } from '../sizes';
import useWindowSize from '../../../hooks/useWindowSize';
import { BREAKPOINTS } from '../../../layout/breakpoints';
import { slugify } from '../../../utils';
import { CardViewport } from '../types';
import { useIsInViewportSingleCallback } from '../../../hooks/useIsInViewportSingleCallback';

export type CardArtworkProps = {
  LinkElement: any;
  data: CardArtworkData;
  onClickImage?: (data: CardArtworkData) => void;
  onViewport?: (data: CardArtworkData) => void;
  imageStyles?: any;
};

export const CardArtwork = ({
  data,
  onClickImage,
  onViewport,
  imageStyles,
  LinkElement = 'a',
}: CardArtworkProps) => {
  const {
    id,
    size,
    media,
    artistName,
    artworkTitle,
    portableTextArtworkTitle,
    artworkYear,
    medium,
    dimensions,
    portableTextDimensions,
    edition,
    price,
    currency = 'USD',
    framed,
    portableTextFramedDimensions,
    portableTextAdditionalInformation,
    primaryCTA,
    secondaryCTA,
    enableZoom = true,
    viewport = CardViewport.Desktop,
  } = data as CardArtworkData;
  const targetRef = useIsInViewportSingleCallback(onViewport);
  const { width } = useWindowSize();
  const isSmall = useMemo(() => {
    return width <= BREAKPOINTS.MD;
  }, [width]);
  const span = Array.isArray(size)
    ? isSmall
      ? typeToSize(size[0])
      : typeToSize(size[1])
    : typeToSize(size);
  const shouldRenderCTAs =
    !isSmall &&
    [CardSizes['12col'], CardSizes['10col'], CardSizes['6col']].includes(span);
  const portableTextArtworkTitleStyles =
    isSmall || [CardSizes['3col'], CardSizes['2col']].includes(span)
      ? '[&>*>*]:!text-sm'
      : '[&>*>*]:!text-md';
  !isSmall &&
    [CardSizes['12col'], CardSizes['10col'], CardSizes['6col']].includes(span);

  const videoPlayIconSize =
    size?.[1] >= 6
      ? MEDIA_VIDEO_PLAY_ICON_TYPES.LARGE
      : MEDIA_VIDEO_PLAY_ICON_TYPES.SMALL;
  const styles = useMemo(() => {
    return mergeStyles(globalStyles, stylesSizes[viewport][span]);
  }, [span, viewport]);

  const renderWithLink = useCallback(
    children => {
      if (data?.slug) {
        return (
          <DzLink href={data?.slug} withoutStyle LinkElement={LinkElement}>
            {children}
          </DzLink>
        );
      }
      return children;
    },
    [data, LinkElement]
  );

  return renderWithLink(
    <div id={id} className={cn(styles.cardContainer, 'group')} ref={targetRef}>
      <DzMedia
        className="overflow-hidden"
        imgClass={cn(
          styles.mediaImg,
          imageStyles,
          enableZoom ? cn(styles.mediaZoom, 'md:group-hover:scale-[1.03]') : ''
        )}
        objectFit={MEDIA_OBJECT_FIT.CONTAIN}
        aspectRatio={MEDIA_ASPECT_RATIOS['4:3']}
        {...media}
        {...(data?.slug ? { url: undefined } : {})}
        imgProps={{
          id: `CardMedia-${slugify(media?.imgProps?.alt) || ''}`,
          ...(media?.imgProps || {}),
          onClick: () => onClickImage?.(data),
        }}
        videoPlayIconSize={videoPlayIconSize}
        LinkElement={LinkElement}
      />
      <div className={cn(styles.artwork.infoContainer)}>
        <div className={cn(styles.artwork.leftPanel)}>
          <div>
            <DzTitle
              classNameTitle={cn(styles.artwork.artistName)}
              titleType={TITLE_TYPES.P}
              title={artistName}
            />
            <DzTitle
              titleType={
                portableTextArtworkTitle ? TITLE_TYPES.D : TITLE_TYPES.P
              }
              title={
                <>
                  <span
                    className={cn(
                      'inline',
                      portableTextArtworkTitle
                        ? portableTextArtworkTitleStyles
                        : styles.artwork.artWorkTitle
                    )}
                  >
                    {portableTextArtworkTitle || artworkTitle}
                  </span>
                  {artworkYear ? (
                    <>
                      ,{' '}
                      <span className={cn(styles.artwork.artworkYear)}>
                        {artworkYear}
                      </span>
                    </>
                  ) : null}
                </>
              }
            />
          </div>

          <div>
            {medium ? (
              <DzText
                className={cn(styles.artwork.tombstoneText)}
                text={medium}
                textType={TEXT_TYPES.P}
              />
            ) : null}
            {dimensions ? (
              <DzText
                className={cn(styles.artwork.tombstoneText)}
                text={dimensions}
                textType={TEXT_TYPES.P}
              />
            ) : null}
            {portableTextDimensions ? portableTextDimensions : null}
            {portableTextFramedDimensions ? portableTextFramedDimensions : null}
            {edition ? (
              <DzText
                className={cn(styles.artwork.tombstoneText)}
                text={edition}
                textType={TEXT_TYPES.P}
              />
            ) : null}
            {portableTextAdditionalInformation
              ? portableTextAdditionalInformation
              : null}
          </div>

          {price ? (
            <div className={cn(styles.artwork.priceContainer)}>
              <DzTitle
                titleType={TITLE_TYPES.P}
                title={`${currency} ${priceFormatter({ price, currency })}`}
                classNameTitle={cn(styles.artwork.priceTitle)}
              />
              {framed ? (
                <DzText
                  className={cn(styles.artwork.tombstoneText)}
                  text={framed}
                  textType={TEXT_TYPES.P}
                />
              ) : null}
            </div>
          ) : null}
        </div>

        {shouldRenderCTAs && (primaryCTA || secondaryCTA) ? (
          <div className={cn(styles.artwork.rightPanel)}>
            {primaryCTA ? (
              <DzButton
                size={BUTTON_SIZES.LARGE}
                {...(primaryCTA.ctaProps ?? {})}
                className={cn(styles.buttons)}
              >
                {primaryCTA.text}
              </DzButton>
            ) : null}
            {secondaryCTA ? (
              <DzButton
                size={BUTTON_SIZES.LARGE}
                {...(secondaryCTA.ctaProps ?? {})}
                className={cn(styles.buttons)}
              >
                {secondaryCTA.text}
              </DzButton>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CardArtwork;
