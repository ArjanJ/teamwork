import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { Box } from 'rebass';
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
          <Box mb="36px">
            <Title>Welcome to Teamwork 👋</Title>
            <P>
              To get started we just need a few details about you and where you
              work.
            </P>
          </Box>
          <OnboardingForm />
        </Wrapper>
      </VerifyEmail>
    </Backdrop>
  );
};

const Wrapper = styled.div`
  margin: auto;
  min-height: 405px;
  padding-top: 60px;
  width: 460px;
`;

const Title = styled.h1`
  color: white;
  font-size: 36px;
  margin-bottom: 12px;
`;

const P = styled.p`
  color: white;
`;

export default Onboarding;
