import { darken } from 'polished';
import { Box } from 'rebass';
import styled from 'styled-components';

import { Color } from '../../styles/Color';
import { Easing } from '../../styles/Easing';

export const Backdrop = styled.div`
  min-height: 100vh;
`;

export const Heading = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: 500;
`;

export const P = styled.p`
  color: white;
  font-weight: 500;
`;

export const Form = styled.form<{ disabled?: boolean }>`
  margin: 0 auto;
  max-width: 420px;
  opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  text-align: center;
  width: 100%;
`;

export const BigButton = styled.button`
  align-items: center;
  background: #f3f3f3;
  border-radius: 2px;
  color: #2d77ee;
  display: flex;
  font-size: 15px;
  font-weight: 600;
  height: 48px;
  padding: 0 12px;
  width: 100%;

  span {
    flex: 1;
  }
`;

export const Field = styled(Box)`
  position: relative;
`;

export const FieldWrapper = Field;

export const Input = styled.input`
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  height: 64px;
  padding: 0 16px;
  transition: all 0.2s ease-out;
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

export const Label = styled.label`
  color: ${Color.NAVY};
  font-size: 13px;
  font-weight: 700;
  left: 16px;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 9px;
  transition: all 0.5s ${Easing.OUT};
`;

export const Separator = styled(Box)`
  position: relative;
  z-index: 1;

  &::before {
    background: white;
    content: '';
    height: 1px;
    left: 0;
    opacity: 0.5;
    position: absolute;
    top: 50%;
    width: 100%;
    z-index: -2;
  }

  &::after {
    background: ${Color.BLUE_PERSIAN};
    content: '';
    height: 100%;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    width: 64%;
    z-index: -1;
  }
`;

export const Title = styled.h1`
  color: #f8cf83;
  font-size: 30px;
  margin-bottom: 10px;
`;

export const Error = styled.p`
  background: #ff4848;
  color: white;
  font-weight: 700;
  margin-bottom: 24px;
  padding: 12px;
`;

export const LoadingSpinnerWrapper = styled.div`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;
