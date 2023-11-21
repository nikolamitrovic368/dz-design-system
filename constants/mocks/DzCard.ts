import { CardArtworkData } from '../../src/molecules/DzCard/CardArtwork';
import { CardMediaData } from '../../src/molecules/DzCard/CardMedia';
import { CardContentData } from '../../src/molecules/DzCard/CardContent';
import { BUTTON_VARIANTS } from '../../src/atoms/DzButton';
import { MEDIA_TYPES } from '../../src/atoms/DzMedia';
import { CardSizes } from '../../src/molecules/DzCard';

export const artWorkData: Partial<CardArtworkData> = {
  id: '1',
  media: {
    type: MEDIA_TYPES.IMAGE,
    imgProps: {
      src:
        'https://images.davidzwirner.com/v7/_images_/davidzwirner/artwork/non-dz-artists/peyton-elizabeth/peyel0094/peyel0094_framed.jpg?w=2000&q=85&org_if_sml=1&force_format=webp',
      alt: 'artwork',
    },
  },
  artistName: 'Artist Name',
  artworkTitle: 'Artwork Title',
  artworkYear: 'YEAR',
  medium: 'Monotype on Plike paper',
  dimensions: '13 x 12 inches (33 x 30.5 cm)',
  edition: 'Edition 1 of 5, 2AP',
  price: 2000,
  currency: 'GBP',
  framed: 'Unframed',
  primaryCTA: {
    text: 'Button',
  },
  secondaryCTA: {
    text: 'Button',
    ctaProps: {
      variant: BUTTON_VARIANTS.TERTIARY,
    },
  },
};

export const mediaData: Partial<CardMediaData> = {
  id: '1',
  media: {
    type: MEDIA_TYPES.IMAGE,
    imgProps: {
      src:
        'https://images.davidzwirner.com/v7/_images_/davidzwirner/home/homepage-slider-and-news-images-2023/march/abhk_2023_install_v2_hp.jpg?w=1400&q=85&org_if_sml=1&force_format=webp',
      alt: 'exhibition',
    },
  },
  description:
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu',
};

export const contentData: Partial<CardContentData> = {
  id: '1',
  size: CardSizes['12col'],
  media: {
    type: MEDIA_TYPES.IMAGE,
    imgProps: {
      src:
        'https://images.davidzwirner.com/v7/_images_/davidzwirner/exhibitions/2023/franz-west-paris/final/flex_fwdzpshow2023_install_v2.jpg',
      alt: 'content',
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
  primaryCTA: {
    text: 'Button',
  },
};

export const podcastCard = {
  id: '1',
  size: CardSizes['12col'],
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
  primaryCTA: {
    text: 'Button',
  },
};
