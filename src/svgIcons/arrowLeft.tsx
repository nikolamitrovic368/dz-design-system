import React, { FC } from 'react';

import { DzSvg } from './DzSvg';
import { IconProps } from './types';

export const ArrowLeft: FC<IconProps> = ({
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
      ariaTitle="Arrow Left Icon"
      fill={fill}
      d="M16.7754 5.5128H2.61948L7.18706 0.946191C7.40295 0.730308 7.40295 0.378282 7.18706 0.162399C7.08204 0.0573744 6.94298 0 6.79419 0C6.64638 0 6.50732 0.0573744 6.4023 0.162399L0.870046 5.69465V5.70243C0.789333 5.77634 0.737793 5.88136 0.737793 6C0.737793 6.11961 0.791278 6.22464 0.871991 6.29951V6.30729L6.4023 11.8376C6.50732 11.9426 6.64638 12 6.79419 12C6.94298 12 7.08204 11.9426 7.18706 11.8376C7.40295 11.6217 7.40295 11.2697 7.18706 11.0538L2.61948 6.4872H16.7754C17.0448 6.4872 17.2626 6.26937 17.2626 6C17.2626 5.73063 17.0448 5.5128 16.7754 5.5128Z"
    />
  );
};

export default ArrowLeft;
