export const INQUIRY_TYPES = {
  ARTICLE: 'Article',
  ARTIST: 'Artist',
  ARTWORKS: 'Artwork',
  AVAILABLE_WORKS: 'Available Works',
  COLLECT: 'Collect',
  EXHIBITION: 'Exhibition',
  HOME: 'Home',
  OTHER: 'Other',
  STORIES: 'Stories',
  UTOPIA_EDITIONS: 'Utopia Editions',
};

export const INQUIRY_TYPE_NAMES = [
  INQUIRY_TYPES.ARTICLE,
  INQUIRY_TYPES.ARTIST,
  INQUIRY_TYPES.ARTWORKS,
  INQUIRY_TYPES.AVAILABLE_WORKS,
  INQUIRY_TYPES.COLLECT,
  INQUIRY_TYPES.EXHIBITION,
  INQUIRY_TYPES.HOME,
  INQUIRY_TYPES.OTHER,
  INQUIRY_TYPES.STORIES,
];

export type InquiryType = typeof INQUIRY_TYPE_NAMES[number];

export const INQUIRY_CATEGORIES = {
  ARTWORK: 'Artwork',
  GENERAL: 'General',
};

export const INQUIRY_CATEGORY_NAMES = [
  INQUIRY_CATEGORIES.ARTWORK,
  INQUIRY_CATEGORIES.GENERAL,
];

export type InquiryCategory = typeof INQUIRY_CATEGORY_NAMES[number];

export interface InquireFormContextData {
  id?: string;
  title?: string;
  artwork?: Record<string, any>;
  ctaText?: string;
}
