import React, { ReactNode } from 'react';
import {
  DzText,
  DzTitle,
  TITLE_SIZES,
  DzButton,
  TITLE_TYPES,
  BUTTON_SIZES,
  LINK_VARIANTS,
  DzLink,
  DzTitleProps,
  DzLinkProps,
  DzButtonProps,
} from '../../atoms';
import { cn } from '../../utils/classnames';
import { ColumnProps, ColumnSpan, DzColumn, DzGridColumns } from '../../layout';
import { sliceMaxCharLength } from '../../utils/validators';

export type DzMoleculeTitleCTA = {
  ctaProps?: DzButtonProps;
  title: string;
  description?: string;
};

type DzTitlePageProps = {
  category?: string;
  title: string;
  subtitle?: string;
  description?: ReactNode;
  titleProps?: DzTitleProps;
  primaryCTA?: DzMoleculeTitleCTA;
  linkCTA?: Omit<DzLinkProps, 'LinkElement'>;
  customClass?: string;
  descriptionColSpan?: ColumnSpan;
  fullLeftContainer?: boolean;
  customCTAContainerProps?: ColumnProps;
  isWide?: boolean;
  disableMaxTitleLength?: boolean;
  LinkElement: any;
};

const styles: any = {
  titleContainer: `
    block
    w-full
    flex
    flex-col
    gap-5
    md:flex-row
    `,
  titleColsContainer: `
    md:grid
    md:grid-cols-12
  `,
  leftContainer: `
    w-full
    flex
    flex-col
    gap-2.5
  `,
  leftContainerWide: `
    md:col-span-8
  `,
  fullLeft: `
    basis-full
  `,
  halfLeft: `
    basis-1/2
  `,
  rightContainer: `
    flex
    flex-col
    basis-1/2
    gap-5
    md:gap-0
  `,
  rightContainerWide: `
    col-span-12
    md:col-span-4
  `,
  titleClassContainer: `
    w-full
  `,
  title: `
    text-xl
    md:text-xxl
  `,
  description: `
    md:text-md
  `,
  linkCTA: `
    text-xs
    md:text-sm
    md:mt-5
  `,
  primaryCTASupertitle: `
    text-md
    md:text-xs
    text-black-60
    mb-[0.175rem]
  `,
};

const CHARACTER_LIMIT_TITLE = 50;
const CHARACTER_LIMIT_BODY = 500;

const DEFAULT_TITLE_PROPS = {
  titleType: TITLE_TYPES.P,
  titleSize: TITLE_SIZES.LG,
  subtitleSize: TITLE_SIZES.LG,
  subtitleType: TITLE_TYPES.P,
};

export const DzTitlePage = ({
  category,
  title,
  subtitle,
  description,
  titleProps = DEFAULT_TITLE_PROPS,
  primaryCTA,
  customClass = '',
  linkCTA,
  fullLeftContainer = false,
  customCTAContainerProps = {},
  isWide = false,
  disableMaxTitleLength,
  LinkElement = 'a',
}: DzTitlePageProps) => {
  return (
    <div
      className={cn(
        styles.titleContainer,
        customClass,
        isWide ? styles.titleColsContainer : ''
      )}
    >
      <div
        className={cn(
          styles.leftContainer,
          fullLeftContainer ? styles.fullLeft : styles.halfLeft,
          isWide ? styles.leftContainerWide : ''
        )}
      >
        {category ? <DzText text={category} /> : null}
        <DzTitle
          className={cn(styles.titleClassContainer)}
          classNameTitle={cn(styles.title)}
          classNameSubtitle={cn(styles.title)}
          {...titleProps}
          subtitle={sliceMaxCharLength(subtitle, CHARACTER_LIMIT_TITLE)}
          title={
            disableMaxTitleLength
              ? title
              : sliceMaxCharLength(title, CHARACTER_LIMIT_TITLE)
          }
        />
      </div>
      {description || primaryCTA || linkCTA ? (
        <div
          className={cn(
            styles.rightContainer,
            isWide ? styles.rightContainerWide : ''
          )}
        >
          <DzText
            className={cn(styles.description)}
            text={
              typeof description === 'string'
                ? sliceMaxCharLength(description, CHARACTER_LIMIT_BODY)
                : description
            }
          />
          {primaryCTA ? (
            <DzGridColumns>
              <DzColumn span={4} start={9} {...customCTAContainerProps}>
                {primaryCTA.description ? (
                  <DzText
                    className="mb-[0.3125rem] text-black-60"
                    text={primaryCTA.description}
                  />
                ) : null}
                <DzButton
                  className="w-full"
                  {...primaryCTA.ctaProps}
                  size={BUTTON_SIZES.LARGE}
                >
                  {primaryCTA.title}
                </DzButton>
              </DzColumn>
            </DzGridColumns>
          ) : null}
          {linkCTA ? (
            <DzLink
              className={styles.linkCTA}
              variant={LINK_VARIANTS.TEXT}
              {...linkCTA}
              LinkElement={LinkElement}
            >
              Learn More
            </DzLink>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default DzTitlePage;
