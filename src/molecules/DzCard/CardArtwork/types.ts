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
  edition: string;
  price?: number;
  currency?: string;
  framed?: string;
  enableZoom?: boolean;
  primaryCTA?: CardCTA;
  secondaryCTA?: CardCTA;
  slug?: string;
}
