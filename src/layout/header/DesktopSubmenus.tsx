import React, {
  Fragment,
  useState,
  useMemo,
  useCallback,
  useEffect,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithChildren,
  LegacyRef,
} from 'react';
import { Popover } from '@headlessui/react';

import { cn } from '../../utils/classnames';
import { DzLink, DzLinkProps, RouterProps, TEXT_LINK_SIZES } from '../../atoms';
import { renderItems } from './MenuItems';
import { BREAKPOINTS } from '../../layout/breakpoints';
import useWindowSize from '../../hooks/useWindowSize';

type DesktopSubmenuProps = {
  title: string;
  items: any[];
  rootUrl?: string;
  linkProps?: Omit<DzLinkProps, 'LinkElement'> | RouterProps;
  linkClass?: string;
  LinkElement: any;
  isMainTree?: boolean;
};

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
    z-[51]
    min-w-[10.3164rem]
    absolute
    
  `,
  childMenusNarrowLeft: `
    left-[1.09375rem]
  `,
  childMenusWideLeft: `
    left-[0.546875rem]
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
    px-2.5
  `,
  wide: `
    px-5
  `,
};

const linkHolderComponent: ForwardRefExoticComponent<PropsWithChildren> = forwardRef(
  ({ children }, ref) => (
    <div tabIndex={0} ref={ref as LegacyRef<HTMLDivElement>}>
      {children}
    </div>
  )
);

export const DesktopSubmenu = ({
  title = '',
  rootUrl = '',
  items = [],
  linkProps = {},
  linkClass = '',
  LinkElement = 'a',
  isMainTree = false,
}: DesktopSubmenuProps) => {
  const [hoverOverMenu, setHoverOverMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [isHoverRoot, setIsHoverRoot] = useState(false);
  const [isFocusRoot, setIsFocusRoot] = useState(false);
  const [visitedFocusElements, setVisitedFocusElements] = useState(0);

  const { width } = useWindowSize();
  const leftClasses = useMemo(
    () =>
      width > BREAKPOINTS.MD && width < 900
        ? styles.childMenusWideLeft
        : styles.childMenusNarrowLeft,
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

  const resetVisibleFocus = useCallback(() => {
    setVisitedFocusElements(0);
  }, []);

  const handleUserKeyPress = useCallback(
    event => {
      const { key, keyCode } = event;
      const isEnterPressed = keyCode === 13 && key === 'Enter';
      if (!isEnterPressed) return false;

      if (isFocusRoot) {
        setOpenSubMenu(false);
      }
    },
    [isFocusRoot]
  );

  return (
    <Popover as={Fragment}>
      <Popover.Button as={linkHolderComponent}>
        <DzLink
          {...linkProps}
          href={rootUrl}
          onKeyDown={handleUserKeyPress}
          onFocus={() => {
            setOpenSubMenu(true);
            setIsFocusRoot(true);
            resetVisibleFocus();
          }}
          onBlur={() => setIsFocusRoot(false)}
          onMouseEnter={() => {
            setIsHoverRoot(true);
            resetVisibleFocus();
          }}
          onMouseLeave={() => {
            setIsHoverRoot(false);
            setOpenSubMenu(false);
          }}
          className={cn(
            showElements ? '!text-black-100' : '',
            styles.rootDesktop,
            linkClass,
            'outline-transparent'
          )}
          LinkElement={LinkElement}
          textLinkSize={isMainTree ? TEXT_LINK_SIZES.MD : TEXT_LINK_SIZES.SM}
        >
          {title}
        </DzLink>
      </Popover.Button>
      <Popover.Panel
        as="ul"
        static
        focus
        className={cn(styles.childMenus, leftClasses, showClasses)}
        onMouseEnter={() => setHoverOverMenu(true)}
        onMouseLeave={() => {
          setOpenSubMenu(false);
          setHoverOverMenu(false);
        }}
        onBlur={() => setVisitedFocusElements(element => element + 1)}
      >
        {renderItems({
          items,
          linkProps: linkPropsHover,
          isNested: true,
          LinkElement,
        })}
      </Popover.Panel>
    </Popover>
  );
};
