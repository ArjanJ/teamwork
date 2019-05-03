import { Box } from 'rebass';
import styled from 'styled-components';

export const Backdrop = styled.div`
  background-color: #0900c3;
  display: grid;
  min-height: 100vh;
`;

export const Header = styled.header`
  padding: 24px;
`;

export const Heading = styled.h1`
  color: #f8cf83;
  font-size: 30px;
  margin-bottom: 10px;
`;

export const P = styled.p`
  color: white;
  font-weight: 500;
`;

export const Form = styled.form`
  justify-self: center;
  max-width: 360px;
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

export const Input = styled.input`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  height: 48px;
  padding: 0 16px;
  transition: all 0.2s ease-out;
  width: 100%;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus,
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const Label = styled.label`
  display: block;
  height: 0;
  visibility: hidden;
`;

export const Button = styled.button`
  background: #2d77ee;
  border-radius: 99px;
  color: white;
  font-size: 15px;
  font-weight: 700;
  height: 40px;
  padding: 0 24px;
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
