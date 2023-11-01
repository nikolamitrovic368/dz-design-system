import React from 'react';

export const PlayIconLarge = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={41}
    fill="none"
    {...props}
  >
    <g opacity={0.8}>
      <rect width={40} height={40} y={0.391} fill="#fff" rx={20} />
      <path
        fill="#000"
        d="m14.668 12.39 14.667 8-14.667 8v-16Z"
        opacity={0.8}
      />
    </g>
  </svg>
);

export default PlayIconLarge;
