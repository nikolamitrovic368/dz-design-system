import React from 'react';
import { DzButtonProps } from '../../atoms';
import { InterstitialSplit, InterstitialSplitProps } from './InterstitialSplit';
import {
  InterstitialFullWidth,
  InterstitialFullWidthProps,
} from './InterstitialFullWidth';

export const INTERSTITIAL_TEXT_COLORS = {
  WHITE: 'white-100',
  BLACK: 'black-100',
  BLACK_80: 'black-80',
  BLACK_60: 'black-60',
  BLACK_40: 'black-40',
};
export const INTERSTITIAL_TEXT_COLORS_NAMES = [
  INTERSTITIAL_TEXT_COLORS.WHITE,
  INTERSTITIAL_TEXT_COLORS.BLACK,
  INTERSTITIAL_TEXT_COLORS.BLACK_80,
  INTERSTITIAL_TEXT_COLORS.BLACK_60,
  INTERSTITIAL_TEXT_COLORS.BLACK_40,
] as const;

export type TextColors = typeof INTERSTITIAL_TEXT_COLORS_NAMES[number];

export type DzInterstitialProps = {
  data: (
    | Omit<InterstitialSplitProps, 'LinkElement'>
    | Omit<InterstitialFullWidthProps, 'LinkElement'>
  ) & {
    split: boolean;
  };
  LinkElement: any;
};
export type PrimaryCTAInterstitial = {
  text: string;
  ctaProps?: DzButtonProps;
};

export const DzInterstitial = ({
  data,
  LinkElement = 'a',
}: DzInterstitialProps) => {
  const { split = false, ...rest } = data;

  return split ? (
    <InterstitialSplit
      {...(rest as InterstitialSplitProps)}
      LinkElement={LinkElement}
    />
  ) : (
    <InterstitialFullWidth
      {...(rest as InterstitialFullWidthProps)}
      LinkElement={LinkElement}
    />
  );
};

export default DzInterstitial;
