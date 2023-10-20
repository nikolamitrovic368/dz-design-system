import React from 'react';
import { cn } from '../utils/classnames';
// import Link from 'next/link'

import { IconProps } from '../svgIcons/types';

export interface DzLogoProps {
  url: string;
  className?: any;
  svgProps?: IconProps;
}

const styles = {
  logoContainer: `text-[24px] md:text-[28px] pt-1 md:pt-0`,
  logo: `bg-transparent leading-7 whitespace-nowrap`,
};

export const DzLogo = (props: DzLogoProps) => {
  const { url = '/', className } = props;
  return (
    <div className={cn(styles.logoContainer)}>
      <a href={url} className={cn(styles.logo, className)}>
        David Zwirner
      </a>
    </div>
  );
};

DzLogo.displayName = 'DzLogo';
DzLogo.defaultProps = {
  url: '/',
  className: '',
};

export default DzLogo;
