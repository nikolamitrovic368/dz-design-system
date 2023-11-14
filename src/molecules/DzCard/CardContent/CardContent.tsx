import React, { useCallback, useMemo, useState } from 'react';
import {
  DzText,
  DzMedia,
  TEXT_SIZES,
  DzTitle,
  TITLE_TYPES,
  TITLE_SIZES,
  LINK_VARIANTS,
  DzLink,
  DzButton,
  MEDIA_TYPES,
  MEDIA_ASPECT_RATIOS,
  TEXT_LINK_SIZES,
} from '../../../atoms';
import useWindowSize from '../../../hooks/useWindowSize';
import { BREAKPOINTS } from '../../../layout/breakpoints';
import { CardViewport, typeToSize } from '..';
import { mergeStyles } from '../../../lib/styles';
import { globalStyles, stylesSizes } from './styles';
import { CardContentData } from './types';
import { cn } from '../../../utils/classnames';
import { slugify } from '../../../utils';
import { camelCaseItemProps } from '../../../utils/props';

type CardContentProps = {
  data: CardContentData;
  isLocation?: boolean;
  LinkElement: any;
};

export const CardContent = ({
  data,
  isLocation = false,
  LinkElement = 'a',
}: CardContentProps) => {
  const {
    size,
    id,
    media,
    category,
    title,
    subtitle,
    secondaryTitle,
    secondarySubtitle,
    description,
    portableTextDescription,
    portableTextAdditionalInformation,
    linkCTA,
    primaryCTA,
    hideImage = false,
    titleType = TITLE_TYPES.P,
    subtitleType = TITLE_TYPES.P,
    enableZoom = false,
    cardLink,
    viewport = CardViewport.Desktop,
    isDisabled = false,
    ...rest
  } = data as CardContentData;

  const restProps = camelCaseItemProps(rest);
  delete restProps.hideMedia;
  const [isHoverLink, setIsHover] = useState<boolean>(false);
  const { width } = useWindowSize();
  const isSmall = useMemo(() => {
    return width <= BREAKPOINTS.MD;
  }, [width]);

  const isPodcast = useMemo(() => {
    return media?.type === MEDIA_TYPES.PODCAST;
  }, [media]);

  const styles = useMemo(() => {
    const span = Array.isArray(size)
      ? isSmall
        ? typeToSize(size[0])
        : typeToSize(size[1])
      : typeToSize(size);

    return mergeStyles(globalStyles, stylesSizes[viewport][span]);
  }, [size, isSmall, viewport]);

  const mediaStyles = useMemo(() => {
    return isPodcast ? styles.podcast : '';
  }, [styles, isPodcast]);

  const imageHoverStyle = useMemo(
    () => (isHoverLink ? styles.mediaLinkZoom : ''),
    [isHoverLink, styles]
  );

  const linkHoverStyle = useMemo(
    () => (isHoverLink ? styles.linkCardHover : ''),
    [isHoverLink, styles]
  );

  const disabledLinkStyle = cardLink
    ? 'pointer-events-none'
    : 'pointer-events-auto';

  const renderWithLink = useCallback(
    (children, linkProps) => {
      if (linkProps) {
        return (
          <DzLink
            {...linkProps}
            withoutStyle
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            LinkElement={LinkElement}
          >
            {children}
          </DzLink>
        );
      }
      return children;
    },
    [LinkElement]
  );

  return renderWithLink(
    <div
      {...restProps}
      id={id}
      className={cn(
        styles.cardContainer,
        isDisabled ? 'transition-opacity duration-200 opacity-20' : ''
      )}
    >
      {!hideImage && media ? (
        <DzMedia
          className={cn(mediaStyles, 'overflow-hidden')}
          imgClass={cn(
            styles.mediaImg,
            enableZoom ? styles.mediaZoom : '',
            imageHoverStyle
          )}
          aspectRatio={MEDIA_ASPECT_RATIOS['4:3']}
          linkProps={cardLink ? undefined : media.linkProps}
          url={cardLink ? undefined : media.url}
          imgProps={{
            id: `CardMedia-${slugify(media?.imgProps?.alt) || ''}`,
            ...(media?.imgProps || {}),
          }}
          {...media}
          LinkElement={LinkElement}
        />
      ) : null}

      <div className={cn(styles.infoContainer, 'basis-1/2')}>
        {category ? (
          <DzText
            className={cn(styles.slugText)}
            textSize={TEXT_SIZES.XS}
            text={category}
          />
        ) : null}

        <div className={cn(styles.contentWrapper)}>
          {/* Primary Headline (required) */}

          <DzTitle
            className={cn(styles.titleWrapper)}
            title={title}
            titleSize={TITLE_SIZES.LG}
            subtitleSize={TITLE_SIZES.LG}
            classNameTitle={cn(styles.title)}
            classNameSubtitle={cn(styles.title)}
            titleType={titleType}
            subtitle={subtitle}
            subtitleType={subtitleType}
          />

          {/* All fields are optional and should flow as configured when the fields are turned on/off */}
          {secondaryTitle || secondarySubtitle ? (
            <DzTitle
              title={secondaryTitle}
              classNameTitle={cn(styles.secondaryTitle)}
              classNameSubtitle={cn(
                styles.secondaryTitle,
                isLocation ? styles.secondaryLocationTitle : ''
              )}
              titleType={TITLE_TYPES.P}
              subtitle={secondarySubtitle}
              subtitleType={TITLE_TYPES.P}
              titleSize={TITLE_SIZES.MD}
              subtitleSize={TITLE_SIZES.MD}
            />
          ) : null}

          {description ? (
            <DzText
              className={cn(styles.description)}
              text={description}
              textSize={TEXT_SIZES.SMALL}
            />
          ) : null}
          {portableTextDescription ? portableTextDescription : null}
          {portableTextAdditionalInformation
            ? portableTextAdditionalInformation
            : null}
        </div>

        {linkCTA ? (
          <div className={cn(styles.linkCta)}>
            <DzLink
              {...(linkCTA.linkProps ?? {})}
              href={linkCTA.url}
              LinkElement={cardLink ? 'span' : LinkElement}
              variant={LINK_VARIANTS.TEXT}
              className={cn(linkHoverStyle, disabledLinkStyle)}
              textLinkSize={isSmall ? TEXT_LINK_SIZES.XS : TEXT_LINK_SIZES.SM}
            >
              {linkCTA.text}
            </DzLink>
          </div>
        ) : null}
        {primaryCTA ? (
          <div>
            <DzButton
              className={cn(styles.btnCta)}
              {...(primaryCTA.ctaProps ?? {})}
            >
              {primaryCTA.text}
            </DzButton>
          </div>
        ) : null}
      </div>
    </div>,
    cardLink
  );
};

export default CardContent;
