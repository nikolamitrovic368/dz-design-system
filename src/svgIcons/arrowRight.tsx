import React, { FC } from 'react';

import { DzSvg } from './DzSvg';
import { IconProps } from './types';

export const ArrowRight: FC<IconProps> = ({
  width = 18,
  height = 12,
  fill = 'currentColor',
  viewBox = '0 0 18 12',
  className = '',
}) => {
  return (
    <DzSvg
      width={width}
      height={height}
      viewBox={viewBox}
      className={className}
      ariaTitle="Arrow Right Icon"
      fill={fill}
      d="M1.22461 5.5128H15.3805L10.8129 0.946191C10.5971 0.730308 10.5971 0.378282 10.8129 0.162399C10.918 0.0573744 11.057 0 11.2058 0C11.3536 0 11.4927 0.0573744 11.5977 0.162399L17.13 5.69465V5.70243C17.2107 5.77634 17.2622 5.88136 17.2622 6C17.2622 6.11961 17.2087 6.22464 17.128 6.29951V6.30729L11.5977 11.8376C11.4927 11.9426 11.3536 12 11.2058 12C11.057 12 10.918 11.9426 10.8129 11.8376C10.5971 11.6217 10.5971 11.2697 10.8129 11.0538L15.3805 6.4872H1.22461C0.955238 6.4872 0.73741 6.26937 0.73741 6C0.73741 5.73063 0.955238 5.5128 1.22461 5.5128Z"
    />
  );
};

export default ArrowRight;
