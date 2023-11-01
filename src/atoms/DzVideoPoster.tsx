import { cn } from '../utils/classnames';
import PlayIconSmall from '../svgIcons/playSmall';
import PlayIconLarge from '../svgIcons/playLarge';
import React from 'react';

const styles: any = {
  posterContainer: `
    absolute
    w-full
    h-full
    top-0
    left-0
    bg-black-20
    z-[100]
  `,
  fitFill: `
    !object-contain
  `,
  posterImg: `
    w-full
    h-full    
  `,
  playIcon: `
    absolute
    left-[1.25rem]
    bottom-[1.25rem]
  `,
};

export const VideoPoster = ({
  imgSrc,
  useSmallPlayIcon,
  onClick,
}: {
  imgSrc?: string;
  useSmallPlayIcon?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn(styles.posterContainer, onClick ? 'cursor-pointer' : '')}
      onClick={onClick}
    >
      {imgSrc && (
        <img
          src={imgSrc}
          className={cn(styles.fitFill, styles.posterImg)}
          alt="poster"
        />
      )}
      {useSmallPlayIcon ? (
        <PlayIconSmall className={styles.playIcon} />
      ) : (
        <PlayIconLarge className={styles.playIcon} />
      )}
    </div>
  );
};

export default VideoPoster;
