import { ReactNode } from 'react';
import { DzMediaProps } from '../../../atoms';
import { BaseCard } from '../types';

export interface CardMediaData extends BaseCard {
  media: Omit<DzMediaProps, 'LinkElement'>;
  description: string;
  portableTextDescription?: ReactNode;
}
