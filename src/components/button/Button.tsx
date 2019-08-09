import { darken, rgba } from 'polished';
import styled, { css } from 'styled-components';

import { Color } from '../../styles/Color';
import { Easing } from '../../styles/Easing';

export enum ButtonKind {
  PRIMARY = 'PRIMARY',
  PRIMARY_ALT = 'PRIMARY_ALT',
  SECONDARY = 'SECONDARY',
}

export interface ButtonProps {
  kind: ButtonKind;
}

const buttonThemeMap = {
  [ButtonKind.PRIMARY]: css`
    background: ${Color.AQUA};

    &::before {
      background: ${darken(0.06, Color.AQUA)};
    }
  `,
  [ButtonKind.PRIMARY_ALT]: css`
    background: ${Color.BLUE_SKY};

    &::before {
      background: ${darken(0.06, Color.BLUE_SKY)};
    }
  `,
  [ButtonKind.SECONDARY]: css`
    background: none;
    border: 3px solid ${Color.AQUA};

    &::before {
      background: ${Color.AQUA};
    }
  `,
};

export const Button = styled.button<ButtonProps>`
  border-radius: 99px;
  box-shadow: 0 1px 3px ${rgba('black', 0.12)};
  color: white;
  font-weight: 700;
  height: 40px;
  min-width: 100px;
  overflow: hidden;
  padding: 0 24px;
  position: relative;
  transition: background 0.35s ${Easing.OUT};
  z-index: 0;

  &:hover {
    &::before {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  &::before {
    border-radius: 50%;
    content: '';
    left: 50%;
    opacity: 0;
    padding: calc(40% + 30px) 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.01);
    transition: all 0.45s ${Easing.OUT};
    width: calc(100% + 30px);
    z-index: -1;
  }

  ${({ kind }) => buttonThemeMap[kind]};
`;
