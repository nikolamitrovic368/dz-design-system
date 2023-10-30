import { ReactNode } from 'react';
import {
  DzButtonProps,
  DzLinkProps,
  DzMediaProps,
  SubTitleType,
  TitleType,
} from '../../../atoms';
import { BaseCard } from '../types';

type PrimaryCTA = {
  text: string;
  ctaProps?: DzButtonProps;
};

type LinkCTA = {
  text: string;
  url: string;
  linkProps?: Omit<DzLinkProps, 'LinkElement'>;
};

export interface CardContentData extends BaseCard {
  media: Omit<DzMediaProps, 'LinkElement'>;
  category?: string;
  title: string;
  titleType?: TitleType;
  subtitle?: string;
  subtitleType?: SubTitleType;
  secondaryTitle?: ReactNode;
  secondarySubtitle?: string;
  description?: string;
  portableTextDescription?: ReactNode;
  portableTextAdditionalInformation?: ReactNode;
  linkCTA?: LinkCTA;
  primaryCTA?: PrimaryCTA;
  hideImage?: boolean;
  enableZoom?: boolean;
  cardLink?: Omit<DzLinkProps, 'LinkElement'>;
}
