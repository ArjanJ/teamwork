import { Link, navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Flex } from 'rebass';

import { ButtonSpinner } from '../../components/button-spinner/ButtonSpinner';
import { Header } from '../../components/header/Header';
import { GoogleLogo } from '../../components/logos/logos';
import { Spinner } from '../../components/spinner/Spinner';
import { useForm } from '../../hooks/useForm';
import { useEmailPassSignUp } from '../../hooks/useEmailPassSignUp';
import {
  IOnSocialSignInSuccess,
  useSocialSignIn,
} from '../../hooks/useSocialSignIn';
import { useUser } from '../../hooks/useUser';
import { Color } from '../../styles/Color';
import { delay } from '../../utils/delay';
import { isEmptyUser } from '../../utils/isEmptyUser';
import {
  Backdrop,
  BigButton,
  Error,
  Field,
  Form,
  Input,
  Label,
  LoadingSpinnerWrapper,
  P,
  Separator,
  Title,
} from '../signup/Shared';

export const Login: FunctionComponent<RouteComponentProps> = () => {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createUser, getUser, isFetching, user } = useUser();

  const onLoginSuccess = async ({
    isNewUser,
    user,
  }: IOnSocialSignInSuccess) => {
    if (isNewUser) {
      await createUser({
        firstName: '',
        lastName: '',
        role: '',
        teams: [],
      });

      return navigate('/onboarding');
    }

    if (user && user.uid) {
      getUser(user.uid);
    }
  };

  const { hasError, signIn } = useSocialSignIn({
    onSuccess: onLoginSuccess,
  });

  const { error: emailPassError, login } = useEmailPassSignUp({
    onSuccess: onLoginSuccess,
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    await delay(1500);
    await login(values.email, values.password);
    setIsSubmitting(false);
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues: { email: '', password: '' },
    onSubmit,
  });

  useEffect(() => {
    if (user && isEmptyUser(user)) {
      navigate('/onboarding');
    } else if (user) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    if (emailPassError) {
      setError(emailPassError);
    }
  }, [emailPassError]);

  return (
    <Backdrop>
      <Header />
      <LoadingSpinnerWrapper>
        {isFetching && <Spinner color={Color.BLUE_RAGE} size={72} />}
      </LoadingSpinnerWrapper>
      <Form onSubmit={handleSubmit}>
        <Box mb="24px">
          <Title>Log in</Title>
          <P>Log in with your work Google account</P>
        </Box>
        <Box mb="24px">
          <BigButton onClick={signIn} type="button">
            <GoogleLogo />
            <span>Log in with Google</span>
          </BigButton>
        </Box>
        <Separator mb="36px">
          <P>Or, log in with your email</P>
        </Separator>
        {error && <Error>{error}</Error>}
        <Field mb="24px">
          <Input
            id="email"
            name="email"
            onChange={handleInputChange}
            placeholder="Your email"
            required
            type="email"
            value={values.email}
          />
          <Label>Email</Label>
        </Field>
        <Field mb="24px">
          <Input
            id="password"
            name="password"
            onChange={handleInputChange}
            placeholder="Create password"
            required
            type="password"
            value={values.password}
          />
          <Label>Password</Label>
        </Field>
        <Flex justifyContent="center" mb="24px">
          <ButtonSpinner isSubmitting={isSubmitting} type="submit">
            {!isSubmitting && 'Log in'}
          </ButtonSpinner>
        </Flex>
        <Box>
          <P>
            Dont' have an account?{' '}
            <Link to="/signup">
              <strong>Signup</strong>
            </Link>
          </P>
        </Box>
      </Form>
    </Backdrop>
  );
};

export default Login;
