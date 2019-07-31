import React from 'react';

import { Color } from '../../styles/Color';

export const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
  >
    <g transform="translate(0, 0)">
      <path
        fill={Color.NAVY}
        d="M8,14H1c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h7c0.552,0,1,0.448,1,1v0C9,13.552,8.552,14,8,14z"
      />{' '}
      <path
        fill={Color.NAVY}
        d="M15,4H1C0.448,4,0,3.552,0,3v0c0-0.552,0.448-1,1-1h14c0.552,0,1,0.448,1,1v0C16,3.552,15.552,4,15,4z"
      />{' '}
      <path
        data-color="color-2"
        fill={Color.NAVY}
        d="M15,9H1C0.448,9,0,8.552,0,8v0c0-0.552,0.448-1,1-1h14c0.552,0,1,0.448,1,1v0 C16,8.552,15.552,9,15,9z"
      />
    </g>
  </svg>
);
