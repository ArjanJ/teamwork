import { darken } from 'polished';
import { Box } from 'rebass';
import styled, { css, keyframes } from 'styled-components';

import { Easing } from '../../styles/Easing';

export const Backdrop = styled.div`
  background-color: #0900c3;
  display: grid;
  min-height: 100vh;
`;

export const Heading = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: 500;
`;

export const P = styled.p`
  color: white;
  font-weight: 500;
`;

export const Form = styled.form`
  margin: 0 auto;
  max-width: 420px;
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
  height: 40px;
  padding: 0 12px;
  width: 100%;

  span {
    flex: 1;
  }
`;

export const Field = styled(Box)`
  position: relative;
`;

export const Input = styled.input`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  height: 64px;
  padding: 0 16px;
  transition: all 0.2s ease-out;
  width: 100%;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus,
  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  &:focus + label,
  &:valid + label {
    opacity: 1;
  }

  &:focus,
  &:valid {
    padding-top: 18px;
  }
`;

export const Label = styled.label`
  color: white;
  font-size: 12px;
  font-weight: 500;
  left: 16px;
  opacity: 0;
  position: absolute;
  top: 10px;
  transition: all 0.5s ${Easing.OUT};
`;

const loading = keyframes`
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-100%);
  }
  
  100% {
    transform: translateX(0);
  }
`;

export const Button = styled.button<{ isSubmitting?: boolean }>`
  background: #2d77ee;
  border-radius: 99px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0);
  color: white;
  font-size: 15px;
  font-weight: 700;
  height: 40px;
  padding: 0 24px;
  transition: all 0.5s ${Easing.OUT};

  &:hover {
    background: ${darken(0.05, '#2d77ee')};
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  }

  ${props =>
    props.isSubmitting
      ? css`
          animation: 1s ${loading} ${Easing.IN_OUT} infinite;
          padding: 0;
          width: 40px;
        `
      : ''}
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
    background: #0900c3;
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
