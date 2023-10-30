import { ColumnSpan } from '../../layout';
import { CardArtworkData } from './CardArtwork';
import { CardContentData } from './CardContent';
import { CardMediaData } from './CardMedia';
import { CardSizes } from './sizes';

export type CardSizeType = CardSizes | ColumnSpan;

export type BaseCard = {
  id?: string;
  //    12col or 12  or [Mobile Size, Desktop Size]
  size: CardSizeType | CardSizeType[];
  viewport?: CardViewport;
  isDisabled?: boolean;
};

export enum CardViewport {
  Desktop = 'Desktop',
  Carousel = 'Carousel',
}

export const CARD_TYPES = {
  CONTENT: 'content',
  ARTWORK: 'artwork',
  LOCATION: 'location',
  BOOK: 'book',
  ARTIST: 'artist',
  GALLERY: 'gallery',
  MEDIA: 'media',
  PODCAST: 'podcast',
};

export const CARD_TYPES_NAMES = [
  CARD_TYPES.CONTENT,
  CARD_TYPES.ARTWORK,
  CARD_TYPES.BOOK,
  CARD_TYPES.ARTIST,
  CARD_TYPES.GALLERY,
  CARD_TYPES.MEDIA,
  CARD_TYPES.PODCAST,
] as const;

export type CardTypes = typeof CARD_TYPES_NAMES[number];

export type DataCardType =
  | Omit<CardArtworkData, 'LinkElement'>
  | Omit<CardMediaData, 'LinkElement'>
  | Omit<CardContentData, 'LinkElement'>;

export function isArtworkCard(object: unknown): object is CardArtworkData {
  if (object !== null && typeof object === 'object' && object) {
    return (
      'artistName' in object ||
      'artworkTitle' in object ||
      'artworkYear' in object ||
      'medium' in object
    );
  }
  return false;
}

export function isCardMediaData(object: unknown): object is CardMediaData {
  if (object !== null && typeof object === 'object' && object) {
    return (
      !('title' in object) && ('media' in object || 'description' in object)
    );
  }
  return false;
}

export function isCardContentData(object: unknown): object is CardContentData {
  if (object !== null && typeof object === 'object' && object) {
    return (
      'title' in object ||
      'category' in object ||
      'subtitle' in object ||
      'secondaryTitle' in object ||
      'secondarySubtitle' in object
    );
  }
  return false;
}
