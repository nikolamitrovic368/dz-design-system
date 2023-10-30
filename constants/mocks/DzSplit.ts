import { MEDIA_TYPES, MEDIA_VIDEO_SOURCE_TYPES } from '../../src/atoms/DzMedia';
import { youtubeProps } from './DzMedia';
export const split = {
  media: {
    url: '/',
    type: MEDIA_TYPES.IMAGE,
    imgProps: {
      src:
        'https://assets.davidzwirner.com/v7/_assets_/davidzwirner/artists/dana-schutz/guide-image/schda0057_detail.jpg',
      alt: 'artwork',
    },
  },
  category: 'Category Slug',
  title: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
  subtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
  secondaryTitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
  secondarySubtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
  description:
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu',
  linkCTA: {
    text: 'Learn More',
    url: '/',
  },
};

export const splitVideo = {
  media: {
    type: MEDIA_TYPES.VIDEO,
    videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.YOUTUBE,
    videoProps: {
      source: youtubeProps,
      options: {
        enabled: true,
        autoplay: true,
        muted: true,
        resetOnEnd: true,
        clickToPlay: false,
        toggleInvert: false,
        loop: { active: true },
        vimeo: {
          loop: true,
          autoplay: true,
          muted: false,
        },
      },
    },
  },
  category: 'Category Slug',
  title: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
  subtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
  secondaryTitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
  secondarySubtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
  description:
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu',
  linkCTA: {
    text: 'Learn More',
    url: '/',
  },
};

export const splitPodcast = {
  media: {
    type: MEDIA_TYPES.PODCAST,
    url:
      'https://open.spotify.com/episode/618kRM3BuUvG6E8ZuuUGeB?si=IIIeKA0PRxOUoAOUatSCvw',
  },
  category: 'Category Slug',
  title: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
  subtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
  secondaryTitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
  secondarySubtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
  description:
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu',
  linkCTA: {
    text: 'Learn More',
    url: '/',
  },
};
