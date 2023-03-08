import React, { FC, Fragment } from 'react';
import { Transition, Disclosure } from '@headlessui/react';
import {
  DzTitle,
  TitleType,
  TitleSize,
  TITLE_TYPES,
  TITLE_SIZES,
} from './DzTitle';
import {
  DzText,
  TEXT_TYPES as TYPES_TEXT,
  TEXT_SIZES as SIZE_TEXT,
} from './DzText';

import { DzLink } from './DzLink';
import { cn } from '../utils/classnames';
import ArrowDown from '../svgIcons/arrowDown';

interface ExpansionSection {
  slug?: string;
  title: string;
  content?: string;
}

export interface DzExpansionProps {
  title: string;
  subtitle?: string;
  link?: string;
  linkText?: string;
  sections?: ExpansionSection[];
}

interface TitleTypeProps {
  titleType: TitleType;
  titleSize: TitleSize;
  subtitleSize?: TitleSize;
  title: string;
  subtitle?: string;
}

const styles = {
  expansion: `
    flex
    flex-col
  `,
  headWrapper: `
    flex
    justify-between
    pb-[2.5rem]
  `,
  link: `
    !text-md
    underline
    underline-offset-1
  `,
  divider: `
    bg-black-20
  `,
  headerComponent: `
    flex
    justify-between
  `,
  arrowIcon: `
    my-auto
  `,
  contentList: `
    flex
    flex-col
  `,
  textContainer: `
    flex
    flex-col
    justify-start
  `,
  slug: `
    self-start
  `,
  item: `
    mb-5
    mt-5
  `,
  panel: `
    mt-[0.9375rem]
  `,
};

export const DzExpansion: FC<DzExpansionProps> = ({
  title = '',
  subtitle = '',
  linkText = '',
  link = '/',
  sections = [],
}) => {
  const getTitle = ({
    titleType,
    titleSize,
    subtitleSize,
    title,
    subtitle,
  }: TitleTypeProps) => {
    return (
      <DzTitle
        titleType={titleType}
        titleSize={titleSize}
        subtitleSize={subtitleSize}
        title={title}
        subtitle={subtitle}
      />
    );
  };
  const renderLink =
    linkText && link ? (
      <DzLink LinkElement="a" href={link} className={cn(styles.link)}>
        {linkText}
      </DzLink>
    ) : null;

  return (
    <div className={cn(styles.expansion)}>
      <div className={cn(styles.headWrapper)}>
        {getTitle({
          titleType: TITLE_TYPES.H3,
          titleSize: TITLE_SIZES.LG,
          subtitleSize: TITLE_SIZES.LG,
          title,
          subtitle,
        })}
        {renderLink}
      </div>
      <hr className={cn(styles.divider)} />
      <div className={cn(styles.contentList)}>
        {sections.map(section => {
          const { slug, title, content } = section;
          const showSlug = slug ? (
            <DzText
              className={cn(styles.slug)}
              textType={TYPES_TEXT.P}
              text={slug}
              textSize={SIZE_TEXT.XS}
            />
          ) : null;
          return (
            <>
              <div className={cn(styles.item)}>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className={'w-full'}>
                        <div className={cn(styles.headerComponent)}>
                          <div className={cn(styles.textContainer)}>
                            {showSlug}
                            {getTitle({
                              titleType: TITLE_TYPES.H4,
                              titleSize: TITLE_SIZES.LG,
                              title: title,
                            })}
                          </div>

                          <ArrowDown
                            fill="#4D4D4D"
                            className={cn(styles.arrowIcon)}
                          />
                        </div>
                      </Disclosure.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Disclosure.Panel className={cn(styles.panel)} static>
                          {content}
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </div>
              <hr className={cn(styles.divider)} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default DzExpansion;
