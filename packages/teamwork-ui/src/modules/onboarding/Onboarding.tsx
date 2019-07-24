import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';

import { Header } from '../../components/header/Header';
import { useAuthorization } from '../../hooks/useAuthorization';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useUser } from '../../hooks/useUser';
import { Backdrop } from '../signup/Shared';
import { OnboardingName } from './OnboardingName';
import { OnboardingRole } from './OnboardingRole';
import { Step } from './types';

export interface IStepFormProps {
  updateStep(step: Step): void;
}

export const Onboarding: FunctionComponent<RouteComponentProps> = () => {
  useAuthorization('/login');

  const { authUser } = useAuthUser();
  const { getUser, isFetching, user } = useUser();

  useEffect(() => {
    if (authUser) {
      // Fetch user if we haven't already.
      if (!user && !isFetching) {
        getUser(authUser.uid);
      }

      // If the user has filled out the info already go to dashboard.
      if (user && user.firstName && user.lastName && user.role) {
        navigate('/');
      }
    }
  });

  const [step, updateStep] = useState<Step>('NAME');

  return (
    <Backdrop>
      <Header />
      <Wrapper>
        <Title>Welcome to Teamwork!</Title>
        {user !== null && (
          <PoseGroup>
            {step === 'NAME' && (
              <FormAnimation key="shade">
                <OnboardingName updateStep={updateStep} />
              </FormAnimation>
            )}
            {step === 'ROLE' && (
              <FormAnimation key="shade2">
                <OnboardingRole updateStep={updateStep} />
              </FormAnimation>
            )}
          </PoseGroup>
        )}
      </Wrapper>
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
