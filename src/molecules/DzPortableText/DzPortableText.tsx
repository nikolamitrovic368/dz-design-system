import React, { Fragment } from 'react';
import {
  PortableTextTypeComponentProps,
  PortableTextMarkComponentProps,
  PortableTextComponentProps,
  PortableText,
  PortableTextProps,
} from '@portabletext/react';
import {
  MEDIA_TYPES,
  DzLink,
  LINK_VARIANTS,
  TEXT_LINK_SIZES,
  DzText,
  TEXT_TYPES,
  DzTitle,
  TITLE_TYPES,
} from '../../atoms';
import { DzGridColumns, DzColumn } from '../../layout';
import { cn } from '../../utils/classnames';
import { DzCard, CARD_TYPES, CardSizes } from '../DzCard';
import { styles } from './styles';
import { limitCharacterCount } from './limitCharacterCount';

const generalSpacer = (children: any) => {
  if (
    children &&
    Array.isArray(children) &&
    children[0] === '' &&
    children.length === 1
  ) {
    return <span className="block h-5 w-full" />;
  }
  return null;
};

export type DzPortableTextProps = {
  portableProps: PortableTextProps;
  customStyles?: {
    [key: string]: string;
  };
  builder: any;
  ImgElement: any;
  LinkElement: any;
  charLimit?: number;
};

export const DzPortableText = ({
  portableProps,
  customStyles,
  builder,
  ImgElement,
  charLimit,
  LinkElement = 'a',
}: DzPortableTextProps) => {
  const portableTextProps = charLimit
    ? {
        value: limitCharacterCount(portableProps?.value, charLimit),
      }
    : portableProps;

  const CUSTOM_COMPONENTS = {
    types: {
      bodyImage: ({ value }: PortableTextTypeComponentProps<any>) => {
        const { _key, alt, asset, caption } = value?.image ?? {};
        const imgSrc = asset ? builder.image(asset).url() : '';

        return (
          <DzGridColumns
            className={cn(
              styles.containerSpacer,
              customStyles ? customStyles['bodyImage'] : ''
            )}
          >
            <DzColumn span={10} start={2}>
              <DzCard
                type={CARD_TYPES.MEDIA}
                data={{
                  id: _key,
                  size: CardSizes['10col'],
                  media: {
                    type: MEDIA_TYPES.IMAGE,
                    ImgElement,
                    imgProps: { src: imgSrc, alt, fill: true },
                  },
                  description: caption ?? '',
                }}
                LinkElement={LinkElement}
              />
            </DzColumn>
          </DzGridColumns>
        );
      },
      callToAction: ({
        value,
        isInline,
      }: PortableTextTypeComponentProps<any>) =>
        isInline ? (
          <a href={value.url}>{value.text}</a>
        ) : (
          <div className="callToAction">{value.text}</div>
        ),
    },
    marks: {
      greyNote: ({ children }: PortableTextMarkComponentProps) => {
        return children ? (
          <>
            {generalSpacer(children)}
            <span
              className={cn(
                styles.grayParagraph,
                customStyles ? customStyles['greyNote'] : ''
              )}
            >
              {children}
            </span>
          </>
        ) : null;
      },
      sup: ({ children }: PortableTextMarkComponentProps) => {
        return children ? (
          <>
            <sup>{children}</sup>
          </>
        ) : null;
      },
      sub: ({ children }: PortableTextMarkComponentProps) => {
        return children ? (
          <>
            <sub>{children}</sub>
          </>
        ) : null;
      },
      strikethrough: ({ children }: PortableTextMarkComponentProps) => {
        return children ? (
          <>
            <s>{children}</s>
          </>
        ) : null;
      },
      link: ({ value, children }: PortableTextMarkComponentProps) => {
        return (
          <DzLink
            href={value?.href}
            variant={LINK_VARIANTS.TEXT}
            className={styles.link}
            textLinkSize={TEXT_LINK_SIZES.MD}
            LinkElement={LinkElement}
          >
            {children}
          </DzLink>
        );
      },
    },
    block: {
      normal: ({ children }: PortableTextComponentProps<any>) => {
        return children ? (
          <>
            {generalSpacer(children)}

            <DzText
              className={cn(
                styles.singleParagraph,
                customStyles ? customStyles['normal'] : ''
              )}
              text={children as any}
              textType={TEXT_TYPES.P}
            />
          </>
        ) : (
          <Fragment></Fragment>
        );
      },
      h1: ({ children }: PortableTextComponentProps<any>) => {
        return (
          <>
            {generalSpacer(children)}
            <DzTitle
              className={cn(
                styles.h1Container,
                customStyles ? customStyles['h1'] : ''
              )}
              classNameTitle={cn(
                styles.h1,
                customStyles ? customStyles['h1-title'] : ''
              )}
              title={children}
              titleType={TITLE_TYPES.H1}
            />
          </>
        );
      },
    },
  };

  return (
    <div className={styles.container}>
      <PortableText components={CUSTOM_COMPONENTS} {...portableTextProps} />
    </div>
  );
};

export default DzPortableText;
