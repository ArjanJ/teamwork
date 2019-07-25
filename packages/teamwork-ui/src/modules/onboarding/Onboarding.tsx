import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';

import { Header } from '../../components/header/Header';
import { useAuthorization } from '../../hooks/useAuthorization';
import { useAuthUser } from '../../hooks/useAuthUser';
import { Backdrop } from '../signup/Shared';
import { OnboardingForm } from './OnboardingForm';
import { Step } from './types';
import { VerifyEmail } from '../verify-email/VerifyEmail';

export interface IStepFormProps {
  updateStep(step: Step): void;
}

export const Onboarding: FunctionComponent<RouteComponentProps> = () => {
  useAuthorization('/login');

  const { authUser } = useAuthUser();

  const renderVerifyEmail = authUser && !authUser.emailVerified && (
    <VerifyEmail email={authUser.email} />
  );

  const renderOnboarding = authUser && authUser.emailVerified && (
    <Wrapper>
      <Title>Welcome to Teamwork!</Title>
      <PoseGroup>
        <FormAnimation key="fadeInUp">
          <OnboardingForm />
        </FormAnimation>
      </PoseGroup>
    </Wrapper>
  );

  return (
    <Backdrop>
      <Header />
      {renderVerifyEmail}
      {renderOnboarding}
    </Backdrop>
  );
};

const FormAnimation = posed.div({
  enter: {
    opacity: 1,
    delay: 300,
  },
  exit: {
    y: 80,
    opacity: 0,
    transition: { duration: 300 },
  },
});

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
