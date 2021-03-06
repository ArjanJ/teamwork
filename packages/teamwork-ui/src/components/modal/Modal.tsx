import { rgba } from 'polished';
import React, { FunctionComponent, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { Color } from '../../styles/Color';
import { Easing } from '../../styles/Easing';

interface ModalProps {
  children: React.ReactNode;
  dark?: boolean;
  hideModal(): void;
  title?: string;
  width?: number;
}

export const Modal: FunctionComponent<ModalProps> = ({
  children,
  dark = true,
  hideModal,
  title = '',
  width,
}) => {
  const handleKeyDown = ({ keyCode }: KeyboardEvent) => {
    // Close modal when esc key is pressed.
    if (keyCode === 27) {
      hideModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  });

  return (
    <Wrapper>
      <ModalBackground dark={dark} onClick={hideModal} />
      <ModalWrapper dark={dark} width={width}>
        {title && <ModalTitle>{title}</ModalTitle>}
        <ModalCloseButton onClick={hideModal} type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="12px"
            height="12px"
            viewBox="0 0 12 12"
          >
            <g transform="translate(0, 0)">
              <path
                d="M10.707,1.293a1,1,0,0,0-1.414,0L6,4.586,2.707,1.293A1,1,0,0,0,1.293,2.707L4.586,6,1.293,9.293a1,1,0,1,0,1.414,1.414L6,7.414l3.293,3.293a1,1,0,0,0,1.414-1.414L7.414,6l3.293-3.293A1,1,0,0,0,10.707,1.293Z"
                fill={dark ? '#e0e0e0' : '#444444'}
              />
            </g>
          </svg>
        </ModalCloseButton>
        <ModalContent>{children}</ModalContent>
      </ModalWrapper>
    </Wrapper>
  );
};

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20%); }
  100% { opacity: 1; transform: none; }
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;

const ModalWrapper = styled.div<{ dark: boolean; width?: number }>`
  animation: 0.4s 0.15s ${fadeInUp} ${Easing.OUT} forwards;
  background: ${props => (props.dark ? Color.NAVY : 'white')};
  border-radius: 4px;
  box-shadow: 0 6px 24px ${rgba('black', 0.2)};
  min-height: 100px;
  opacity: 0;
  padding: 36px;
  position: relative;
  width: ${({ width }) => width || 640}px;
`;

const ModalBackground = styled.div<{ dark: boolean }>`
  animation: 0.35s ${fadeIn} ${Easing.OUT} forwards;
  background: ${props =>
    props.dark ? rgba(Color.BLUE_RAGE, 0.65) : rgba('black', 0.5)};
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const ModalCloseButton = styled.button`
  background: none;
  display: block;
  position: absolute;
  padding: 8px;
  right: 8px;
  top: 8px;

  svg {
    transition: opacity 0.35s ${Easing.OUT};
  }

  &:hover {
    svg {
      opacity: 0.75;
    }
  }
`;

const ModalTitle = styled.h1`
  color: white;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
`;

export const ModalSubheading = styled.p`
  color: white;
  display: block;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
`;

export const ModalText = styled.p`
  color: white;
  margin-bottom: 16px;
  opacity: 0.75;
`;

export const ModalCancelButton = styled.button`
  background: none;
  color: white;
  font-weight: 700;
  opacity: 0.7;
  padding: 0 16px;
  transition: opacity 0.35s ${Easing.OUT};

  &:hover {
    opacity: 1;
  }
`;

const ModalContent = styled.div``;
