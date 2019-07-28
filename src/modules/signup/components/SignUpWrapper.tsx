import React, { FunctionComponent } from 'react';

import { Header } from '../../../components/header/Header';
import { Backdrop, Wrapper } from './SignUpShared';

interface SignUpWrapperProps {
  children: React.ReactNodeArray | React.ReactChild | React.ReactChildren;
}

export const SignUpWrapper: FunctionComponent<SignUpWrapperProps> = ({
  children,
}) => (
  <Backdrop>
    <Header />
    <Wrapper textAlign="center">{children}</Wrapper>
  </Backdrop>
);
