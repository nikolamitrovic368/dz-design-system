import React, { FC, useState, useMemo, useCallback } from 'react';
import { DzGridColumns, DzColumn, ColumnSpan } from '../../layout';
import {
  DzRange,
  DzText,
  DzLink,
  DzLinkProps,
  DzTextProps,
  LINK_VARIANTS,
  MEDIA_ASPECT_RATIOS,
} from '../../atoms';
import {
  DzCard,
  CardTypes,
  DataCardType,
  isArtworkCard,
  CARD_TYPES,
  CardSizes,
} from '../../molecules';
import { cn } from '../../utils/classnames';
import { FourSquares } from '../../svgIcons/four-squares';
import { SixSquares } from '../../svgIcons/six-squares';
import { EightSquares } from '../../svgIcons/eight-squares';
import { BREAKPOINTS } from '../../layout/breakpoints';
import useWindowSize from '../../hooks/useWindowSize';
import { CardMediaData } from '../DzCard/CardMedia';
import { CardArtworkData } from '../DzCard/CardArtwork';

type StepInterface = {
  id: number;
  numberOfColumns: number;
  icon: JSX.Element;
};
type LinkCTA = {
  text: string;
  url: string;
  linkProps?: Omit<DzLinkProps, 'LinkElement'>;
};

type ExtraData = {
  cardType?: CardTypes;
};

type RichCard = Omit<DataCardType, 'size'> & ExtraData;

export type DzComplexGridProps = {
  cards: RichCard[];
  steps?: StepInterface[];
  hideControls?: boolean;
  displayNumberOfResults?: boolean;
  headingTitle?: string;
  maxItemsPerRow?: number;
  textProps?: DzTextProps;
  useLink?: boolean;
  linkCTA?: LinkCTA;
  defaultStart?: number;
  onClickImage?: (data: CardMediaData | CardArtworkData) => void;
  cardStyles?: any;
  // allows for per-card container styling via card id -> style map
  cardStylesMap?: Record<string, string>;
  gridColumnsStyles?: any;
  LinkElement: any;
  displayFilters?: Record<string, boolean | undefined>;
};

const MINIMUM_VALUE = 1;
const INITIAL_VALUE = 2;
const STEPS_SPAN = 1;
const STEP_TO_HIDE_CTA = 3;

const styles: any = {
  headControls: `
    flex
    justify-between
    items-center
    mb-5
    md:mb-10
  `,
  rangeContainer: `
    flex
    gap-2.5
    items-center
    ml-auto
  `,
  range: `
    w-[6.25rem]
  `,
  representation: `
    w-2.5
    h-2.5
    bg-black-100
  `,
  shellRepresentation: `
    w-2.5
    h-2.5
  `,
};

const DEFAULT_STEPS = [
  {
    id: 1,
    numberOfColumns: 1,
    icon: <div className={cn(styles.representation)}></div>,
  },
  {
    id: 2,
    numberOfColumns: 2,
    icon: <FourSquares />,
  },
  {
    id: 3,
    numberOfColumns: 3,
    icon: <SixSquares />,
  },
  {
    id: 4,
    numberOfColumns: 4,
    icon: <EightSquares />,
  },
];

export const DzComplexGrid: FC<DzComplexGridProps> = ({
  cards,
  steps = DEFAULT_STEPS,
  headingTitle = 'Artworks',
  displayNumberOfResults = false,
  hideControls = false,
  maxItemsPerRow = steps.length,
  textProps,
  useLink = false,
  linkCTA,
  defaultStart = INITIAL_VALUE,
  onClickImage,
  cardStyles,
  cardStylesMap,
  gridColumnsStyles,
  LinkElement = 'a',
  displayFilters,
}) => {
  const { width } = useWindowSize();
  const isMobile = useMemo(() => {
    return width <= BREAKPOINTS.MD;
  }, [width]);

  const maximumValue = useMemo(() => maxItemsPerRow || steps.length, [
    maxItemsPerRow,
    steps,
  ]);
  const initialValue = useMemo(
    () => Math.min(maximumValue, Math.max(MINIMUM_VALUE, defaultStart)),
    [defaultStart, maximumValue]
  );
  const [stepValue, setStepValue] = useState(initialValue);
  const numberOfResults = cards?.filter(items => {
    return items?.cardType !== CARD_TYPES.MEDIA;
  })?.length;
  const columnsSpanPerRow = useMemo(() => {
    const { numberOfColumns } = steps.find(step => step.id === stepValue) ?? {};
    const stepToDivide = numberOfColumns ?? stepValue;
    if (stepToDivide === 0) return 12;
    if (stepToDivide > 12) return 1;
    return Math.round(12 / stepToDivide) as ColumnSpan;
  }, [stepValue, steps]);

  const CurrentIcon = useMemo(() => {
    const { icon } = steps.find(step => step.id === stepValue) ?? {
      icon: <div className={cn(styles.shellRepresentation)} />,
    };
    return icon;
  }, [steps, stepValue]);

  const handleChange = useCallback(currentStep => {
    const [, step] = currentStep;
    setStepValue(step);
  }, []);

  const displayText = useMemo(() => {
    const { text } = textProps ?? {};
    const resultsTitle = `${numberOfResults} ${headingTitle}`;
    return displayNumberOfResults ? resultsTitle : text;
  }, [displayNumberOfResults, numberOfResults, headingTitle, textProps]);

  const hideControlsContainer = useMemo(
    () =>
      hideControls ||
      (!displayText &&
        !(!isMobile && maximumValue !== 1) &&
        !(useLink && linkCTA)),
    [displayText, useLink, linkCTA, maximumValue, isMobile, hideControls]
  );
  return (
    <div>
      {!hideControlsContainer ? (
        <div className={styles.headControls}>
          {displayText ? (
            <DzText
              className={cn(styles.heading)}
              {...(textProps ?? {})}
              text={displayText}
            />
          ) : null}

          {!hideControls && !isMobile && maximumValue !== 1 ? (
            !useLink ? (
              <div className={cn(styles.rangeContainer)}>
                <DzText text="View:" />
                <div className={cn(styles.range)}>
                  <DzRange
                    min={MINIMUM_VALUE}
                    max={maximumValue}
                    step={STEPS_SPAN}
                    value={[MINIMUM_VALUE, stepValue]}
                    onChange={handleChange}
                  />
                </div>
                {CurrentIcon}
              </div>
            ) : null
          ) : null}
          {useLink && linkCTA ? (
            <DzLink
              {...(linkCTA.linkProps ?? {})}
              href={linkCTA.url}
              LinkElement={LinkElement}
              variant={LINK_VARIANTS.TEXT}
            >
              {linkCTA.text}
            </DzLink>
          ) : null}
        </div>
      ) : null}

      <DzGridColumns
        className={cn(
          columnsSpanPerRow === 12
            ? 'gap-y-[2.5rem] md:gap-y-[7.5rem]'
            : 'gap-y-[2.5rem] md:gap-y-[3.75rem]',
          gridColumnsStyles
        )}
      >
        {cards.map((card: any, key) => {
          if (!card) return null;

          const { cardType, ...rest } = card;

          let cardDataType = cardType ?? CARD_TYPES.ARTWORK;
          let cardData = { ...rest };

          if (isArtworkCard(card)) {
            const { primaryCTA, secondaryCTA } = card;
            const primaryCTAProps =
              !isMobile && stepValue < STEP_TO_HIDE_CTA
                ? primaryCTA
                : undefined;
            const secondaryCTAProps =
              !isMobile && stepValue < STEP_TO_HIDE_CTA
                ? secondaryCTA
                : undefined;

            cardData = {
              ...card,
              media: {
                aspectRatio: MEDIA_ASPECT_RATIOS['4:3'],
                ...card.media,
              },
              primaryCTA: primaryCTAProps,
              secondaryCTA: secondaryCTAProps,
            };
          }

          return (
            <DzColumn key={`${cardData.id}-${key}`} span={columnsSpanPerRow}>
              <DzCard
                type={cardDataType}
                displayFilters={displayFilters}
                data={{
                  ...cardData,
                  size: [CardSizes['12col'], columnsSpanPerRow],
                }}
                onClickImage={data => onClickImage?.(data)}
                imageStyles={cn(cardStyles, cardStylesMap?.[cardData.id] || '')}
                LinkElement={LinkElement}
              />
            </DzColumn>
          );
        })}
      </DzGridColumns>
    </div>
  );
};

export default DzComplexGrid;
