import React from 'react';

export const PlayIconSmall = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={31}
    fill="none"
    {...props}
  >
    <g opacity={0.8}>
      <rect width={30} height={30} y={0.391} fill="#fff" rx={15} />
      <path fill="#000" d="m11 9.39 11 6-11 6v-12Z" opacity={0.8} />
    </g>
  </svg>
);
export default PlayIconSmall;
