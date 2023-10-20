import React, {
  FC,
  Fragment,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { Popover } from '@headlessui/react';

import { cn } from '../../utils/classnames';
import { DzLink, DzLinkProps, RouterProps } from '../../atoms';
import { renderItems } from './MenuItems';
import { BREAKPOINTS } from '../../layout/breakpoints';
import useWindowSize from '../../hooks/useWindowSize';

export interface DesktopSubmenuProps {
  title: string;
  items: any[];
  rootUrl?: string;
  linkProps?: DzLinkProps | RouterProps;
  linkClass?: string;
}

const styles: any = {
  headerContainer: `
    flex
    w-full
    bg-white-100
    p-5
    items-center
    z-50
  `,
  logo: `
    pl-2.5
    h-5
  `,
  leftSide: `
    w-fit
  `,
  rightSide: `
    flex
    w-full
    gap-10
    items-center
    justify-end
  `,
  childMenus: `
    bg-white-100
    flex
    flex-col
    py-[0.875rem]
    z-30
    min-w-[10.3164rem]
    absolute
    left-[15px]
  `,
  rootDesktop: `
    cursor-pointer
    w-full
    block
    relative
    z-40
  `,
  show: `
    block
  `,
  hide: `
    hidden
  `,
  narrow: `
    px-3
  `,
  wide: `
    px-5
  `,
};

export const DesktopSubmenu: FC<DesktopSubmenuProps> = ({
  title = '',
  rootUrl = '',
  items = [],
  linkProps = {},
  linkClass = '',
}) => {
  const [hoverOverMenu, SetHoverOverMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [isHoverRoot, setIsHoverRoot] = useState(false);
  const [isFocusRoot, setIsFocusRoot] = useState(false);
  const [visitedFocusElements, setVisitedFocusElements] = useState(0);

  const { width } = useWindowSize();
  const paddingClasses = useMemo(
    () => (width > BREAKPOINTS.MD && width < 900 ? styles.narrow : styles.wide),
    [width]
  );

  useEffect(() => {
    const closeMenu = visitedFocusElements === items?.length;
    if (closeMenu) setOpenSubMenu(false);
  }, [visitedFocusElements, items]);

  const showElements = useMemo(() => {
    const hasChildSelected = visitedFocusElements === items?.length;
    return (isHoverRoot || hoverOverMenu || openSubMenu) && !hasChildSelected;
  }, [isHoverRoot, hoverOverMenu, visitedFocusElements, openSubMenu, items]);

  const showClasses = useMemo(
    () => (showElements ? styles.show : styles.hide),
    [showElements]
  );
  const linkPropsHover = useMemo(() => (hoverOverMenu ? linkProps : {}), [
    hoverOverMenu,
    linkProps,
  ]);

  const handleClick = useCallback(
    e => {
      const url = e?.target?.href;
      if (!url) return false;
      const props = linkProps as DzLinkProps;
      if (linkProps && props.openNewTab) {
        window.open(url, '_blank');
      } else {
        window.location = e?.target?.href;
      }
      return false;
    },
    [linkProps]
  );

  const resetVisibleFocus = useCallback(() => {
    setVisitedFocusElements(0);
  }, []);

  const handleUserKeyPress = useCallback(
    event => {
      const { key, keyCode } = event;
      if (!(keyCode === 13 && key === 'Enter')) return false;
      if (isFocusRoot && openSubMenu) {
        handleClick(event);
      }
      if (isFocusRoot) {
        setOpenSubMenu(true);
      }
    },
    [handleClick, isFocusRoot, openSubMenu]
  );

  return (
    <Popover as={Fragment}>
      <Popover.Button as={Fragment}>
        <DzLink
          {...linkProps}
          href={rootUrl}
          onKeyDown={handleUserKeyPress}
          onFocus={() => {
            setIsFocusRoot(true);
            resetVisibleFocus();
          }}
          onBlur={() => setIsFocusRoot(false)}
          onClick={handleClick}
          onMouseEnter={() => {
            setIsHoverRoot(true);
            resetVisibleFocus();
          }}
          onMouseLeave={() => {
            setIsHoverRoot(false);
          }}
          className={cn(
            showElements ? '!text-black-100' : '',
            styles.rootDesktop,
            linkClass,
            'outline-transparent',
            paddingClasses
          )}
        >
          {title}
        </DzLink>
      </Popover.Button>
      <Popover.Panel
        as="ul"
        static
        className={cn(styles.childMenus, showClasses)}
        onMouseEnter={() => SetHoverOverMenu(true)}
        onMouseLeave={() => SetHoverOverMenu(false)}
        onBlur={() => setVisitedFocusElements(element => element + 1)}
      >
        {renderItems(items, false, linkPropsHover, true)}
      </Popover.Panel>
    </Popover>
  );
};
