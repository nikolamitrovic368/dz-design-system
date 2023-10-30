import React, { useMemo, ImgHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils/classnames';
import { DzLink, DzLinkProps } from './DzLink';
import { DzSpotify, DzSpotifyProps } from './DzSpotify';
//import Plyr from 'plyr-react';

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

export type VideoSource = typeof MEDIA_TYPES_NAMES[number];
export type MediaType = typeof MEDIA_TYPES_NAMES[number];
export type ObjectFitType = typeof MEDIA_MEDIA_OBJECT_FIT_NAMES[number];
export type AspectRatioType = typeof MEDIA_ASPECT_RATIOS_NAMES[number];

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
  videoSourceType?: VideoSource;
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

const videoNode = {
  // https://developers.google.com/youtube/player_parameters#Parameters
  youtube: data => {
    const placeholderText = `${data?.source?.sources?.[0]?.src} : ${data?.source?.sources?.[0]?.provider}`;
    return <div>VIDEO PLACEHOLDER: {placeholderText}</div>;
  },
  // https://developer.vimeo.com/player/sdk/embed
  vimeo: data => {
    const placeholderText = `${data?.source?.sources?.[0]?.src} : ${data?.source?.sources?.[0]?.provider}`;
    return <div>VIDEO PLACEHOLDER: {placeholderText}</div>;
  },
  url: (data, sourceSet) => {
    return <video {...data}>{sourceSet}</video>;
  },
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
  videoSourceType = MEDIA_VIDEO_SOURCE_TYPES.VIMEO,
  aspectRatio = MEDIA_ASPECT_RATIOS['16:9'],
  objectFit = MEDIA_OBJECT_FIT.COVER,
  objectPosition = ObjectPositionType.CENTER,
  sourceSet = null,
  LinkElement = 'a',
}: DzMediaProps) => {
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
    const videoRender = videoNode?.[videoSourceType]?.(videoProps, sourceSet);
    return <div className={cn(className)}>{videoRender}</div>;
  }

  return null;
};

export default DzMedia;
