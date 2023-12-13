import React, { MouseEvent } from 'react';
import { cn } from '../utils/classnames';
import {
  ComponentPropsWithRef,
  forwardRef,
  ReactNode,
  ForwardRefExoticComponent,
} from 'react';
import { styles as btnStyles } from './DzButton';

const internalLinkFlags = [
  '.davidzwirner.com',
  '.zwirner.dev',
  '.zwirner.tech',
];

export const LINK_VARIANTS = {
  NAV: 'nav',
  TEXT: 'text',
  BUTTON: 'button',
};

export const TEXT_LINK_SIZES = {
  XS: 'extraSmall',
  SM: 'small',
  MD: 'medium',
  LG: 'large',
  XL: 'extraLarge',
};

export const TEXT_LINK_SIZES_NAMES = [
  TEXT_LINK_SIZES.XS,
  TEXT_LINK_SIZES.SM,
  TEXT_LINK_SIZES.MD,
  TEXT_LINK_SIZES.LG,
  TEXT_LINK_SIZES.XL,
] as const;

export const LINK_VARIANTS_NAMES = [
  LINK_VARIANTS.NAV,
  LINK_VARIANTS.TEXT,
  LINK_VARIANTS.BUTTON,
] as const;
export type TextLinkSize = typeof TEXT_LINK_SIZES_NAMES[number];
export type LinkVariants = typeof LINK_VARIANTS_NAMES[number];

export type DzLinkProps = {
  href: string;
  children: ReactNode | string;
  variant?: LinkVariants;
  openNewTab?: boolean;
  useRoute?: boolean;
  router?: any;
  className?: string;
  LinkElement: any;
  linkProps?: any;
  textLinkSize?: TextLinkSize;
  withoutStyle?: boolean;
  onMouseEnter?: (event: MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLAnchorElement>) => void;
} & ComponentPropsWithRef<'a'>;

export type RouterProps = {
  useRoute?: boolean;
  router?: any;
};

const styles: any = {
  element: `
    transition-text-decoration
    duration-300
    ease-in
    underline-offset-[0.375rem]
    decoration-1
  `,
  nav: `
    decoration-transparent
    hover:underline
    hover:decoration-current
    focus:underline
    focus:decoration-current
    decoration-black-60 
  `,
  button: btnStyles.primary_dark,
  text: `
    underline
    decoration-black-40 
    hover:decoration-black-60
    focus:decoration-black-60
  `,
  inactive: `
    text-black-60
    hover:text-black-100
    focus:text-black-60
  `,
  extraSmall: `
    text-xs
  `,
  small: `
    text-sm
  `,
  medium: `
    text-md
  `,
  large: `
    text-lg
    underline-offset-8
  `,
  extraLarge: `
    text-xl
    underline-offset-[35%]
  `,
};

export const DzLink: ForwardRefExoticComponent<DzLinkProps> = forwardRef(
  (
    {
      children,
      href: hrefFromProps,
      openNewTab = false,
      className = '',
      linkProps,
      variant = LINK_VARIANTS.NAV,
      router,
      useRoute,
      LinkElement = 'a',
      textLinkSize = TEXT_LINK_SIZES.SM,
      withoutStyle = false,
      onMouseLeave,
      onMouseEnter,
      ...rest
    },
    ref
  ) => {
    const href = hrefFromProps || '/404';
    const isActive = router?.asPath === href;
    const inactiveStyle = !isActive ? styles.inactive : '';
    const localFlagThatHrefIncludes = internalLinkFlags.find(flag =>
      href.includes(flag)
    );
    const isExternalLink =
      href.startsWith('http') && !localFlagThatHrefIncludes;
    const parsedHref = localFlagThatHrefIncludes
      ? href.split(localFlagThatHrefIncludes).at(1) ?? '/'
      : href;

    const linkStyle = !withoutStyle
      ? cn(
          styles.element,
          styles[variant],
          styles[textLinkSize],
          useRoute ? inactiveStyle : '',
          className
        )
      : '';

    // Usage for links-in-cards
    if (LinkElement === 'span') {
      return (
        <span ref={ref} className={linkStyle}>
          {children}
        </span>
      );
    }

    // Usage for external links
    if (isExternalLink || LinkElement === 'a') {
      return (
        <a
          ref={ref}
          target={openNewTab ? '_blank' : '_self'}
          rel="noopener noreferrer"
          href={href}
          {...rest}
          className={linkStyle}
        >
          {children}
        </a>
      );
    }

    // Usage for Next.js Link
    return (
      <LinkElement
        href={parsedHref}
        target={openNewTab ? '_blank' : '_self'}
        rel="noopener noreferrer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
        className={linkStyle}
        {...rest}
        {...linkProps}
      >
        {children}
      </LinkElement>
    );
  }
);

DzLink.displayName = 'DzLink';

export default DzLink;
