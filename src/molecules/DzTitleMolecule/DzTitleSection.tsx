import React from 'react';
import {
  DzTitle,
  TITLE_SIZES,
  DzLink,
  TITLE_TYPES,
  LINK_VARIANTS,
  DzLinkProps,
  DzTitleProps,
} from '../../atoms';
import { cn } from '../../utils/classnames';
import { sliceMaxCharLength } from '../../utils/validators';

export type DzMoleculeLinkCTA = {
  text: string;
  url: string;
  linkProps?: Omit<DzLinkProps, 'LinkElement'>;
};

type DzTitleSectionProps = {
  title: string;
  subtitle?: string;
  titleProps?: Partial<DzTitleProps>;
  linkCTA?: DzMoleculeLinkCTA;
  customClass?: string;
  fullLeftContainer?: boolean;
  LinkElement: any;
};

const styles: any = {
  titleContainer: `
    flex
    gap-5
    flex-row
    justify-between
  `,
  title: `
    text-lg
    md:text-xxl
  `,
  linkCta: `
    min-w-fit
  `,
  linkText: `
    text-xs
    md:text-sm
  `,
};

const DEFAULT_TITLE_PROPS = {
  titleType: TITLE_TYPES.P,
  titleSize: TITLE_SIZES.LG,
  subtitleSize: TITLE_SIZES.LG,
  subtitleType: TITLE_TYPES.P,
};

const CHARACTER_LIMIT_TITLE = 50;

export const DzTitleSection = ({
  title,
  subtitle,
  titleProps = DEFAULT_TITLE_PROPS,
  linkCTA,
  customClass = '',
  LinkElement = 'a',
}: DzTitleSectionProps) => {
  return (
    <div className={cn(styles.titleContainer, customClass)}>
      <DzTitle
        classNameTitle={cn(styles.title)}
        classNameSubtitle={cn(styles.title)}
        {...titleProps}
        subtitle={sliceMaxCharLength(subtitle, CHARACTER_LIMIT_TITLE)}
        title={sliceMaxCharLength(title, CHARACTER_LIMIT_TITLE)}
      />
      {linkCTA ? (
        <div className={cn(styles.linkCta)}>
          <DzLink
            {...(linkCTA.linkProps ?? {})}
            variant={LINK_VARIANTS.TEXT}
            className={cn(styles.linkText)}
            href={linkCTA.url}
            LinkElement={LinkElement}
          >
            {linkCTA.text}
          </DzLink>
        </div>
      ) : null}
    </div>
  );
};

export default DzTitleSection;
