import { darken, lighten } from 'polished';
import styled, { css, keyframes } from 'styled-components';

import { Easing } from '../../styles/Easing';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface ButtonSpinnerProps {
  isSubmitting?: boolean;
  primary: string;
  secondary: string;
  width?: number;
}

export const ButtonSpinner = styled.button<ButtonSpinnerProps>`
  background: none;
  color: white;
  font-weight: 700;
  height: 40px;
  position: relative;
  transition: width 0.5s ${Easing.OUT};
  width: ${({ width }) => width || 100}px;
  white-space: nowrap;

  ${({ isSubmitting, primary }) =>
    isSubmitting
      ? css`
          pointer-events: none;
          width: 40px;

          span {
            opacity: 0;
          }
        `
      : css`
          &:hover {
            &::after {
              background: ${darken(0.06, primary)};
            }
          }
        `}

  &::before {
    animation: 1s ${rotate} linear infinite;
    background: ${({ primary, secondary }) =>
      `linear-gradient(${primary}, ${lighten(0.12, secondary)})`};
    border-radius: 50%;
    content: '';
    height: 40px;
    left: 0;
    padding: 3px;
    position: absolute;
    top: 0;
    transition: all 0.5s ${Easing.OUT};
    width: 40px;
    z-index: -2;
  }

  &::after {
    background: ${({ isSubmitting, primary, secondary }) =>
      isSubmitting ? secondary : primary};
    border-radius: 99px;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: ${({ isSubmitting }) => (isSubmitting ? 'scale(0.85)' : 'none')};
    transition: background 0.35s ${Easing.OUT}, transform 0.5s ${Easing.OUT};
    width: 100%;
    z-index: -1;
  }

  span {
    display: inline-block;
    transition: opacity 0.25s ${Easing.OUT};
  }
`;
