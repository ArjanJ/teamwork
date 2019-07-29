import { darken } from 'polished';
import { Box } from 'rebass';
import styled from 'styled-components';

import { Color } from '../../../styles/Color';
import { Easing } from '../../../styles/Easing';

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
`;

export const BigButton = styled.button`
  align-items: center;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  color: ${Color.BLUE_SKY};
  display: flex;
  font-weight: 600;
  height: 64px;
  padding: 0 16px;
  transition: all 0.35s ${Easing.OUT};
  width: 100%;

  &:hover {
    background: ${darken(0.06, 'white')};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  }

  span {
    flex: 1;
  }
`;

export const FieldWrapper = styled(Box)`
  position: relative;
`;

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
    width: 60%;
    z-index: -1;
  }
`;

export const Title = styled.h1`
  color: ${Color.MANGO};
  font-size: 36px;
  margin-bottom: 24px;
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

export const Wrapper = styled.div<{
  textAlign?: 'left' | 'center' | 'right';
  width?: number;
}>`
  margin: auto;
  min-height: 405px;
  padding-top: 60px;
  width: ${({ width }) => width || 460}px;

  ${({ textAlign }) => `text-align: ${textAlign}`};
`;

export const FadeWhen = styled.div<{ fade: boolean }>`
  opacity: ${({ fade }) => (fade ? 0.4 : 1)};
  transition: opacity 0.35s ${Easing.IN_OUT};
`;
