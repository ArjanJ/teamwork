import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import { Spinner } from '../../../components/spinner/Spinner';
import { firebase } from '../../../firebase';
import { useAuthUser } from '../../auth/hooks/useAuthUser';
import { Color } from '../../../styles/Color';

interface VerifyEmailProps {
  children: React.ReactNode;
}

export const VerifyEmail: FunctionComponent<VerifyEmailProps> = ({
  children,
}) => {
  const { authUser } = useAuthUser();
  const { currentUser } = firebase.auth;
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [resentEmail, setResentEmail] = useState(false);
  const [resentEmailError, setResentEmailError] = useState('');

  if (!currentUser || !authUser) {
    return null;
  }

  const hasVerifiedEmail = authUser.emailVerified;

  const onResendButtonClick = async () => {
    setResentEmail(false);
    setIsResendingEmail(true);

    try {
      // Resend email verification link
      await currentUser.sendEmailVerification();

      setIsResendingEmail(false);
      setResentEmail(true);
    } catch (error) {
      setIsResendingEmail(false);
      setResentEmailError('Please wait a few minutes before trying again.');
    }
  };

  return hasVerifiedEmail ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <Wrapper>
      <Heading>Verify your email address</Heading>
      <Subheading>
        We’re thrilled to have you onboard, but first we need you to verify your
        email address.
      </Subheading>
      <P>
        If you didn’t get an email,{' '}
        <Button onClick={onResendButtonClick} type="button">
          click here{' '}
        </Button>{' '}
        to send another link to {authUser.email}.
      </P>
      <ResentWrapper>
        {isResendingEmail && (
          <Spinner color={Color.BLUE_PERSIAN} size={40} stroke={3} />
        )}
        {resentEmail && (
          <P>
            <strong>✅ Email sent!</strong>
          </P>
        )}
        {resentEmailError && (
          <p>
            <strong>🛑 {resentEmailError}</strong>
          </p>
        )}
      </ResentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: auto;
  max-width: 744px;
  padding: 60px 36px;
`;

const Heading = styled.h1`
  color: white;
  font-size: 36px;
  margin-bottom: 36px;
`;

const Subheading = styled.p`
  color: white;
  font-size: 22px;
  margin-bottom: 108px;
`;

const P = styled.p`
  color: white;
  font-size: 18px;
  margin-bottom: 24px;
`;

const Button = styled.button`
  background: none;
  padding: 0;
  text-decoration: underline;
  transition: opacity 0.35 ease-out;

  &:hover {
    opacity: 0.75;
  }
`;

const ResentWrapper = styled.div``;
