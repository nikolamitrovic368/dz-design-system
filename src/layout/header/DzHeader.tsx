import React, { useMemo, useState } from 'react';
import { cn } from '../../utils/classnames';
import { DzLogo, DzLinkProps, RouterProps } from '../../atoms';
import { MenuItems } from './MenuItems';
import { MenuItemsMobile } from './MenuItemsMobile';
import { BREAKPOINTS } from '../../layout/breakpoints';
import useWindowSize from '../../hooks/useWindowSize';
import { FooterData } from '../footer/DzFooter';

type Page = {
  url: string;
};

type HeaderItem = {
  title: string;
  newTab?: boolean;
  desktopEnabled: boolean;
  mobileEnabled: boolean;
  _type: string;
  link?: string;
  submenu?: any;
  anchor?: string;
  page?: Page;
};

type MenuShape = {
  items: HeaderItem[];
};

export type DzHeaderProps = {
  menu: MenuShape;
  newsletterAction: Function;
  headerClass?: string;
  linkProps?: Omit<DzLinkProps, 'LinkElement'> | RouterProps;
  footerData: FooterData;
  LinkElement: any;
};

const HEADER_CONTAINER_Z_INDEX = 50;

const styles: any = {
  headerContainer: `
    relative
    flex
    w-full
    bg-white-100
    pl-5 pr-2.5 py-[0.3125rem] md:pt-4 md:pb-3
    items-center
    z-50
  `,
  leftSide: `
    w-fit
  `,
  rightSideDesktop: `
    hidden
    md:flex
    w-full
    items-center
    justify-end
  `,
  rightSideMobile: `
    md:hidden
    flex
    w-full
    items-center
    justify-end
  `,
  logoMenu: `
    cursor-pointer
  `,
  submenuContainer: `
    absolute
  `,
};

export const DzHeader = ({
  menu,
  newsletterAction = () => null,
  headerClass = '',
  linkProps,
  footerData,
  LinkElement = 'a',
}: DzHeaderProps) => {
  const { items = [] } = menu ?? {};
  const { width } = useWindowSize();
  const isSmall = useMemo(() => {
    return width <= BREAKPOINTS.MD;
  }, [width]);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const onMouseOver = () => setIsMouseOver(true);
  const onMouseLeave = () => setIsMouseOver(false);

  return (
    <header
      className={cn(styles.headerContainer, headerClass)}
      aria-label="Header"
      role="banner"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      style={isMouseOver ? { zIndex: HEADER_CONTAINER_Z_INDEX + 1 } : {}}
    >
      <div className={cn(styles.leftSide)}>
        <DzLogo LinkElement={LinkElement} />
      </div>
      {isSmall ? (
        <nav
          className={cn(styles.rightSideMobile)}
          aria-label="Navigation"
          role="navigation"
        >
          <MenuItemsMobile
            items={items}
            footerData={footerData}
            newsletterAction={newsletterAction}
            LinkElement={LinkElement}
          />
        </nav>
      ) : (
        <nav
          className={cn(styles.rightSideDesktop)}
          aria-label="Navigation"
          role="navigation"
        >
          <MenuItems
            items={items}
            linkProps={linkProps}
            LinkElement={LinkElement}
          />
        </nav>
      )}
    </header>
  );
};

export default DzHeader;
