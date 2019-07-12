import { Link, navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Flex } from 'rebass';

import { ButtonSpinner } from '../../components/button-spinner/ButtonSpinner';
import { Header } from '../../components/header/Header';
import { GoogleLogo } from '../../components/logos/logos';
import { useForm } from '../../hooks/useForm';
import { useEmailPassSignUp } from '../../hooks/useEmailPassSignUp';
import {
  IOnSocialSignInSuccess,
  useSocialSignIn,
} from '../../hooks/useSocialSignIn';
import { useUser } from '../../hooks/useUser';
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
  P,
  Separator,
  Title,
} from './Shared';

export const Signup: FunctionComponent<RouteComponentProps> = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { createUser, getUser, isFetching, user } = useUser();

  const onSignInSuccess = async ({
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
    onSuccess: onSignInSuccess,
  });

  const { error: emailPassError, signUp } = useEmailPassSignUp({
    onSuccess: onSignInSuccess,
  });

  const initialFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async () => {
    if (values.password !== values.confirmPassword) {
      return setError('Passwords do not match.');
    }

    setIsSubmitting(true);
    await delay(1500);
    await signUp(values.email, values.password);
    setIsSubmitting(false);
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues: initialFormValues,
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
      <Form onSubmit={handleSubmit}>
        <Box mb="24px">
          <Title>Create your account</Title>
          <P>Register with your work Google account</P>
        </Box>
        <Box mb="24px">
          <BigButton onClick={signIn} type="button">
            <GoogleLogo />
            <span>Register with Google</span>
          </BigButton>
        </Box>
        <Separator mb="36px">
          <P>Or, register with your email</P>
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
        <Field mb="36px">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleInputChange}
            placeholder="Confirm password"
            required
            type="password"
            value={values.confirmPassword}
          />
          <Label>Confirm Password</Label>
        </Field>
        <Flex justifyContent="center" mb="24px">
          <ButtonSpinner isSubmitting={isSubmitting} type="submit">
            {!isSubmitting && 'Create account'}
          </ButtonSpinner>
        </Flex>
        <Box>
          <P>
            Already have an account?{' '}
            <Link to="/login">
              <strong>Login</strong>
            </Link>
          </P>
        </Box>
      </Form>
    </Backdrop>
  );
};

export default Signup;
