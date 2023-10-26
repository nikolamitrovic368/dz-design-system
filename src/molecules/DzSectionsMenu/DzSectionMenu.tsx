import React, { FC, useMemo, useState, useCallback } from 'react';
import { cn } from '../../utils/classnames';
import { DzSectionMenuProps, SectionNavItem } from './types';
import { styles } from './styles';
import { DzButton, DzLink } from '../../atoms';
import { scrollToElementId, slugify } from '../../utils/misc';
import useScrollDirection, {
  ScrollDirection,
} from '../../hooks/useScrollDirection';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';

const HEADER_OFFSET = 120;

export const DzSectionMenu: FC<DzSectionMenuProps> = ({
  sections,
  cta,
  onSelection,
  prefix,
  usePrefix = false,
  sticky = false,
  useLinks = false,
  linksProps = {},
  className,
}) => {
  const [direction] = useScrollDirection();
  const [isHover, setIsHover] = useState(false);
  const [activeEl, setActiveEl] = useState(null);
  const [menuSections, setMenuSections] = useState<SectionNavItem[]>(
    sections ?? []
  );

  const scrollToElement = useCallback(
    id => {
      scrollToElementId(id, sticky ? HEADER_OFFSET : 0);
    },
    [sticky]
  );

  const handleSelection = useCallback(
    (id, value) => {
      setActiveEl(id);

      if (onSelection) onSelection(id);
      if (usePrefix) scrollToElement(`${prefix}${id}`);
      if (window && !useLinks)
        window.history.pushState('', value, `#${prefix}${id}`);
    },
    [onSelection, prefix, scrollToElement, usePrefix, useLinks]
  );

  const scrollStickyTopStyle = useMemo(() => {
    if (!direction) return '';
    return direction === ScrollDirection.UP ? styles.mblStickyUp : '';
  }, [direction]);

  useIsomorphicLayoutEffect(() => {
    if (!usePrefix || !prefix) return;
    const elements = document.querySelectorAll(`[id^='${prefix}']`);
    if (!elements?.length) return;
    const foundSections: SectionNavItem[] = [];
    elements.forEach(element => {
      const elementId = element.id.replace(prefix, '');
      const name = elementId.replace(/-/g, ' ');
      foundSections.push({ text: name, id: elementId });
    });
    if (foundSections.length) {
      setMenuSections(foundSections);
    }
  }, [usePrefix, prefix]);

  return (
    <div
      className={cn(
        styles.sectionsContainer,
        sticky ? cn(styles.sticky, scrollStickyTopStyle) : '',
        className || ''
      )}
    >
      <div className={cn(styles.listWrapper)}>
        <ul
          className={cn(styles.listDesktop)}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onMouseUp={() => setIsHover(false)}
        >
          {menuSections
            ?.filter(i => !i.hidden)
            ?.map(section => {
              const { text, id, url } = section;
              return (
                <li
                  key={`submenu-item-${id ?? slugify(text)}`}
                  className={cn(
                    styles.listItem,
                    isHover ? styles.grayLink : '',
                    activeEl === id || activeEl === null
                      ? styles.activeLink
                      : styles.grayLink
                  )}
                  onClick={() => handleSelection(id, text)}
                >
                  {useLinks && url ? (
                    <DzLink {...linksProps} href={url}>
                      {text}
                    </DzLink>
                  ) : (
                    text
                  )}
                </li>
              );
            })}
        </ul>
      </div>

      {cta ? (
        <>
          <hr className={cn(styles.divider)} style={{ width: '0.0625rem' }} />
          <DzButton
            className={cn(styles.inquireBtn)}
            {...(cta?.ctaProps ?? {})}
          >
            {cta?.text}
          </DzButton>
        </>
      ) : null}
    </div>
  );
};

export default DzSectionMenu;
