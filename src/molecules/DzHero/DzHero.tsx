import React, {
  Fragment,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Transition } from '@headlessui/react';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper';

import {
  DzMedia,
  DzMediaProps,
  DzText,
  DzTitle,
  DzTitleProps,
  TITLE_SIZES,
  TITLE_TYPES,
  DzLink,
  DzLinkProps,
  LINK_VARIANTS,
  TEXT_LINK_SIZES,
  TEXT_SIZES,
  ArrowDirection,
  ArrowMode,
} from '../../atoms';
import { DzArrow } from '../../atoms';
import { cn } from '../../utils/classnames';
import { SwiperContainer, SwiperSlide } from '../../vendor/swiper';
import useWindowSize from '../../hooks/useWindowSize';
import { BREAKPOINTS } from '../../layout/breakpoints';

register();

type LinkCTA = {
  text: string;
  url: string;
  linkProps?: Omit<DzLinkProps, 'LinkElement'>;
};

export type DzHeroItem = {
  media: Omit<DzMediaProps, 'LinkElement'>;
  hideMedia?: boolean;
  category?: string;
  title: string;
  subtitle?: string;
  secondaryTitle?: string;
  secondarySubtitle?: string;
  description?: ReactNode;
  portableTextDescription?: ReactNode;
  linkCTA?: LinkCTA;
};

export type DzHeroProps = {
  items: DzHeroItem[];
  onSlideChange?: Function;
  className?: string;
  primaryTitleProps?: Omit<DzTitleProps, 'title' | 'subtitle'>;
  LinkElement: any;
};

const styles: any = {
  heroContainer: `
    flex
    flex-col
  `,
  contentContainer: `
    w-full
    flex
    flex-col
    md:flex-row
  `,
  infoContainer: `
    w-full
    flex
    flex-col
    gap-2.5
    pt-5
    md:ml-0
    md:pl-0
    basis-2/3
  `,
  controlsContainer: `
    w-full
    flex
    p-5
    justify-end
    basis-1/3
  `,
  title: `
    text-xl
    md:text-xxl
  `,
  linkCta: `
    mt-2.5
    mb-[2.219rem]
    md:mt-[1.875rem]
    md:mb-0
  `,
  mediaImage: `
    w-full
  `,
  arrowsContainer: `
    flex
    gap-10
  `,
  contentWrapper: `
    flex
    flex-col
    gap-2.5
    md:gap-5
  `,
};

const MediaWrapper = ({ children, activeIndex, onSlideChanged }) => {
  const swiperElRef = useRef<HTMLInputElement & { swiper: Swiper }>(null);

  useEffect(() => {
    if (children.length > 1)
      swiperElRef.current?.swiper?.slideToLoop(activeIndex);

    swiperElRef?.current?.addEventListener('transitionend', () => {
      onSlideChanged(swiperElRef?.current?.swiper.activeIndex);
    });
  }, [activeIndex, children.length, onSlideChanged]);

  return children.length > 1 ? (
    <SwiperContainer
      ref={swiperElRef}
      slides-per-view={1}
      navigation="false"
      scrollbar="false"
      pagination="false"
      navigation-next-el="null"
      keyboard-enabled="false"
      simulate-touch="false"
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </SwiperContainer>
  ) : (
    <>{children[0]}</>
  );
};

const ContentWrapper = ({
  children,
  activeIndex,
  activeAnimation,
  onAnimationEnded,
}) =>
  children.length > 1 ? (
    <>
      {children.map((child, index) => (
        <Transition
          key={index}
          as={Fragment}
          show={index === activeIndex && index === activeAnimation}
          enter="ease-in-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => onAnimationEnded(activeIndex)}
        >
          {child}
        </Transition>
      ))}
    </>
  ) : (
    <>{children[0]}</>
  );

enum Actions {
  NEXT = 'next',
  PREV = 'previous',
}

export const DzHero = forwardRef<HTMLDivElement, DzHeroProps>(
  ({ items, className = '', primaryTitleProps, LinkElement = 'a' }, ref) => {
    const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
    const [activeAnimation, setActiveAnimation] = useState(0);
    const { width } = useWindowSize();
    const isSmall = useMemo(() => {
      return width <= BREAKPOINTS.MD;
    }, [width]);

    const handleChange = useCallback(
      (step: Actions) => {
        const offset = step === Actions.NEXT ? 1 : -1;
        setCurrentItemIndex(
          prev =>
            (((prev + offset) % items.length) + items.length) % items.length
        );
      },
      [setCurrentItemIndex, items]
    );

    return (
      <div className={cn(styles.heroContainer, className)} ref={ref}>
        <div className="relative overflow-hidden">
          <MediaWrapper
            activeIndex={currentItemIndex}
            onSlideChanged={index => {
              setCurrentItemIndex(index);
            }}
          >
            {items
              .filter(item => !item.hideMedia)
              .map(item => (
                <DzMedia
                  key={`${item?.media?.url}-${item.title}`}
                  imgClass={cn(styles.mediaImage)}
                  {...item.media}
                  LinkElement={LinkElement}
                />
              ))}
          </MediaWrapper>
        </div>

        <div className={cn(styles.contentContainer)}>
          <ContentWrapper
            activeIndex={currentItemIndex}
            activeAnimation={activeAnimation}
            onAnimationEnded={setActiveAnimation}
          >
            {items.map(item => (
              <div
                className={cn(styles.infoContainer)}
                key={`${item?.media?.url}-${item.title}`}
              >
                {item.category ? (
                  <DzText
                    className={cn(styles.category)}
                    text={item.category}
                  />
                ) : null}

                <div className={cn(styles.contentWrapper)}>
                  <DzTitle
                    title={item.title}
                    classNameTitle={cn(styles.title)}
                    classNameSubtitle={cn(styles.title)}
                    titleType={TITLE_TYPES.H3}
                    subtitle={item.subtitle}
                    subtitleType={TITLE_TYPES.H4}
                    {...primaryTitleProps}
                  />
                  {item.secondaryTitle || item.secondarySubtitle ? (
                    <DzTitle
                      title={item.secondaryTitle}
                      titleType={TITLE_TYPES.P}
                      titleSize={isSmall ? TITLE_SIZES.MD : TITLE_SIZES.LG}
                      subtitle={item.secondarySubtitle}
                      subtitleType={TITLE_TYPES.P}
                      subtitleSize={isSmall ? TITLE_SIZES.MD : TITLE_SIZES.LG}
                    />
                  ) : (
                    isSmall && <div />
                  )}
                  {item.description ? (
                    <DzText
                      className={cn(styles.description)}
                      text={item.description}
                      textSize={isSmall ? TEXT_SIZES.SMALL : TEXT_SIZES.MEDIUM}
                    />
                  ) : null}
                  {item.portableTextDescription
                    ? item.portableTextDescription
                    : null}
                </div>

                {item.linkCTA ? (
                  <div className={cn(styles.linkCta)}>
                    <DzLink
                      {...(item.linkCTA.linkProps ?? {})}
                      href={item.linkCTA.url}
                      textLinkSize={
                        isSmall ? TEXT_LINK_SIZES.XS : TEXT_LINK_SIZES.SM
                      }
                      variant={LINK_VARIANTS.TEXT}
                      LinkElement={LinkElement}
                    >
                      {item.linkCTA.text}
                    </DzLink>
                  </div>
                ) : null}
              </div>
            ))}
          </ContentWrapper>

          {items.length > 1 ? (
            <div className={cn(styles.controlsContainer)}>
              <div className={cn(styles.arrowsContainer)}>
                <DzArrow
                  onClick={() => handleChange(Actions.PREV)}
                  direction={ArrowDirection.LEFT}
                  mode={ArrowMode.OUTLINE}
                />
                <DzArrow
                  onClick={() => handleChange(Actions.NEXT)}
                  direction={ArrowDirection.RIGHT}
                  mode={ArrowMode.OUTLINE}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

export default DzHero;
