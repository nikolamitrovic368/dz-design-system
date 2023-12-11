import React from 'react';
import { cn } from '../../utils/classnames';
import { DzText, DzLink, LINK_VARIANTS } from '../../atoms';
import { DzColumn, DzGridColumns } from '../../layout';
import { useIsSmallWindowSize } from '../../hooks/useIsSmallWindowSize';
import { LocationData } from './types/DzTitleExhibitionTypes';
import { ArtistData } from './types/DzTitleExhibitionTypes';
import { collectHours } from './utils/collectHours';
import DzContainerTitle from './DzContainerTitle';
import { splitLocationAddressLines } from './utils/formatAddress';
import { InquireFormContextData } from '../DzFormModal';

type DzTitleExhibitionProps = {
  artists: Array<ArtistData>;
  checklistPDFURL?: string;
  displayDate?: string;
  exhibitionState: EXHIBITION_STATES;
  exhibitionDateRangeText: string;
  location?: LocationData;
  onClickCTA?: (contextData: InquireFormContextData) => void;
  reception?: string;
  showCoordinates?: boolean;
  pressReleasePDFURL?: string;
  title: string;
  subtitle?: string;
  subpageTitle?: string;
  LinkElement: any;
};

const styles: any = {
  infoColumnContainer: `
    flex
    gap-[1.25rem]
    md:block
  `,
  infoColumnTitle: `
    w-1/3
    md:w-full
    md:text-md
    text-black-60
    mb-[0.625rem]
  `,
  infoColumnBody: `
    w-2/3
    md:w-full
    md:text-md
    text-black-100
  `,
  addressCity: `    
    md:text-md
  `,
  mdText: `
    md:text-md
  `,
  black60Text: `
    text-black-60
  `,
  locationHours: `
    mt-[0.5rem]
  `,
  container: `
    mb-[3.75rem]
    md:mt-[3.75rem]
  `,
  openingReceptionTitle: `
    md:mt-[1.25rem]
    md:mb-[0.625rem]
  `,
  smallText: `
    text-sm
  `,
  pageTitleContainer: `
    mb-[2.5rem]
    md:mb-0
  `,
};

export enum EXHIBITION_STATES {
  PRELAUNCH = 'PRELAUNCH',
  OPEN = 'OPEN',
  POSTLAUNCH = 'POSTLAUNCH',
}

const EXHIBITION_STATES_TO_LABELS = {
  PRELAUNCH: 'Coming Soon',
  OPEN: 'Now Open',
  POSTLAUNCH: 'Past',
};

// TODO add a variant for this in DzTitleMolecule and pass through props from consumer
export const DzTitleExhibition = ({
  artists,
  checklistPDFURL,
  displayDate,
  exhibitionState,
  exhibitionDateRangeText,
  location,
  onClickCTA,
  reception,
  pressReleasePDFURL,
  showCoordinates = false,
  title,
  subtitle,
  subpageTitle,
  LinkElement = 'a',
}: DzTitleExhibitionProps) => {
  const locationHours = location ? collectHours(location) : '';
  const locationLines = splitLocationAddressLines(location?.address);
  const isSmall = useIsSmallWindowSize();
  const titleText = `${title}${subtitle ? `: ${subtitle}` : ''}${
    subpageTitle ? ` — ${subpageTitle}` : ''
  }`;

  return (
    <>
      <DzContainerTitle
        category="Exhibition"
        primaryCTA={{
          title: 'Inquire',
          description: 'Want to know more?',
          ctaProps: {
            onClick: () =>
              onClickCTA?.({
                title: titleText,
                ctaText: 'Inquire',
              }),
          },
        }}
        title={titleText}
        customCTAContainerProps={{
          span: 12,
          start: 1,
        }}
        fullLeftContainer
        LinkElement={LinkElement}
      />
      {showCoordinates && (
        <DzGridColumns className={styles.container}>
          <DzColumn span={[12, 4]}>
            <div className={styles.infoColumnContainer}>
              <DzText
                className={styles.infoColumnTitle}
                text={
                  exhibitionState
                    ? EXHIBITION_STATES_TO_LABELS[exhibitionState]
                    : ''
                }
              />
              <DzText
                className={styles.infoColumnBody}
                text={displayDate || exhibitionDateRangeText}
              />
              {!isSmall && reception && (
                <>
                  <DzText
                    text="Opening Reception"
                    className={cn(
                      styles.mdText,
                      styles.black60Text,
                      styles.openingReceptionTitle
                    )}
                  />
                  <DzText text={reception} className={cn(styles.mdText)} />
                </>
              )}
            </div>
          </DzColumn>
          {isSmall && reception && (
            <DzColumn span={12}>
              <div className={styles.infoColumnContainer}>
                <DzText
                  text="Opening Reception"
                  className={styles.infoColumnTitle}
                />
                <DzText text={reception} className={styles.infoColumnBody} />
              </div>
            </DzColumn>
          )}
          <DzColumn span={[12, 4]}>
            {location?.address && (
              <div className={styles.infoColumnContainer}>
                <DzText className={styles.infoColumnTitle} text={'Location'} />
                <div className={styles.infoColumnBody}>
                  <DzLink
                    href={location.url}
                    target="_blank"
                    LinkElement={LinkElement}
                  >
                    {locationLines.map(locationLine => (
                      <DzText
                        key={locationLine}
                        text={locationLine}
                        className={cn(styles.mdText, styles.black60Text)}
                        style={{ textDecoration: 'inherit' }}
                      />
                    ))}
                  </DzLink>
                  <DzText
                    className={cn(
                      styles.mdText,
                      styles.black60Text,
                      styles.locationHours
                    )}
                    text={locationHours}
                  />
                </div>
              </div>
            )}
          </DzColumn>
          {/*
          <DzColumn span={[12, 4]}>
            <div className={styles.infoColumnContainer}>
              TODO: second gallery location here
            </div>
          </DzColumn>
          */}
          <DzColumn span={[12, 4]}>
            <div className={styles.infoColumnContainer}>
              <DzText className={styles.infoColumnTitle} text="Artists" />
              <div className={styles.infoColumnBody}>
                {artists?.map(({ fullName, artistPage }) =>
                  artistPage?.slug?.current ? (
                    <DzLink
                      title={fullName}
                      href={artistPage.slug.current}
                      variant={LINK_VARIANTS.TEXT}
                      className={styles.mdText}
                      key={fullName}
                      LinkElement={LinkElement}
                    >
                      {fullName}
                    </DzLink>
                  ) : (
                    <DzText
                      text={fullName}
                      className={styles.mdText}
                      key={fullName}
                    />
                  )
                )}
              </div>
            </div>
          </DzColumn>
          {pressReleasePDFURL && (
            <DzColumn span={isSmall ? 12 : 3}>
              <div className={styles.infoColumnContainer}>
                <div className={styles.infoColumnTitle} />
                <div className={styles.infoColumnBody}>
                  <DzLink
                    className={styles.smallText}
                    href={pressReleasePDFURL}
                    variant={LINK_VARIANTS.TEXT}
                    LinkElement={LinkElement}
                  >
                    View Press Release
                  </DzLink>
                </div>
              </div>
            </DzColumn>
          )}
          {checklistPDFURL && (
            <DzColumn span={isSmall ? 12 : 3}>
              <div className={styles.infoColumnContainer}>
                <div className={styles.infoColumnTitle} />
                <div className={styles.infoColumnBody}>
                  <DzLink
                    className={styles.smallText}
                    href={checklistPDFURL}
                    variant={LINK_VARIANTS.TEXT}
                    LinkElement={LinkElement}
                  >
                    Download Checklist
                  </DzLink>
                </div>
              </div>
            </DzColumn>
          )}
        </DzGridColumns>
      )}
    </>
  );
};

export default DzTitleExhibition;
