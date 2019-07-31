import { darken } from 'polished';
import styled from 'styled-components';

import { Easing } from '../../styles/Easing';

export const Input = styled.input`
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  height: 64px;
  padding: 0 16px;
  transition: all 0.35s ${Easing.OUT};
  width: 100%;

  &:focus,
  &:hover {
    background: ${darken(0.06, 'white')};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  }

  &:focus + label,
  &:valid + label {
    opacity: 1;
  }

  &:focus,
  &:valid {
    padding-top: 15px;
  }
`;
