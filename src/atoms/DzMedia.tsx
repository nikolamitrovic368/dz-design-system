import React, {
  useMemo,
  ImgHTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from 'react';
import { cn } from '../utils/classnames';
import { DzLink, DzLinkProps } from './DzLink';
import { DzSpotify, DzSpotifyProps } from './DzSpotify';
import { Player, Youtube, DefaultUi, Vimeo, Video } from '@vime/react';
import DzVideoPoster from './DzVideoPoster';
import { useIsSmallWindowSize } from '../hooks';

export enum ObjectPositionType {
  TOP = 'objPosTop',
  BOTTOM = 'objPosBottom',
  CENTER = 'objPosCenter',
}

export const MEDIA_VIDEO_SOURCE_TYPES = {
  YOUTUBE: 'youtube',
  VIMEO: 'vimeo',
  URL: 'url',
};

export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  PODCAST: 'podcast',
};

export const MEDIA_OBJECT_FIT = {
  CONTAIN: 'fitContain',
  COVER: 'fitCover',
  FILL: 'fitFill',
  NONE: 'fitNone',
  SCALE_DOWN: 'fitScaleDown',
};

export const MEDIA_ASPECT_RATIOS = {
  '16:9': '16:9',
  '4:3': '4:3',
  AUTO: 'aspectAuto',
};

export const MEDIA_VIDEO_SOURCE_TYPES_NAMES = [
  MEDIA_VIDEO_SOURCE_TYPES.YOUTUBE,
  MEDIA_VIDEO_SOURCE_TYPES.VIMEO,
  MEDIA_VIDEO_SOURCE_TYPES.URL,
] as const;

export const MEDIA_MEDIA_OBJECT_FIT_NAMES = [
  MEDIA_OBJECT_FIT.CONTAIN,
  MEDIA_OBJECT_FIT.COVER,
  MEDIA_OBJECT_FIT.FILL,
  MEDIA_OBJECT_FIT.NONE,
  MEDIA_OBJECT_FIT.SCALE_DOWN,
] as const;

export const MEDIA_ASPECT_RATIOS_NAMES = [
  MEDIA_ASPECT_RATIOS['16:9'],
  MEDIA_ASPECT_RATIOS['4:3'],
  MEDIA_ASPECT_RATIOS.AUTO,
] as const;

export const MEDIA_TYPES_NAMES = [
  MEDIA_TYPES.IMAGE,
  MEDIA_TYPES.VIDEO,
  MEDIA_TYPES.PODCAST,
] as const;

export const MEDIA_VIDEO_TYPES = {
  MOVING_IMAGE: 'Moving Image',
  INTERACTIVE_VIDEO: 'Interactive Video',
};

export const MEDIA_VIDEO_TYPES_NAMES = [
  MEDIA_VIDEO_TYPES.MOVING_IMAGE,
  MEDIA_VIDEO_TYPES.INTERACTIVE_VIDEO,
] as const;

export const MEDIA_VIDEO_PLAY_ICON_TYPES = {
  SMALL: 'small',
  LARGE: 'large',
};

export const MEDIA_VIDEO_PLAY_ICON_TYPES_NAMES = [
  MEDIA_VIDEO_PLAY_ICON_TYPES.SMALL,
  MEDIA_VIDEO_PLAY_ICON_TYPES.LARGE,
];

export type VideoSource = typeof MEDIA_TYPES_NAMES[number];
export type MediaType = typeof MEDIA_TYPES_NAMES[number];
export type ObjectFitType = typeof MEDIA_MEDIA_OBJECT_FIT_NAMES[number];
export type AspectRatioType = typeof MEDIA_ASPECT_RATIOS_NAMES[number];
export type VideoType = typeof MEDIA_VIDEO_TYPES_NAMES[number];
export type VideoPlayIconType = typeof MEDIA_VIDEO_PLAY_ICON_TYPES_NAMES[number];
export interface DzMediaProps extends ImgHTMLAttributes<HTMLImageElement> {
  type: MediaType;
  url?: string;
  ImgElement?: any;
  imgProps?: any;
  imgClass?: any;
  linkProps?: Omit<DzLinkProps, 'LinkElement'>;
  className?: any;
  podcastProps?: Omit<DzSpotifyProps, 'link'>;
  videoProps?: any;
  mobileVideoProps?: any;
  videoSourceType?: VideoSource;
  videoType?: VideoType;
  videoPlayIconSize?: VideoPlayIconType;
  aspectRatio?: AspectRatioType;
  objectFit?: ObjectFitType;
  sourceSet?: ReactNode | null;
  objectPosition?: ObjectPositionType;
  LinkElement: any;
}

const styles: any = {
  mediaContainer: `
    w-full
    relative
    block
    bg-white-100
  `,
  fitCover: `
    !object-cover
  `,
  fitContain: `
    !object-contain
  `,
  fitFill: `
    !object-fill
  `,
  fitNone: `
    !object-none
  `,
  fitScaleDown: `
    !object-scale-down
  `,
  objPosTop: `
    object-top
  `,
  objPosBottom: `
    object-bottom
  `,
  objPosCenter: `
    object-center
  `,
  '16:9': `
    !aspect-video
  `,
  '4:3': `
    !aspect-4/3
  `,
  aspectAuto: `
    !aspect-auto
  `,
};

export const DzMedia = ({
  type,
  ImgElement,
  imgClass,
  imgProps = {},
  url = '',
  podcastProps = {},
  linkProps,
  className = '',
  videoProps = {},
  mobileVideoProps = {},
  videoSourceType,
  aspectRatio = MEDIA_ASPECT_RATIOS['16:9'],
  objectFit = MEDIA_OBJECT_FIT.COVER,
  objectPosition = ObjectPositionType.CENTER,
  videoPlayIconSize = MEDIA_VIDEO_PLAY_ICON_TYPES.SMALL,
  sourceSet = null,
  LinkElement = 'a',
}: DzMediaProps) => {
  const playerRef = useRef<HTMLVmPlayerElement>(null);
  const isSmall = useIsSmallWindowSize();
  const [isShowingPoster, setIsShowingPoster] = useState(
    type === MEDIA_TYPES.VIDEO && videoProps?.source?.posterImage
  );
  const nonNullableLinkProps = linkProps ?? {};
  const renderImage = useMemo(() => {
    const mediaClasses = cn(
      className,
      'w-full',
      imgClass,
      styles[aspectRatio],
      styles[objectFit],
      styles[objectPosition]
    );

    if (!ImgElement) {
      return (
        <img
          className={mediaClasses}
          // Change this to eager on demand specially for header components
          loading={'lazy'}
          alt={imgProps?.alt}
          {...imgProps}
        />
      );
    }
    return (
      <ImgElement className={cn(mediaClasses, '!relative')} {...imgProps} />
    );
  }, [
    ImgElement,
    imgProps,
    imgClass,
    aspectRatio,
    objectFit,
    objectPosition,
    className,
  ]);

  const LinkElem = url ? (
    <DzLink
      {...nonNullableLinkProps}
      LinkElement={LinkElement}
      href={url}
      className={cn(styles.mediaContainer, className)}
    >
      {renderImage}
    </DzLink>
  ) : (
    <div className={cn(styles.mediaContainer, className)}>{renderImage}</div>
  );

  if (type === MEDIA_TYPES.IMAGE) {
    return LinkElem;
  }

  if (type === MEDIA_TYPES.PODCAST) {
    return <DzSpotify link={url} className={className} {...podcastProps} />;
  }

  if (type === MEDIA_TYPES.VIDEO) {
    const { src } = videoProps.source?.sources?.[0] ?? {};
    const mobileSrc = mobileVideoProps.source?.sources?.[0]?.src;
    const videoId = isSmall && mobileSrc ? mobileSrc : src;
    const posterImage = videoProps?.source?.posterImage;
    const onClickPoster = () => {
      setIsShowingPoster(false);
      playerRef.current?.play();
    };

    return (
      <div className="relative">
        <Player ref={playerRef}>
          <DefaultUi />
          {videoSourceType === MEDIA_VIDEO_SOURCE_TYPES.VIMEO && (
            <Vimeo videoId={videoId} />
          )}
          {videoSourceType === MEDIA_VIDEO_SOURCE_TYPES.YOUTUBE && (
            <Youtube videoId={videoId} />
          )}
          {videoSourceType === MEDIA_VIDEO_SOURCE_TYPES.URL && sourceSet && (
            <Video>{sourceSet}</Video>
          )}
        </Player>
        {isShowingPoster && (
          <DzVideoPoster
            imgSrc={posterImage}
            onClick={onClickPoster}
            useSmallPlayIcon={
              videoPlayIconSize === MEDIA_VIDEO_PLAY_ICON_TYPES.SMALL
            }
          />
        )}
      </div>
    );
  }

  return null;
};

export default DzMedia;
