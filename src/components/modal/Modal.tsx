import { rgba } from 'polished';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface IModalProps {
  children: React.ReactNode;
  dark?: boolean;
  hideModal(): void;
}

export const Modal: FunctionComponent<IModalProps> = ({
  children,
  dark = true,
  hideModal,
}) => {
  return (
    <Background dark={dark} onClick={hideModal}>
      <ModalWrapper dark={dark}>
        <CloseButton onClick={hideModal} type="button">
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
        </CloseButton>
        {children}
      </ModalWrapper>
    </Background>
  );
};

export const ModalWrapper = styled.div<{ dark: boolean }>`
  background: ${props => (props.dark ? '#03004B' : 'white')};
  border-radius: 4px;
  box-shadow: 0 6px 20px ${rgba('black', 0.1)};
  min-height: 400px;
  width: 600px;
`;

const Background = styled.div<{ dark: boolean }>`
  align-items: center;
  background: ${props =>
    props.dark ? rgba('white', 0.4) : rgba('black', 0.5)};
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;

const CloseButton = styled.button`
  background: none;
  display: block;
  margin-left: auto;
  padding: 12px;
`;
