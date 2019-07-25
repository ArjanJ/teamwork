import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Header } from '../../components/header/Header';
import { useAuthorization } from '../../hooks/useAuthorization';
import { Backdrop } from '../signup/Shared';
import { OnboardingForm } from './OnboardingForm';
import { Step } from './types';
import { VerifyEmail } from '../verify-email/VerifyEmail';

export interface IStepFormProps {
  updateStep(step: Step): void;
}

export const Onboarding: FunctionComponent<RouteComponentProps> = () => {
  useAuthorization('/login');

  return (
    <Backdrop>
      <Header />
      <VerifyEmail>
        <Wrapper>
          <Title>Welcome to Teamwork!</Title>
          <OnboardingForm />
        </Wrapper>
      </VerifyEmail>
    </Backdrop>
  );
};

const Wrapper = styled.div`
  justify-self: center;
  margin-bottom: 148px;
  min-height: 405px;
  width: 460px;
`;

const Title = styled.h1`
  color: #f8cf83;
  font-size: 36px;
  margin-bottom: 64px;
`;

export default Onboarding;
