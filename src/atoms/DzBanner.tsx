import React, { MouseEventHandler } from 'react';
import { cn } from '../utils/classnames';
import { DzText, TEXT_SIZES, TEXT_TYPES } from './DzText';
import CloseIcon from '../svgIcons/close';
import ExclamationCircle from '../svgIcons/exclamationCircle';
import { DzLink, LINK_VARIANTS } from './DzLink';

export const MESSAGE_VARIANTS = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  ALERT: 'alert',
  WARNING: 'warning',
  ERROR: 'error',
};

export const ALERT_VARIANT = {
  DEFAULT: 'aDefault',
  DARK: 'aDark',
  SUCCESS: 'aSuccess',
  ERROR: 'aError',
};

export const TOAST_VARIANT = {
  DARK: 'tDark',
  SUCCESS: 'tSuccess',
  ERROR: 'tError',
};

export const TYPES = {
  MESSAGE: 'messageType',
  ALERT: 'alertType',
  TOAST: 'toastType',
};
export const ALERT_VARIANT_NAMES = [
  ALERT_VARIANT.DEFAULT,
  ALERT_VARIANT.DARK,
  ALERT_VARIANT.SUCCESS,
  ALERT_VARIANT.ERROR,
] as const;

export const TOAST_VARIANT_NAMES = [
  TOAST_VARIANT.DARK,
  TOAST_VARIANT.SUCCESS,
  TOAST_VARIANT.ERROR,
] as const;
export const BANNER_TYPES_NAMES = [
  TYPES.MESSAGE,
  TYPES.ALERT,
  TYPES.TOAST,
] as const;
export const BANNER_VARIANT_NAMES = [
  MESSAGE_VARIANTS.DEFAULT,
  MESSAGE_VARIANTS.SUCCESS,
  MESSAGE_VARIANTS.ALERT,
  MESSAGE_VARIANTS.WARNING,
  MESSAGE_VARIANTS.ERROR,
] as const;
export type BannerType = typeof BANNER_TYPES_NAMES[number];
export type BannerMessageVariant = typeof BANNER_VARIANT_NAMES[number];
export type BannerAlertVariant = typeof ALERT_VARIANT_NAMES[number];
export type BannerToastVariant = typeof TOAST_VARIANT_NAMES[number];

export type DzBannerProps = {
  type?: BannerType;
  messageVariant?: BannerMessageVariant;
  alertVariation?: BannerAlertVariant;
  toastVariant?: BannerToastVariant;
  title: string;
  subtitle?: string;
  showInfoIcon?: boolean;
  linkText?: string;
  link?: string;
  onClickClose?: MouseEventHandler<any>;
  LinkElement: any;
};

const styles: any = {
  tDark: `
    bg-black-100
  `,
  tSuccess: `
    bg-green-100
  `,
  tError: `
    bg-red-100
  `,
  aDefault: `
    bg-black-10
  `,
  aDark: `
    bg-black-100
  `,
  aSuccess: `
    bg-green-100
  `,
  aError: `
    bg-red-100
  `,
  bannerContainer: `
    relative
    p-5
  `,
  textContainer: `
    flex
  `,
  messageType: `
    flex-col
  `,
  title: {
    default: `
      text-black-10
    `,
    success: `
      text-green-100
    `,
    alert: `
      text-red-40
    `,
    warning: `
      text-yellow-40
    `,
    error: `
      text-red-100
    `,
    aDefault: `
      text-black-100
    `,
    aDark: `
      text-white-100
    `,
    aSuccess: `
      text-white-100
    `,
    aError: `
      text-white-100
    `,
    tDark: `
      text-white-100
    `,
    tSuccess: `
      text-white-100
    `,
    tError: `
      text-white-100
    `,
    alertType: `
      w-full
      text-xs
    `,
    toastType: `
      text-sm
    `,
  },
  subtitle: {
    tDark: `
      text-white-100
    `,
    tSuccess: `
      text-white-100
    `,
    tError: `
      text-white-100
    `,
    toastType: `
      text-xs
    `,
  },
  container: {
    alertType: `
      flex-row
      justify-center
      py-2.5
    `,
    toastType: `
      flex
      flex-row
      py-2.5
    `,
  },
  subContainer: {
    alertType: `
      justify-center
    `,
  },
  default: `
    bg-black-10
  `,
  success: `
    bg-green-10
  `,
  alert: `
    bg-red-10
  `,
  warning: `
    bg-yellow-10
  `,
  error: `
    bg-red-60
  `,
  closeIcon: `
    relative
    cursor-pointer
  `,
  titleToastCont: `
    flex
    flex-col
  `,
  infoIcon: `
    mt-[0.125rem]
    mr-2.5
  `,
  linkLayout: `
    justify-between
    content-center
  `,
  link: {
    toastType: `
      text-white-100
      text-xs
      !decoration-white-100 
      !hover:!decoration-white-100
    `,
  },
  alertType: `
    flex
    items-start
    md:items-center
    justify-items-center
    w-full
    text-center
  `,
};

// unused
export const DzBanner = ({
  type = TYPES.MESSAGE,
  messageVariant = MESSAGE_VARIANTS.DEFAULT,
  alertVariation = ALERT_VARIANT.DEFAULT,
  toastVariant = TOAST_VARIANT.DARK,
  title = '',
  subtitle = '',
  showInfoIcon = false,
  linkText = '',
  link = '',
  LinkElement = 'a',
  onClickClose = () => null,
}: DzBannerProps) => {
  const variantStyles = {
    [TYPES.MESSAGE]: (isText: boolean = false) =>
      isText ? styles.title?.[messageVariant] : styles?.[messageVariant],
    [TYPES.ALERT]: (isText: boolean = false) =>
      isText ? styles.title?.[alertVariation] : styles?.[alertVariation],
    [TYPES.TOAST]: (isText: boolean = false) =>
      isText ? styles.title?.[toastVariant] : styles?.[toastVariant],
  };

  const subVariantStyles = {
    [TYPES.MESSAGE]: (isText: boolean = false) =>
      isText ? styles.subtitle?.[messageVariant] : styles?.[messageVariant],
    [TYPES.ALERT]: (isText: boolean = false) =>
      isText ? styles.subtitle?.[alertVariation] : styles?.[alertVariation],
    [TYPES.TOAST]: (isText: boolean = false) =>
      isText ? styles.subtitle?.[toastVariant] : styles?.[toastVariant],
  };

  const hasLinkStyles = link && linkText ? styles.linkLayout : '';
  const titleToastContainer =
    type === TYPES.TOAST ? styles?.titleToastCont : '';

  const renderInfoIcon =
    type === TYPES.TOAST && showInfoIcon ? (
      <ExclamationCircle
        fill="white"
        width={14}
        height={14}
        viewBox="0 0 16 16"
        className={cn(styles.infoIcon)}
      />
    ) : null;

  const titleSection = title ? (
    <DzText
      className={cn(variantStyles[type](true), styles.title?.[type])}
      textSize={TEXT_SIZES.MEDIUM}
      textType={TEXT_TYPES.P}
      text={title}
      htmlFor={title}
    />
  ) : null;

  const subTitle =
    subtitle && (type === TYPES.MESSAGE || type === TYPES.TOAST) ? (
      <DzText
        className={cn(subVariantStyles[type](true), styles.subtitle?.[type])}
        textSize={TEXT_SIZES.SMALL}
        textType={TEXT_TYPES.P}
        text={subtitle}
      />
    ) : null;

  const closeIcon =
    type === TYPES.ALERT ? (
      <CloseIcon
        fill={alertVariation === ALERT_VARIANT.DEFAULT ? 'black' : 'white'}
        className={cn(styles.closeIcon)}
        onClick={onClickClose}
      />
    ) : null;

  const renderLink =
    type === TYPES.TOAST && linkText && link ? (
      <DzLink
        LinkElement={LinkElement}
        href={link}
        className={cn(styles.link?.[type])}
        variant={LINK_VARIANTS.TEXT}
      >
        {linkText}
      </DzLink>
    ) : null;
  return (
    <div
      className={cn(
        styles.bannerContainer,
        variantStyles[type](),
        styles?.container[type],
        hasLinkStyles
      )}
    >
      <div className={cn('flex', styles?.subContainer[type])}>
        {renderInfoIcon}
        <div
          className={cn(
            styles.textContainer,
            styles?.[type],
            titleToastContainer
          )}
        >
          {titleSection}
          {subTitle}
          {closeIcon}
        </div>
      </div>
      {renderLink}
    </div>
  );
};

export default DzBanner;
