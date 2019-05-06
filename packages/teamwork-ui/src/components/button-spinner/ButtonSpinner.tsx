import { darken, lighten, rgba } from 'polished';
import styled, { css, keyframes } from 'styled-components';

import { Easing } from '../../styles/Easing';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const ButtonSpinner = styled.button<{ isSubmitting?: boolean }>`
  background: #2d77ee;
  border-radius: 99px;
  box-shadow: 0 0 0 3px ${rgba('#2d77ee', 1)};
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
    background: ${darken(0.05, '#2d77ee')};
  }

  ${props =>
    props.isSubmitting
      ? css`
          background: #0900c3 !important;
          box-shadow: 0 0 0 3px ${rgba('#2d77ee', 0)};
          min-width: 36px;
          padding: 0;
        `
      : ''}

  &::before {
    animation: 1s ${rotate} linear infinite;
    background: linear-gradient(#2d77ee, ${lighten(0.25, '#2d77ee')});
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
