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
  linkProps?: Omit<DzLinkProps, 'LinkElement'> | RouterProps;
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
    py-[1.125rem]
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
    py-[0.375rem]
  `,
  narrow: `
    px-3
  `,
  wide: `
    px-5
  `,
};

type RenderPerTypeCbArgs<T> = {
  data: T;
  isMobile: boolean;
  linkProps: Omit<DzLinkProps, 'LinkElement'> | RouterProps;
  className: string;
  LinkElement: any;
};

const renderPerType = {
  menuItemLink: ({
    data,
    isMobile,
    linkProps,
    className,
    LinkElement,
  }: RenderPerTypeCbArgs<MenuItemLink>) => {
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
  menuItemSubmenu: ({
    data,
    isMobile,
    linkProps,
    className,
    LinkElement,
  }: RenderPerTypeCbArgs<MenuItemSubmenu>) => {
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
  menuItemPage: ({
    data,
    isMobile,
    linkProps,
    className,
    LinkElement,
  }: RenderPerTypeCbArgs<MenuItemPage>) => {
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

export const renderItems = ({
  items,
  isMobile = false,
  linkProps = {},
  isNested = false,
  LinkElement = 'a',
}) => {
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
    const renderFunction = renderPerType[
      _type
    ] as typeof renderPerType[keyof typeof renderPerType];
    const listItemStyles = _type === 'menuItemSubmenu' ? '' : itemListClass;

    const { mobileEnabled, desktopEnabled } = item;
    if (isMobile && !mobileEnabled) return null;
    if (!isMobile && !desktopEnabled) return null;

    return renderFunction ? (
      <li
        className="relative"
        key={`${isMobile ? 'mbl' : 'dsk'}-${title}-link-item`}
      >
        {renderFunction({
          data: item,
          isMobile,
          linkProps,
          className: listItemStyles,
          LinkElement,
        })}
      </li>
    ) : null;
  });
};

export const MenuItems = ({
  items = [],
  isMobile = false,
  linkProps = {},
  LinkElement = 'a',
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
      {renderItems({ items, isMobile, linkProps: linkPropsMenu, LinkElement })}
    </ul>
  );
};

export default MenuItems;
