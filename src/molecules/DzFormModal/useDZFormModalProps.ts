export const INQUIRY_TYPES = {
  AVAILABLE_ARTWORKS: 'availableArtworks',
  ARTIST: 'artist',
  EXHIBITION: 'exhibition',
  GENERAL: 'general',
};

export const INQUIRY_TYPE_NAMES = [
  INQUIRY_TYPES.AVAILABLE_ARTWORKS,
  INQUIRY_TYPES.ARTIST,
  INQUIRY_TYPES.EXHIBITION,
  INQUIRY_TYPES.GENERAL,
];

export type InquiryType = typeof INQUIRY_TYPE_NAMES[number];

export interface InquireFormContextData {
  id?: string;
  title?: string;
  artwork?: Record<string, any>;
  ctaText?: string;
  inquiryType: InquiryType;
}
