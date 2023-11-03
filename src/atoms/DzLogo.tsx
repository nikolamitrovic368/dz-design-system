import React from 'react';
import { cn } from '../utils/classnames';

import { IconProps } from '../svgIcons/types';

export interface DzLogoProps {
  url: string;
  className?: any;
  svgProps?: IconProps;
  LinkElement: any;
}

const styles = {
  logoContainer: `text-[1.5rem] md:text-[1.75rem] pt-1 md:pt-0`,
  logo: `bg-transparent leading-7 whitespace-nowrap`,
};

export const DzLogo = (props: DzLogoProps) => {
  const { url = '/', className, LinkElement = 'a' } = props;
  return (
    <div className={cn(styles.logoContainer)}>
      <LinkElement href={url} className={cn(styles.logo, className)}>
        David Zwirner
      </LinkElement>
    </div>
  );
};

DzLogo.displayName = 'DzLogo';
DzLogo.defaultProps = {
  url: '/',
  className: '',
};

export default DzLogo;
