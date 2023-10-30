import React, { HTMLAttributes } from 'react';
import {
  DzMedia,
  DzMediaProps,
  DzText,
  TEXT_SIZES,
  DzTitle,
  TITLE_TYPES,
  TITLE_SIZES,
  DzButton,
  BUTTON_SIZES,
  ButtonModes,
} from '../../atoms';
import { cn } from '../../utils/classnames';
import { TextColors, PrimaryCTAInterstitial } from './DzInterstitial';

export enum InterstitialMode {
  LIGHT = 'Light',
  DARK = 'Dark',
}

export interface InterstitialFullWidthProps
  extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  category?: string;
  primaryCta?: PrimaryCTAInterstitial;
  media?: DzMediaProps;
  textColor?: TextColors;
  customClass?: string;
  customDescriptionClass?: string;
  classNameContent?: string;
  mode?: InterstitialMode;
  fullWidth?: boolean;
  LinkElement: any;
}

const styles: any = {
  mediaContainer: `
    block
    md:h-[30rem]
    h-[22.5rem]
    overflow-hidden
    relative
  `,
  image: `
    h-full
    w-[auto]
    object-cover
    md:object-contain
    md:h-[auto]
    md:w-full
    top-2/4
    object-center
    max-h-full
  `,
  category: `
    md:text-sm
  `,
  title: `
    md:text-xxl
  `,
  contentInfo: `
    flex
    flex-col
    gap-2.5
    basis-1/2
  `,
  btnCTA: `
    md:mt-5
  `,
  nonSplit: `
    relative
    w-auto
  `,
  nonSplitFull: `
    min-h-[22.5rem]
    md:min-h-[27.5rem]
    w-auto
    flex
    justify-center
  `,
  contentInfoNonSplit: `
    w-full
    md:w-[43.375rem]
    p-5
    gap-5
    flex
    flex-col
    absolute
    left-2/4
    top-2/4
    -translate-x-1/2
    -translate-y-1/2
    text-center
    items-center
  `,
  contentInfoNonSplitRelative: `
    w-full
    md:w-[43.375rem]
    p-5
    gap-5
    flex
    flex-col
    text-center
    justify-center
    items-center
  `,
  description: `
    md:text-md
  `,
  outsideFull: `
    -mx-5
  `,
};

const MODE_TEXT_COLORS = {
  [InterstitialMode.DARK]: 'black-100',
  [InterstitialMode.LIGHT]: 'white-100',
};

export const InterstitialFullWidth = ({
  textColor = '',
  category,
  title = '',
  description,
  primaryCta,
  media,
  customClass = '',
  customDescriptionClass = '',
  classNameContent = '',
  mode = InterstitialMode.LIGHT,
  fullWidth = false,
  LinkElement = 'a',
}: InterstitialFullWidthProps) => {
  const textClassColor = `text-${textColor || MODE_TEXT_COLORS[mode]}`;

  return (
    <div
      className={cn(
        styles.nonSplit,
        media ? '' : styles.nonSplitFull,
        fullWidth ? styles.outsideFull : '',
        customClass
      )}
    >
      {media ? (
        <DzMedia
          className={cn(styles.mediaContainer)}
          imgClass={cn(styles.image)}
          {...media}
          LinkElement={LinkElement}
        />
      ) : null}

      <div
        className={cn(
          media
            ? styles.contentInfoNonSplit
            : styles.contentInfoNonSplitRelative,
          classNameContent
        )}
      >
        {category ? (
          <DzText
            className={cn(styles.category, textClassColor)}
            text={category}
            textSize={TEXT_SIZES.XS}
          />
        ) : null}

        {title ? (
          <DzTitle
            classNameTitle={cn(styles.title, textClassColor)}
            title={title}
            titleType={TITLE_TYPES.P}
            titleSize={TITLE_SIZES.LG}
          />
        ) : null}

        {description ? (
          <DzText
            className={cn(
              styles.description,
              textClassColor,
              customDescriptionClass
            )}
            text={description}
          />
        ) : null}

        {primaryCta ? (
          <DzButton
            className={cn(styles.btnCTA)}
            size={BUTTON_SIZES.LARGE}
            mode={
              mode === InterstitialMode.LIGHT
                ? ButtonModes.LIGHT
                : ButtonModes.DARK
            }
            {...(primaryCta?.ctaProps ?? {})}
          >
            {primaryCta.text}
          </DzButton>
        ) : null}
      </div>
    </div>
  );
};

export default InterstitialFullWidth;
