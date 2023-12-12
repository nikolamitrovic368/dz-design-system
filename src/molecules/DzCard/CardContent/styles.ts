import { CardViewport } from '../types';

export const globalStyles = {
  cardContainer: `
      w-full
      flex
      flex-col
      gap-5      
    `,
  infoContainer: `
      flex
      flex-col
      gap-2.5
    `,
  secondaryTitle: `
      whitespace-pre-wrap
    `,
  secondaryLocationTitle: `
    !text-black-100
    mt-2.5
  `,
  description: `
      whitespace-pre-wrap
    `,
  contentWrapper: `
      flex
      flex-col
    `,
  mediaZoom: `
    md:hover:scale-[1.03]
    ease-in duration-300
  `,
  mediaLinkZoom: `
    md:scale-[1.03]
    ease-in duration-300
  `,
  linkCardHover: `
    decoration-current
  `,
  titleHoverStyle: `
    decoration-black-60
    text-black-100
    underline
  `,
  podcast: `
    !rounded-none
    bg-blue-80
  `,
};

export const stylesSizes: any = {
  [CardViewport.Carousel]: {
    '12col': {
      title: `
          text-lg
        `,
      secondaryTitle: `
          text-md
        `,
      description: `
          text-sm
        `,
      btnCta: `
          text-md
        `,
      slugText: `
          text-xs
        `,
      contentWrapper: `
          gap-2.5
        `,
      linkCta: `
          mt-2.5
        `,
      mediaZoom: `
        md:hover:scale-100
      `,
    },
    '10col': {
      title: `
          text-lg
        `,
      secondaryTitle: `
          text-md
        `,
      description: `
          text-sm
        `,
      btnCta: `
          text-md
        `,
      slugText: `
          text-xs
        `,
      contentWrapper: `
          gap-2.5
        `,
      linkCta: `
          mt-2.5
        `,
    },
    '6col': {
      title: `
        md:text-xl
        text-lg
      `,
      secondaryTitle: `
        text-md
      `,
      description: `
        text-sm
      `,
      btnCta: `
        text-md
      `,
      slugText: `
        text-xs
      `,
      contentWrapper: `
        gap-2.5
      `,
      linkCta: `
        mt-2.5
      `,
    },
    '4col': {
      title: `
        text-lg
      `,
      secondaryTitle: `
        text-md
      `,
      description: `
        text-sm
      `,
      btnCta: `
        text-md
      `,
      slugText: `
        text-xs
      `,
      contentWrapper: `
        gap-2.5
      `,
      linkCta: `
        mt-2.5
      `,
    },
    '3col': {
      title: `
        text-lg
      `,
      secondaryTitle: `
        text-md
      `,
      description: `
        text-sm
      `,
      btnCta: `
        text-md
      `,
      slugText: `
        text-xs
      `,
      contentWrapper: `
        gap-2.5
      `,
      linkCta: `
        mt-2.5
      `,
    },
    '2col': {
      title: `
        text-md
      `,
      secondaryTitle: `
        text-sm
      `,
      description: `
        text-sm
      `,
      btnCta: `
        text-xs
      `,
      slugText: `
        text-xs
      `,
      contentWrapper: `
        gap-2.5
      `,
      linkCta: `
        mt-2.5
      `,
    },
  },
  [CardViewport.Desktop]: {
    '12col': {
      title: `
          md:text-xxl
          text-lg
        `,
      secondaryTitle: `
          md:text-lg
          text-md
        `,
      description: `
          md:text-md
          text-sm
        `,
      btnCta: `
          md:text-sm
          text-xs
        `,
      slugText: `
          md:text-sm
          text-xs
        `,
      contentWrapper: `
          md:gap-5
          gap-2.5
        `,
      linkCta: `
          mt-2.5
          md:mt-[1.875rem]
        `,
      mediaZoom: `
        md:hover:scale-100
      `,
      podcast: `
        min-h-[18.75rem]
        rounded-none
      `,
    },
    '10col': {
      title: `
          md:text-xxl
          text-lg
        `,
      secondaryTitle: `
          md:text-lg
          !text-md
        `,
      description: `
          md:text-md
          text-sm
        `,
      btnCta: `
          md:text-sm
          text-xs
        `,
      slugText: `
          md:text-sm
          text-xs
        `,
      contentWrapper: `
          md:gap-5
          gap-2.5
        `,
      linkCta: `
          mt-2.5
          md:mt-[1.875rem]
        `,
      podcast: `
        min-h-[18.75rem]
      `,
    },
    '6col': {
      title: `
          md:text-xl
          text-lg
        `,
      secondaryTitle: `
          md:text-lg
          !text-md
        `,
      description: `
          md:text-md
          text-sm
        `,
      btnCta: `
          md:text-sm
          text-xs
        `,
      slugText: `
          md:text-sm
          text-xs
        `,
      contentWrapper: `
          md:gap-5
          gap-2.5
        `,
      linkCta: `
          mt-2.5
          md:mt-[1.875rem]
        `,
      podcast: `
        min-h-[18.75rem]
      `,
    },
    '4col': {
      title: `
          text-lg 
        `,
      secondaryTitle: `
          text-md 
        `,
      description: `
          md:text-md
          text-sm
        `,
      btnCta: `
          md:text-sm
          text-xs
        `,
      slugText: `
          md:text-sm
          text-xs
        `,
      contentWrapper: `
          gap-2.5
        `,
      linkCta: `
          mt-2.5
        `,
      podcast: `
        min-h-[15.9375rem]
      `,
    },
    '3col': {
      title: `
          text-lg
        `,
      secondaryTitle: `
          !text-md
        `,
      description: `
          text-sm
        `,
      btnCta: `
          md:text-sm
          text-xs
        `,
      slugText: `
          md:text-sm
          text-xs
        `,
      contentWrapper: `
          gap-2.5
        `,
      linkCta: `
          mt-2.5
        `,
      podcast: `
        min-h-[12.5rem]
      `,
    },
    '2col': {
      title: `
        text-md
        `,
      secondaryTitle: `
        !text-sm
        `,
      description: `
          text-sm
        `,
      btnCta: `
          text-xs
        `,
      slugText: `
          text-xs
        `,
      contentWrapper: `
          gap-2.5
        `,
      linkCta: `
          mt-2.5
        `,
      podcast: `
        min-h-[12.5rem]
      `,
    },
  },
};
