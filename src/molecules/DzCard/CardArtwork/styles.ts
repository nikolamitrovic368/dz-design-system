import { CardViewport } from '../types';

export const globalStyles: any = {
  artwork: {
    infoContainer: `
      flex-col
      md:flex-row
      flex
      justify-between
      gap-5
      md:gap-10
    `,
    leftPanel: `
      flex
      flex-col
      flex-1
      gap-2.5
    `,
    rightPanel: `
      flex
      flex-col
      gap-5
      md:min-w-[13.563rem]
    `,
    artistName: `
      text-sm
    `,
    artWorkTitle: `
      text-sm
      italic
    `,
    artworkYear: `
      text-sm
    `,
    priceTitle: `
      text-sm
    `,
    tombstoneText: `
      text-sm
      text-black-60
      whitespace-pre-wrap
    `,
  },
  mediaImg: `
    bg-black-20
  `,
  mediaZoom: `
    md:hover:scale-[1.03]
    ease-in duration-300
  `,
  cardContainer: `
    @container/cardContainer
    w-full
    flex
    flex-col
    gap-2.5
  `,
};

export const stylesSizes: any = {
  [CardViewport.Carousel]: {
    '12col': {
      cardContainer: `
        gap-5
      `,
      artwork: {
        infoContainer: `
          md:flex-col
          justify-between
          gap-5
          md:gap-5
        `,
        artistName: `
          text-sm
        `,
        artWorkTitle: `
          text-sm
        `,
        artworkYear: `
          text-sm
        `,
        priceTitle: `
          text-sm
        `,
      },
      buttons: `
        py-[0.8125rem]
        px-[1.5625rem]
        md:py-[0.8125rem]
        md:px-[1.5625rem]
      `,
    },
    '10col': {
      cardContainer: `
        gap-5
      `,
      infoContainer: `
        md:flex-col
        justify-between
        gap-5
        md:gap-5
      `,
      artwork: {
        artistName: `
          text-sm
        `,
        artWorkTitle: `
          text-sm
        `,
        artworkYear: `
          text-sm
        `,
        priceTitle: `
          text-sm
        `,
      },
      buttons: `
        md:py-[0.8125rem]
        md:px-[1.5625rem]
      `,
    },
    '6col': {
      cardContainer: `
        gap-5
      `,
      artwork: {
        infoContainer: `
          md:flex-col
          justify-between
          gap-5
          md:gap-5
        `,
        artistName: `
          text-sm
        `,
        artWorkTitle: `
          text-sm
        `,
        artworkYear: `
          text-sm
        `,
        priceTitle: `
          text-sm
        `,
      },
      buttons: `
        md:py-[0.8125rem]
        md:px-[1.5625rem]
      `,
    },
    '4col': {
      cardContainer: `
        gap-5
      `,
      artwork: {
        infoContainer: `
          md:flex-col
          justify-between
          gap-5
          md:gap-5
        `,
        artistName: `
          text-sm
        `,
        artWorkTitle: `
          text-sm
        `,
        artworkYear: `
          text-sm
        `,
        priceTitle: `
          text-sm
        `,
      },
      buttons: `
        md:py-[0.8125rem]
        md:px-[1.5625rem]
      `,
    },
    '3col': {
      cardContainer: `
        gap-5
      `,
      artwork: {
        infoContainer: `
          md:flex-col
          justify-between
          gap-5
          md:gap-5
        `,
        artistName: `
          text-sm
        `,
        artWorkTitle: `
          text-sm
        `,
        artworkYear: `
          text-sm
        `,
        priceTitle: `
          text-sm
        `,
      },
      buttons: `
        md:py-[0.8125rem]
        md:px-[1.5625rem]
      `,
    },
    '2col': {
      cardContainer: `
        gap-5
      `,
      artwork: {
        infoContainer: `
          md:flex-col
          justify-between
          gap-5
          md:gap-5
        `,
        artistName: `
          text-sm
        `,
        artWorkTitle: `
          text-sm
        `,
        artworkYear: `
          text-sm
        `,
        priceTitle: `
          text-sm
        `,
      },
      buttons: `
        md:py-[0.3125rem]
        md:px-[1.5625rem]
      `,
    },
  },
  [CardViewport.Desktop]: {
    '12col': {
      artwork: {
        artistName: `
          md:text-md 
        `,
        artWorkTitle: `
          md:text-md 
        `,
        artworkYear: `
          md:text-md 
        `,
        priceTitle: `
          md:text-md 
        `,
      },
      mediaZoom: `
        md:hover:scale-100
      `,
      cardContainer: `
        md:gap-5 
      `,
      buttons: `
        py-[0.8125rem]
        px-[1.5625rem]
        md:py-[0.8125rem]
        md:px-[1.5625rem]
      `,
    },
    '10col': {
      artwork: {
        artistName: `
          text-sm
          md:text-md
        `,
        artWorkTitle: `
          text-sm
          md:text-md
        `,
        artworkYear: `
          text-sm
          md:text-md
        `,
        priceTitle: `
          text-sm
          md:text-md
        `,
      },
      buttons: `
        md:py-[0.8125rem]
        md:px-[1.5625rem]
      `,
      cardContainer: `
        md:gap-5
      `,
    },
    '6col': {
      artwork: {
        artistName: `
          md:text-md
        `,
        artWorkTitle: `
          md:text-md
        `,
        artworkYear: `
          md:text-md
        `,
        priceTitle: `
          md:text-md
        `,
      },
      cardContainer: `
        md:gap-5
      `,
      buttons: `
        md:py-[0.8125rem]
        md:px-[1.5625rem]
      `,
    },
    '4col': {
      artwork: {
        artistName: `
          md:text-md
        `,
        artWorkTitle: `
          md:text-md
        `,
        artworkYear: `
          md:text-md
        `,
        priceTitle: `
          md:text-md
        `,
      },
      buttons: `
        md:py-[0.8125rem]
        md:px-[1.5625rem]
      `,
    },
    '3col': {
      buttons: `
        md:py-[0.8125rem]
        md:px-[1.5625rem]
      `,
    },
    '2col': {
      buttons: `
        md:py-[0.3125rem]
        md:px-[1.5625rem]
      `,
    },
  },
};
