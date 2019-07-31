import { Link, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { Box } from 'rebass';

import { GoogleLogo } from '../../../components/logos/logos';
import { Spinner } from '../../../components/spinner/Spinner';
import { Color } from '../../../styles/Color';
import {
  AuthMethod,
  useSignUpOrLogin,
} from '../../auth/hooks/useSignUpOrLogin';
import { useSignUpOrLoginOnSuccess } from '../../auth/hooks/useSignUpOrLoginOnSuccess';
import {
  BigButton,
  FadeWhen,
  LoadingSpinnerWrapper,
  P,
  Separator,
  Title,
} from '../../signup/components/SignUpShared';
import { SignUpWrapper } from '../../signup/components/SignUpWrapper';
import { useUser } from '../../user/useUser';
import { LoginForm } from './LoginForm';

export const Login: FunctionComponent<RouteComponentProps> = () => {
  const { isFetching } = useUser();
  const { onSuccess } = useSignUpOrLoginOnSuccess();

  const { doSocial } = useSignUpOrLogin({
    method: AuthMethod.LOGIN,
    onSuccess,
  });

  return (
    <SignUpWrapper>
      <FadeWhen fade={isFetching}>
        <Box mb="24px">
          <Title>Log in</Title>
          <P>Log in with your work Google account</P>
        </Box>
        <Box mb="24px">
          <BigButton onClick={doSocial} type="button">
            <GoogleLogo />
            <span>Log in with Google</span>
          </BigButton>
        </Box>
        <Separator mb="36px">
          <P>Or, log in with your email</P>
        </Separator>
        <LoginForm />
        <P>
          Don't have an account?{' '}
          <Link to="/signup">
            <strong>Signup</strong>
          </Link>
        </P>
      </FadeWhen>
      <LoadingSpinnerWrapper>
        {isFetching && <Spinner color={Color.BLUE_PERSIAN} size={72} />}
      </LoadingSpinnerWrapper>
    </SignUpWrapper>
  );
};

export default Login;
