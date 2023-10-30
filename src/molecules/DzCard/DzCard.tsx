import React from 'react';
import { CardArtwork, CardArtworkData } from './CardArtwork';
import { CardMedia, CardMediaData } from './CardMedia';
import { CardContent, CardContentData } from './CardContent';
import { CARD_TYPES, CardTypes, DataCardType } from './types';

export type DzCardProps = {
  type: CardTypes;
  data: DataCardType;
  onClickImage?: (data: CardMediaData | CardArtworkData) => void;
  onViewport?: (data: DataCardType) => void;
  imageStyles?: any;
  LinkElement: any;
};

export const DzCard = ({
  type,
  data,
  onClickImage,
  onViewport,
  imageStyles,
  LinkElement = 'a',
}: DzCardProps) => {
  if (type === CARD_TYPES.MEDIA) {
    return (
      <CardMedia
        data={data as CardMediaData}
        onClickImage={onClickImage}
        LinkElement={LinkElement}
      />
    );
  }
  if (type === CARD_TYPES.ARTWORK) {
    return (
      <CardArtwork
        data={data as CardArtworkData}
        onClickImage={onClickImage}
        imageStyles={imageStyles}
        LinkElement={LinkElement}
        onViewport={onViewport}
      />
    );
  }
  if (type === CARD_TYPES.CONTENT) {
    return (
      <CardContent data={data as CardContentData} LinkElement={LinkElement} />
    );
  }
  if (type === CARD_TYPES.LOCATION) {
    return (
      <CardContent
        isLocation
        data={data as CardContentData}
        LinkElement={LinkElement}
      />
    );
  }
  return <div>No supported type</div>;
};

export default DzCard;
