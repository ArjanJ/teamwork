import { rgba } from 'polished';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface IModalProps {
  children: React.ReactNode;
  hideModal(): void;
}

export const Modal: FunctionComponent<IModalProps> = ({
  children,
  hideModal,
}) => {
  return (
    <Background onClick={hideModal}>
      <ModalWrapper>{children}</ModalWrapper>
    </Background>
  );
};

export const ModalWrapper = styled.div`
  background: white;
  min-height: 400px;
  width: 600px;
`;

const Background = styled.div`
  align-items: center;
  background: ${rgba('black', 0.5)};
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;
