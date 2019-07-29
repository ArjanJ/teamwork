import { Link, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { Box } from 'rebass';

import { GoogleLogo } from '../../../components/logos/logos';
import { Spinner } from '../../../components/spinner/Spinner';
import { AuthMethod, useSignUpOrLogin } from '../../../hooks/useSignUpOrLogin';
import { useSignUpOrLoginOnSuccess } from '../../../hooks/useSignUpOrLoginOnSuccess';
import { Color } from '../../../styles/Color';
import { useUser } from '../../user/useUser';
import { SignUpForm } from './SignUpForm';
import {
  BigButton,
  FadeWhen,
  LoadingSpinnerWrapper,
  P,
  Separator,
  Title,
} from './SignUpShared';
import { SignUpWrapper } from './SignUpWrapper';

export const SignUp: FunctionComponent<RouteComponentProps> = () => {
  const { isFetching } = useUser();
  const { onSuccess } = useSignUpOrLoginOnSuccess();

  const { doSocial } = useSignUpOrLogin({
    method: AuthMethod.SIGN_UP,
    onSuccess,
  });

  return (
    <SignUpWrapper>
      <FadeWhen fade={isFetching}>
        <Box mb="24px">
          <Title>Create your account</Title>
          <P>Register with your work Google account</P>
        </Box>
        <Box mb="24px">
          <BigButton onClick={doSocial} type="button">
            <GoogleLogo />
            <span>Register with Google</span>
          </BigButton>
        </Box>
        <Separator mb="36px">
          <P>Or, register with your email</P>
        </Separator>
        <SignUpForm />
        <P>
          Already have an account?{' '}
          <Link to="/login">
            <strong>Login</strong>
          </Link>
        </P>
      </FadeWhen>
      <LoadingSpinnerWrapper>
        {isFetching && <Spinner color={Color.BLUE_PERSIAN} size={72} />}
      </LoadingSpinnerWrapper>
    </SignUpWrapper>
  );
};

export default SignUp;
