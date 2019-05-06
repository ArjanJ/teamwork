import { Link, navigate } from '@reach/router';
import React, { FunctionComponent, useState } from 'react';
import { Box, Flex } from 'rebass';

import { ButtonSpinner } from '../../components/button-spinner/ButtonSpinner';
import { Header } from '../../components/header/Header';
import { GoogleLogo } from '../../components/logos/logos';
import { useForm } from '../../hooks/useForm';
import { useEmailPassSignUp } from '../../hooks/useEmailPassSignUp';
import { useSocialSignIn } from '../../hooks/useSocialSignIn';
import { delay } from '../../utils/delay';
import {
  Backdrop,
  BigButton,
  Field,
  Form,
  Input,
  Label,
  P,
  Separator,
  Title,
} from '../signup/Shared';

interface LoginProps {
  path: string;
}

export const Login: FunctionComponent<LoginProps> = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSignInSuccess = () => {
    if (isNewUser) {
      navigate('/onboarding');
    } else {
      navigate('/');
    }
  };

  const { hasError, isNewUser, signIn } = useSocialSignIn({
    onSuccess: onSignInSuccess,
  });

  const { login } = useEmailPassSignUp({
    onSuccess: onSignInSuccess,
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

  return (
    <Backdrop>
      <Header />
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
