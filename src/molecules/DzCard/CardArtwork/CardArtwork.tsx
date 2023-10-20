import React, { FC, useCallback, useMemo } from 'react';
import {
  DzMedia,
  DzText,
  TEXT_TYPES,
  DzTitle,
  TITLE_TYPES,
  DzButton,
  MEDIA_OBJECT_FIT,
  MEDIA_ASPECT_RATIOS,
  BUTTON_SIZES,
  DzLink,
} from '../../../atoms';
import { cn } from '../../../utils/classnames';
import { priceFormatter } from '../../../utils/formatters';
import { CardArtworkData, CardArtworkProps } from './types';
import { globalStyles, stylesSizes } from './styles';
import { mergeStyles } from '../../../lib/styles';
import { typeToSize } from '../sizes';
import useWindowSize from '../../../hooks/useWindowSize';
import { BREAKPOINTS } from '../../../layout/breakpoints';
import { slugify } from '../../../utils';
import { CardViewport } from '../types';

export const CardArtwork: FC<CardArtworkProps> = ({
  data,
  onClickImage,
  imageStyles,
}) => {
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
    framed,
    portableTextFramedDimensions,
    portableTextAdditionalInformation,
    primaryCTA,
    secondaryCTA,
    enableZoom = true,
    viewport = CardViewport.Desktop,
  } = data as CardArtworkData;

  const { width } = useWindowSize();
  const isSmall = useMemo(() => {
    return width <= BREAKPOINTS.MD;
  }, [width]);

  const styles = useMemo(() => {
    const span = Array.isArray(size)
      ? isSmall
        ? typeToSize(size[0])
        : typeToSize(size[1])
      : typeToSize(size);

    return mergeStyles(globalStyles, stylesSizes[viewport][span]);
  }, [size, isSmall, viewport]);

  const renderWithLink = useCallback(
    children => {
      if (data?.slug) {
        return (
          <DzLink href={data?.slug} withoutStyle>
            {children}
          </DzLink>
        );
      }
      return children;
    },
    [data]
  );

  return renderWithLink(
    <div id={id} className={cn(styles.cardContainer, 'group')}>
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
        imgProps={{
          id: `CardMedia-${slugify(media?.imgProps?.alt) || ''}`,
          ...(media?.imgProps || {}),
          onClick: () => onClickImage?.(data),
        }}
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
                      portableTextArtworkTitle
                        ? ''
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
                title={`USD${priceFormatter({ price })}`}
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

        {primaryCTA || secondaryCTA ? (
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
