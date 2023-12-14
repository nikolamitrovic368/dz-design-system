import { ReactNode } from 'react';
import { DzButtonProps, DzMediaProps } from '../../../atoms';
import { BaseCard } from '../types';

type CardCTA = {
  text: string;
  ctaProps?: DzButtonProps;
};

export interface CardArtworkData extends BaseCard {
  media: Omit<DzMediaProps, 'LinkElement'>;
  artistName: string;
  artworkTitle: string;
  artworkYear: string;
  medium: string;
  dimensions: string;
  portableTextArtworkTitle?: ReactNode;
  portableTextDimensions?: ReactNode;
  portableTextFramedDimensions?: ReactNode;
  portableTextAdditionalInformation?: ReactNode;
  portableTextEdition?: ReactNode;
  edition: string;
  price?: number;
  currency?: string;
  framed?: string;
  enableZoom?: boolean;
  primaryCTA?: CardCTA;
  secondaryCTA?: CardCTA;
  slug?: string;
}

export const ARTWORK_DISPLAY_FILTERS = {
  ARTIST_NAME: 'artistName',
  ADDITIONAL_INFORMATION: 'artworkAdditionalInformation',
  CTA: 'artworkCTA',
  DATE_SELECTION: 'artworkDateSelection',
  DESCRIPTION: 'artworkDescription',
  DIMENSIONS: 'artworkDimensions',
  EDITION: 'artworkEdition',
  FRAMED: 'artworkFramed',
  FRAMED_DIMENSIONS: 'artworkFramedDimensions',
  MEDIA: 'artworkMedia',
  MEDIUM: 'artworkMedium',
  PRICE: 'artworkPrice',
  TITLE: 'artworkTitle',
};

export type ArtworkDisplayFilters = {
  artistName?: boolean;
  artworkAdditionalInformation?: boolean;
  artworkCTA?: boolean;
  artworkDateSelection?: boolean;
  artworkDescription?: boolean;
  artworkDimensions?: boolean;
  artworkEdition?: boolean;
  artworkFramed?: boolean;
  artworkFramedDimensions?: boolean;
  artworkMedia?: boolean;
  artworkMedium?: boolean;
  artworkPrice?: boolean;
  artworkTitle?: boolean;
};
