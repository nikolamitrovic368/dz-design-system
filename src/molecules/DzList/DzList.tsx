import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import { DzLink, LINK_VARIANTS, TEXT_LINK_SIZES } from '../../atoms';
import { DzGridColumns, DzColumn, ColumnSpan } from '../../layout/DzGrid';
import { styles } from './styles';
import { cn } from '../../utils/classnames';
import { BREAKPOINTS } from '../../layout/breakpoints';
import useWindowSize from '../../hooks/useWindowSize';
import {
  getStartingChars,
  ascLastNameThenFirstName,
  groupItemsByColumn,
  alphabet,
} from './utils';
import useHover from '../../hooks/useHover';
import { DzListItem } from './types';

const DISABLE_SCROLL_SELECTION = true;

export type DzListProps = {
  numberOfCol?: number;
  list: DzListItem[];
  sort?: boolean;
  useFullAlphabet?: boolean;
  stickyOffset?: string;
  customSort?: (a: DzListItem, b: DzListItem) => number;
  LinkElement: any;
};

export const DzList = ({
  numberOfCol = 4,
  list,
  useFullAlphabet = true,
  sort = false,
  stickyOffset = '0px',
  customSort,
  LinkElement = 'a',
}: DzListProps) => {
  const keyOfFirstElement = useRef(1);
  const prevChar = useRef('');
  const [notMatchingLetters, setNotMatchingLetters] = useState<string[]>([]);

  const hoverRef = useRef<HTMLDivElement | null>(null);
  const isHover = useHover(hoverRef);

  const { width } = useWindowSize();
  const isMobile = useMemo(() => {
    return width <= BREAKPOINTS.MD;
  }, [width]);

  const alphabetItems = useMemo(() => {
    const startingChars = getStartingChars(list);
    if (useFullAlphabet) {
      const unavailableOptions = alphabet.filter(
        x => !startingChars.includes(x)
      );
      setNotMatchingLetters(unavailableOptions);
    }
    return useFullAlphabet ? alphabet : startingChars;
  }, [list, useFullAlphabet]);

  const [currentChar, setCurrentChar] = useState('A');

  const scrollToElement = useCallback(letter => {
    const element = document.getElementById(`${letter}-section-1`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const sortedList = useMemo(() => {
    const sortFunction = customSort ? customSort : ascLastNameThenFirstName;
    return sort ? list.sort(sortFunction) : list;
  }, [sort, list, customSort]);

  const spanCol = useMemo(() => 12 / numberOfCol, [numberOfCol]);

  const itemsByColumn = useMemo(() => {
    return groupItemsByColumn(sortedList);
  }, [sortedList]);

  useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver;
    if (!hasIOSupport) return;
    const elements = document.querySelectorAll(`[id$='-section-1']`);

    if (!elements.length) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const letter = entry.target.id
            .trim()
            .toUpperCase()
            .charAt(0);
          const isUpperValue =
            entry.intersectionRect.y < 200 && entry.intersectionRect.y > 0;

          if (isUpperValue) {
            setCurrentChar(letter);
          }
        });
      },
      {
        threshold: 1,
        rootMargin: '-120px 0px 0px 0px',
      }
    );

    if (!DISABLE_SCROLL_SELECTION) {
      elements.forEach(element => {
        observer.observe(element);
      });
    }

    return () => observer.disconnect();
  }, []);

  if (!itemsByColumn || !itemsByColumn.length) return null;

  return (
    <div className={cn(styles.menu)}>
      {isMobile && alphabetItems?.length ? (
        <ul style={{ top: stickyOffset }} className={cn(styles.menuList)}>
          {alphabetItems.map((letter, key) => {
            const optionStyle =
              currentChar === letter ? styles.activeItem : styles.defaultItem;
            return (
              <li key={`${letter}-option-${key}`}>
                <button
                  className={cn(
                    styles.listItem,
                    notMatchingLetters.includes(letter)
                      ? styles.disable
                      : optionStyle
                  )}
                  onClick={el => {
                    setCurrentChar(letter);

                    const element: any = el.target;
                    if (element) {
                      element.focus();
                    }
                    scrollToElement(letter);
                  }}
                >
                  {letter}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div ref={hoverRef} id="options-container">
        <DzGridColumns className="h-full w-full">
          {itemsByColumn.map((columnItems, i) => {
            return (
              <DzColumn key={`col-${i}`} span={spanCol as ColumnSpan}>
                <ul className={cn(styles.column)}>
                  {columnItems.map((item, k) => {
                    const { url, text, lastName } = item;
                    const currentChar = lastName
                      .trim()
                      .toUpperCase()
                      .charAt(0);
                    if (prevChar.current === currentChar) {
                      keyOfFirstElement.current = keyOfFirstElement.current + 1;
                    } else {
                      keyOfFirstElement.current = 1;
                    }
                    prevChar.current = currentChar;
                    return (
                      <li
                        style={{
                          scrollMarginTop: `calc(3.5rem + ${stickyOffset})`,
                        }}
                        className={cn(styles.listLink)}
                        key={`${text}-${k}`}
                        id={`${currentChar}-section-${keyOfFirstElement.current}`}
                      >
                        <DzLink
                          href={url}
                          variant={LINK_VARIANTS.NAV}
                          textLinkSize={
                            isMobile ? TEXT_LINK_SIZES.LG : TEXT_LINK_SIZES.MD
                          }
                          className={isHover ? styles.linkDesktop : ''}
                          LinkElement={LinkElement}
                        >
                          {text}
                        </DzLink>
                      </li>
                    );
                  })}
                </ul>
              </DzColumn>
            );
          })}
        </DzGridColumns>
      </div>
    </div>
  );
};

export default DzList;
