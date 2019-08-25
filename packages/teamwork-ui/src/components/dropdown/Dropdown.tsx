import { rgba } from 'polished';
import styled, { CSSProp } from 'styled-components';

import { Color } from '../../styles/Color';
import { Easing } from '../../styles/Easing';

interface DropdownProps {
  css?: CSSProp;
  isOpen: boolean;
}

export const Dropdown = styled.div<DropdownProps>`
  background: ${Color.NAVY};
  border-radius: 4px;
  box-shadow: 0 4px 16px ${rgba('black', 0.15)};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  padding: 6px 0;
  position: absolute;
  right: 16px;
  top: 42px;
  transform: ${({ isOpen }) => (isOpen ? 'none' : 'translateY(20%)')};
  transition: all 0.25s ${Easing.OUT};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  width: 174px;
  z-index: 1;

  ${props => props.css}
`;

export const DropdownItem = styled.button<{ css?: CSSProp }>`
  background: none;
  color: white;
  padding: 6px 12px;
  text-align: left;
  transition: all 0.35s ${Easing.OUT};
  width: 100%;

  &:hover {
    background: ${rgba('white', 0.1)};
  }

  ${props => props.css}
`;
