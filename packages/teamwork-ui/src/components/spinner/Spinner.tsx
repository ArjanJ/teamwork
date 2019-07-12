import styled, { keyframes } from 'styled-components';
import React, { FunctionComponent } from 'react';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface ISpinnerProps {
  color: string;
  size: number;
}

const Spinning = styled.svg`
  animation: 1s ${rotate} linear infinite;
`;

export const Spinner: FunctionComponent<ISpinnerProps> = ({ color, size }) => (
  <Spinning width={size} height={size}>
    <defs>
      <linearGradient id="grad1" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor={color} />
      </linearGradient>
    </defs>
    <g fill="none">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 5}
        stroke="url(#grad1)"
        strokeWidth="5"
      />
    </g>
  </Spinning>
);
