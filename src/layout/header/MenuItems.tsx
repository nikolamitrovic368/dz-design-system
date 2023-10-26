import React, { useMemo, useRef } from 'react';
import { DesktopSubmenu } from './DesktopSubmenus';
import { DzLink, DzLinkProps, RouterProps, TEXT_LINK_SIZES } from '../../atoms';
import { cn } from '../../utils/classnames';
import { MobileSubmenus } from './MobileSubmenus';
import useHover from '../../hooks/useHover';
import { BREAKPOINTS } from '../../layout/breakpoints';
import useWindowSize from '../../hooks/useWindowSize';

export type MenuItemsProps = {
  items: any[];
  isMobile?: boolean;
  linkProps?: DzLinkProps | RouterProps;
  LinkElement: any;
};

type PageLink = {
  url: string;
};

type MenuItemLink = {
  title: string;
  newTab: boolean;
  link: string;
};

type RootLink = {
  link: string;
  newTab: boolean;
};

type SubmenuItems = {
  items: any[];
};

type MenuItemPage = {
  title: string;
  newTab: boolean;
  anchor: string;
  page: PageLink;
};

type MenuItemSubmenu = {
  title: string;
  rootLink: RootLink;
  submenu: SubmenuItems;
};

const styles: any = {
  menuContainer: `
    md:flex
    w-fit
    items-center
    justify-end
    max-h-[1.25rem]
    [&>li>a]:!text-md
    [&>li>a]:!px-0
    [&>li]:!pl-[35px]
  `,
  menuContainerMobile: `
    mr-1
  `,
  submenuItemMobile: `
    px-5
    py-[18px]
    w-full
    block
    min-w-fit
    outline-transparent
  `,
  submenuItemDesktop: `
    w-full
    block
    min-w-fit
    outline-transparent
  `,
  verticalPadding: `
    py-[6px]
  `,
  narrow: `
    px-3
  `,
  wide: `
    px-5
  `,
};

export const renderPerType = {
  menuItemLink: (
    data: MenuItemLink,
    isMobile,
    linkProps,
    className,
    LinkElement
  ) => {
    const { title, newTab, link } = data ?? {};

    return (
      <DzLink
        {...linkProps}
        href={link}
        openNewTab={newTab}
        className={className}
        textLinkSize={isMobile ? TEXT_LINK_SIZES.MD : TEXT_LINK_SIZES.SM}
        LinkElement={LinkElement}
      >
        {title}
      </DzLink>
    );
  },
  menuItemSubmenu: (
    data: MenuItemSubmenu,
    isMobile: boolean,
    linkProps,
    className,
    LinkElement
  ) => {
    const { title, submenu } = data ?? {};

    const rootLink = data?.rootLink?.[0] ?? {};
    const { _type, link, newTab, page } = rootLink;
    const rootURL = _type === 'menuItemPage' ? page?.url : link;
    const openNewTab = newTab;
    const { items } = submenu ?? {};
    const linkPropsEnrich = { ...linkProps, openNewTab };

    return isMobile ? (
      <MobileSubmenus
        title={title}
        rootUrl={rootURL}
        items={items}
        linkProps={linkPropsEnrich}
        LinkElement={LinkElement}
      />
    ) : (
      <DesktopSubmenu
        title={title}
        rootUrl={rootURL}
        items={items}
        linkProps={linkPropsEnrich}
        linkClass={className}
        LinkElement={LinkElement}
      />
    );
  },
  menuItemPage: (
    data: MenuItemPage,
    isMobile,
    linkProps,
    className,
    LinkElement
  ) => {
    const { title, newTab, anchor, page } = data ?? {};
    const { url = '' } = page ?? {};
    const urlWithAnchor = anchor ? `${url}#${anchor}` : url;

    return (
      <DzLink
        {...linkProps}
        href={urlWithAnchor}
        openNewTab={newTab}
        className={className}
        textLinkSize={isMobile ? TEXT_LINK_SIZES.MD : TEXT_LINK_SIZES.SM}
        LinkElement={LinkElement}
      >
        {title}
      </DzLink>
    );
  },
};

export const renderItems = (
  items,
  isMobile = false,
  linkProps = {},
  isNested = false,
  LinkElement: any
) => {
  // eslint-disable-next-line
  const { width } = useWindowSize();
  // eslint-disable-next-line
  const paddingClasses = useMemo(
    () => (width > BREAKPOINTS.MD && width < 900 ? styles.narrow : styles.wide),
    [width]
  );
  const verticalPadding = isNested ? styles.verticalPadding : '';
  const itemListClass = isMobile
    ? styles.submenuItemMobile
    : cn(styles.submenuItemDesktop, verticalPadding, paddingClasses);

  return items?.map(item => {
    const { _type, title } = item ?? {};
    const renderFunction = renderPerType?.[_type];
    const listItemStyles = _type === 'menuItemSubmenu' ? '' : itemListClass;

    const { mobileEnabled, desktopEnabled } = item;
    if (isMobile && !mobileEnabled) return null;
    if (!isMobile && !desktopEnabled) return null;

    return renderFunction ? (
      <li
        className="relative"
        key={`${isMobile ? 'mbl' : 'dsk'}-${title}-link-item`}
      >
        {renderFunction(item, isMobile, linkProps, listItemStyles, LinkElement)}
      </li>
    ) : null;
  });
};

export const MenuItems = ({
  items = [],
  isMobile = false,
  linkProps = {},
  LinkElement,
}: MenuItemsProps) => {
  const desktopItems = useRef<HTMLUListElement | null>(null);
  const isHoverRoot = useHover(desktopItems);
  const linkPropsMenu = useMemo(() => (isHoverRoot ? linkProps : {}), [
    isHoverRoot,
    linkProps,
  ]);
  if (!items) return null;
  return (
    <ul
      ref={desktopItems}
      className={cn(
        isMobile ? styles.menuContainerMobile : styles.menuContainer
      )}
    >
      {renderItems(items, isMobile, linkPropsMenu, undefined, LinkElement)}
    </ul>
  );
};

export default MenuItems;
