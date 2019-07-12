import { darken, lighten, rgba } from 'polished';
import styled, { css, keyframes } from 'styled-components';

import { Color } from '../../styles/Color';
import { Easing } from '../../styles/Easing';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const ButtonSpinner = styled.button<{ isSubmitting?: boolean }>`
  background: ${Color.BLUE_SKY};
  border-radius: 99px;
  box-shadow: 0 0 0 3px ${rgba(Color.BLUE_SKY, 1)};
  color: white;
  font-size: 15px;
  font-weight: 700;
  height: 36px;
  margin: 3px;
  min-width: 100px;
  padding: 0 24px;
  position: relative;
  transition: min-width 0.5s ${Easing.IN_OUT},
    box-shadow 0.5s 0.25s ${Easing.IN_OUT};

  &:hover {
    background: ${darken(0.05, Color.BLUE_SKY)};
  }

  ${props =>
    props.isSubmitting
      ? css`
          background: ${Color.BLUE_RAGE} !important;
          box-shadow: 0 0 0 3px ${rgba(Color.BLUE_SKY, 0)};
          min-width: 36px;
          padding: 0;
          pointer-events: none;
        `
      : ''}

  &::before {
    animation: 1s ${rotate} linear infinite;
    background: linear-gradient(
      ${Color.BLUE_SKY},
      ${lighten(0.25, Color.BLUE_SKY)}
    );
    border-radius: 50%;
    box-sizing: content-box;
    content: '';
    height: 100%;
    left: -3px;
    opacity: ${props => (props.isSubmitting ? 1 : 0)};
    padding: 3px;
    position: absolute;
    top: -3px;
    transition: all 0.5s 0.25s ${Easing.IN_OUT};
    width: 100%;
    z-index: -1;
  }
`;
