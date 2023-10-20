import React, { FC } from 'react';
import { DzSvg } from './DzSvg';
import { IconProps } from './types';

export const OutlineNewsletter: FC<IconProps> = ({
  width = 26,
  height = 26,
  fill = 'black',
  viewBox = '0 0 26 26',
  className = '',
  ...rest
}) => {
  return (
    <DzSvg
      width={width}
      height={height}
      viewBox={viewBox}
      className={className}
      fill={fill}
      d="M8.93748 2.7085C5.50677 2.7085 2.70831 5.50696 2.70831 8.93766V17.0627C2.70831 20.4929 5.50668 23.2918 8.93748 23.2918H17.0625C20.4928 23.2918 23.2916 20.493 23.2916 17.0627V8.93766C23.2916 5.50686 20.4927 2.7085 17.0625 2.7085H8.93748ZM8.93748 4.3335H17.0625C19.6144 4.3335 21.6666 6.38522 21.6666 8.93766V17.0627C21.6666 19.6145 19.6143 21.6668 17.0625 21.6668H8.93748C6.38503 21.6668 4.33331 19.6146 4.33331 17.0627V8.93766C4.33331 6.38512 6.38493 4.3335 8.93748 4.3335ZM18.4166 6.50016C17.8181 6.50016 17.3333 6.98495 17.3333 7.5835C17.3333 8.18204 17.8181 8.66683 18.4166 8.66683C19.0152 8.66683 19.5 8.18204 19.5 7.5835C19.5 6.98495 19.0152 6.50016 18.4166 6.50016ZM13 7.5835C10.0182 7.5835 7.58331 10.0184 7.58331 13.0002C7.58331 15.9819 10.0182 18.4168 13 18.4168C15.9818 18.4168 18.4166 15.9819 18.4166 13.0002C18.4166 10.0184 15.9818 7.5835 13 7.5835ZM13 9.2085C15.1034 9.2085 16.7916 10.8968 16.7916 13.0002C16.7916 15.1035 15.1034 16.7918 13 16.7918C10.8966 16.7918 9.20831 15.1035 9.20831 13.0002C9.20831 10.8968 10.8966 9.2085 13 9.2085Z"
      {...rest}
      ariaTitle="WeChat Icon"
    />
  );
};

export default OutlineNewsletter;
