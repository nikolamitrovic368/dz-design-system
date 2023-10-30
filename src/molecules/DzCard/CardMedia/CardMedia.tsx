import React from 'react';
import {
  DzText,
  DzMedia,
  TEXT_TYPES,
  TEXT_SIZES,
  MEDIA_OBJECT_FIT,
  ObjectPositionType,
  MEDIA_ASPECT_RATIOS,
} from '../../../atoms';
import { CardMediaData } from './types';
import { styles } from './styles';
import { cn } from '../../../utils/classnames';
import { slugify } from '../../../utils';

type CardMediaProps = {
  data: CardMediaData;
  onClickImage?: (data: CardMediaData) => void;
  LinkElement: any;
};

export const CardMedia = ({
  data,
  onClickImage,
  LinkElement = 'a',
}: CardMediaProps) => {
  const {
    id,
    media,
    description,
    portableTextDescription,
  } = data as CardMediaData;
  return (
    <div id={id} className={cn(styles.cardContainer)}>
      <DzMedia
        className="overflow-hidden"
        imgClass={cn(styles.mediaImg)}
        objectFit={MEDIA_OBJECT_FIT.COVER}
        objectPosition={ObjectPositionType.CENTER}
        aspectRatio={MEDIA_ASPECT_RATIOS['16:9']}
        {...media}
        imgProps={{
          id: `CardMedia-${slugify(media?.imgProps?.alt) || ''}`,
          ...(media?.imgProps || {}),
          onClick: () => onClickImage?.(data),
        }}
        LinkElement={LinkElement}
      />
      {description ? (
        <DzText
          className={cn(styles.media.descriptionText)}
          textType={TEXT_TYPES.P}
          textSize={TEXT_SIZES.XS}
          text={description}
        />
      ) : null}
      {portableTextDescription ? (
        <div className={cn(styles.media.portableTextDescription)}>
          {portableTextDescription}
        </div>
      ) : null}
    </div>
  );
};

export default CardMedia;
