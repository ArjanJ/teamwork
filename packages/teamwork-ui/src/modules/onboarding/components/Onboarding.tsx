import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

import { Header } from '../../../components/header/Header';
import { useAuthorization } from '../../auth/hooks/useAuthorization';
import { Backdrop, Wrapper } from '../../signup/components/SignUpShared';
import { OnboardingForm } from './OnboardingForm';
import { VerifyEmail } from '../../verify-email/components/VerifyEmail';

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
              It’s important to use cocoa butter. It’s the key to more success,
              why not live smooth?
            </P>
          </Box>
          <OnboardingForm />
        </Wrapper>
      </VerifyEmail>
    </Backdrop>
  );
};

const Title = styled.h1`
  color: white;
  font-size: 36px;
  margin-bottom: 12px;
`;

const P = styled.p`
  color: white;
`;

export default Onboarding;
