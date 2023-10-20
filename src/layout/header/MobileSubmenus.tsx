import React, { FC } from 'react';
import { cn } from '../../utils/classnames';
import ArrowDown from '../../svgIcons/arrowDown';
import { DzLink, DzLinkProps, RouterProps, TEXT_LINK_SIZES } from '../../atoms';
import { Disclosure } from '@headlessui/react';
import { renderItems } from './MenuItems';

interface MobileSubmenuProps {
  title: string;
  items: any[];
  rootUrl?: string;
  linkProps?: DzLinkProps | RouterProps;
}

const styles: any = {
  panelItems: `
    pl-[0.9375rem]
  `,
  caretIcon: `
    outline-none
    md:outline-transparent
  `,
  upArrow: `
    rotate-180
  `,
  rootLink: `
    w-full
    flex
    items-center
    content-center
  `,
  mobileOption: `
    pl-5
    pr-4
    py-[18px]
    flex
    justify-between
  `,
};

export const MobileSubmenus: FC<MobileSubmenuProps> = ({
  title = '',
  rootUrl = '',
  items = [],
  linkProps = {},
}) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className={cn(styles.mobileOption)}>
            <DzLink
              {...linkProps}
              className={cn(styles.rootLink)}
              textLinkSize={TEXT_LINK_SIZES.MD}
              href={rootUrl}
            >
              {title}
            </DzLink>
            <Disclosure.Button className={cn(styles.caretIcon)}>
              <ArrowDown
                className={cn(open ? styles.upArrow : '')}
                id={`${open ? 'close' : 'open'}-submenu-${title}`}
              />
            </Disclosure.Button>
          </div>
          <Disclosure.Panel className={cn(styles.panelItems)}>
            <ul>{renderItems(items, true)}</ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
