import React, { useMemo, ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../utils/classnames';
import {
  DzMedia,
  MEDIA_TYPES,
  DzMediaProps,
  DzText,
  TEXT_SIZES,
  DzLink,
  DzLinkProps,
  DzTitle,
  ObjectPositionType,
  TITLE_SIZES,
  TITLE_TYPES,
  LINK_VARIANTS,
  TEXT_LINK_SIZES,
  MEDIA_ASPECT_RATIOS,
  MEDIA_OBJECT_FIT,
  DzButtonProps,
  DzButton,
  BUTTON_SIZES,
  ButtonModes,
} from '../../atoms';
import useWindowSize from '../../hooks/useWindowSize';
import { BREAKPOINTS } from '../../layout/breakpoints';
import { sliceMaxCharLength } from '../../utils/validators';
export const SPLIT_TYPES = {
  TALL: 'tall',
  SHORT: 'short',
};

export const SPLIT_TYPES_NAMES = [SPLIT_TYPES.TALL, SPLIT_TYPES.SHORT] as const;

export type SplitTypes = typeof SPLIT_TYPES_NAMES[number];

type DataSplit = {
  title: string;
  media: Omit<DzMediaProps, 'LinkElement'>;
  hideMedia?: boolean;
  category?: string;
  subtitle?: string;
  secondaryTitle?: string;
  secondarySubtitle?: string;
  description?: string;
  linkCTA?: LinkCTA;
  buttonCTA?: ButtonCTA;
  portableTextDescription?: ReactNode;
};

type LinkCTA = {
  text: string;
  url: string;
  linkProps?: Partial<Omit<DzLinkProps, 'LinkElement'>>;
};

type ButtonCTA = {
  text: string;
  ctaProps?: DzButtonProps;
};

export interface DzSplitProps extends HTMLAttributes<HTMLDivElement> {
  type: SplitTypes;
  data: DataSplit;
  reverse?: boolean;
  animate?: boolean;
  mediaContainerClass?: string;
  LinkElement: any;
}

const styles: any = {
  splitContainer: `
    flex
    gap-5
  `,
  leftContainer: `
    basis-1/2
    overflow-hidden
  `,
  rightContainer: `
    basis-1/2
    flex
    flex-col
    gap-2.5
    pb-5
    md:pb-0
  `,
  title: `
    text-xl
    md:text-xxl
  `,
  linkCta: `
    cursor-pointer
    mt-[0.969rem]
    md:mt-[1.875rem]
  `,
  buttonCta: `
    mt-[0.969rem]
    md:mt-[1.875rem]
    self-start
  `,
  animateImg: `
    motion-safe:animate-slowZoomOut
    transition
  `,
  primarySubHeadline: `
    mt-2.5
  `,
  contentWrapper: `
    flex
    flex-col
    gap-2.5
    md:gap-5
  `,
  shortPodcast: `
    relative
    h-[15.6875rem]
    md:h-[32.375rem]
  `,
  largePodcast: `
    relative
    h-[27.9375rem]
    md:h-[57.5rem]
  `,
  podcast: `
    absolute
    top-2/4
    -translate-y-1/2
    md:!h-3/6
  `,
  background: `
    bg-[#000098]
  `,
};
const NUMBER_OF_CHARS_TEXT = 50;
const NUMBER_OF_CHARS_BODY = 300;

export const DzSplit = ({
  type = SPLIT_TYPES.TALL,
  reverse = false,
  animate = false,
  mediaContainerClass = '',
  data,
  LinkElement = 'a',
  ...rest
}: DzSplitProps) => {
  const {
    media,
    title,
    subtitle,
    hideMedia,
    secondaryTitle,
    secondarySubtitle,
    category,
    linkCTA,
    buttonCTA,
    description,
    portableTextDescription,
  } = data ?? {};

  const containerTypeStyle = useMemo(() => {
    return type === SPLIT_TYPES.SHORT
      ? 'min-h-full'
      : 'min-h-full md:min-h-[57.5rem]';
  }, [type]);

  const containerTypeStylePodcast = useMemo(() => {
    return type === SPLIT_TYPES.SHORT
      ? styles.shortPodcast
      : styles.largePodcast;
  }, [type]);

  const mediaType = media?.type;
  const isPodcast = useMemo(() => {
    return mediaType === MEDIA_TYPES.PODCAST;
  }, [mediaType]);

  const mediaContainerStyles = useMemo(() => {
    return isPodcast ? containerTypeStylePodcast : containerTypeStyle;
  }, [isPodcast, containerTypeStylePodcast, containerTypeStyle]);

  const { width } = useWindowSize();

  const isSmall = useMemo(() => {
    return width <= BREAKPOINTS.MD;
  }, [width]);

  return (
    <div
      className={cn(
        styles.splitContainer,
        reverse ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row'
      )}
      {...rest}
    >
      <div className={cn(styles.leftContainer)}>
        <div
          className={cn(mediaContainerStyles, 'w-full', mediaContainerClass)}
        >
          {!hideMedia ? (
            <DzMedia
              className={isPodcast ? styles.podcast : ''}
              imgClass={animate ? styles.animateImg : ''}
              objectFit={MEDIA_OBJECT_FIT.CONTAIN}
              objectPosition={ObjectPositionType.TOP}
              aspectRatio={MEDIA_ASPECT_RATIOS['4:3']}
              {...media}
              LinkElement={LinkElement}
            />
          ) : null}
        </div>
      </div>

      <div className={cn(styles.rightContainer)}>
        {category ? (
          <DzText textSize={TEXT_SIZES.SMALL} text={category} />
        ) : null}

        <div className={cn(styles.contentWrapper)}>
          <DzTitle
            title={sliceMaxCharLength(title, NUMBER_OF_CHARS_TEXT)}
            classNameTitle={cn(styles.title)}
            classNameSubtitle={cn(styles.title)}
            titleType={TITLE_TYPES.P}
            subtitle={sliceMaxCharLength(subtitle, NUMBER_OF_CHARS_TEXT)}
            subtitleType={TITLE_TYPES.P}
          />
          {secondaryTitle || secondarySubtitle ? (
            <DzTitle
              className={cn(styles.primarySubHeadline)}
              title={sliceMaxCharLength(secondaryTitle, NUMBER_OF_CHARS_TEXT)}
              titleSize={TITLE_SIZES.LG}
              subtitleSize={TITLE_SIZES.LG}
              titleType={TITLE_TYPES.P}
              subtitle={sliceMaxCharLength(
                secondarySubtitle,
                NUMBER_OF_CHARS_TEXT
              )}
              subtitleType={TITLE_TYPES.P}
            />
          ) : // preserve gap before and after even if it's not shown for mobile
          isSmall ? (
            <div />
          ) : null}
          {description ? (
            <DzText
              className={cn(styles.bodyText)}
              textSize={isSmall ? TEXT_SIZES.SMALL : TEXT_SIZES.MEDIUM}
              text={sliceMaxCharLength(description, NUMBER_OF_CHARS_BODY)}
            />
          ) : null}
          {portableTextDescription ? portableTextDescription : null}
        </div>

        {linkCTA ? (
          <DzLink
            className={cn(styles.linkCta)}
            {...(linkCTA.linkProps ?? {})}
            href={linkCTA.url}
            variant={LINK_VARIANTS.TEXT}
            textLinkSize={isSmall ? TEXT_LINK_SIZES.XS : TEXT_LINK_SIZES.SM}
            LinkElement={LinkElement}
          >
            {linkCTA.text}
          </DzLink>
        ) : null}

        {!linkCTA && buttonCTA ? (
          <DzButton
            className={cn(styles.buttonCta)}
            size={BUTTON_SIZES.LARGE}
            mode={ButtonModes.LIGHT}
            {...(buttonCTA?.ctaProps || {})}
          >
            {buttonCTA.text}
          </DzButton>
        ) : null}
      </div>
    </div>
  );
};

export default DzSplit;
