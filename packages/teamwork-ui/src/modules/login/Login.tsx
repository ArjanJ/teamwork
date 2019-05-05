import { Link, navigate } from '@reach/router';
import React, { FunctionComponent, useState } from 'react';
import { Box, Flex } from 'rebass';

import { Header } from '../../components/header/Header';
import { GoogleLogo } from '../../components/logos/logos';
import { auth } from '../../firebase';
import { useForm } from '../../hooks/useForm';
import { useSocialSignIn } from '../../hooks/useSocialSignIn';
import {
  Backdrop,
  BigButton,
  Button,
  Field,
  Form,
  Heading,
  Input,
  Label,
  P,
  Separator,
} from '../signup/Shared';

interface LoginProps {
  path: string;
}

export const Login: FunctionComponent<LoginProps> = () => {
  const onSocialSignInSuccess = () => {
    if (isNewUser) {
      navigate('/onboarding');
    } else {
      navigate('/');
    }
  };

  const { hasError, isNewUser, signIn } = useSocialSignIn({
    onSuccess: onSocialSignInSuccess,
  });

  const onSubmit = async () => {
    const { email, password } = values;
    const [emailPasswordError, setEmailPasswordError] = useState(false);

    try {
      await auth.doSignInWithEmailAndPassword(email, password);
    } catch (err) {
      setEmailPasswordError(true);
    }
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
          <Heading>Log in</Heading>
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
          <Button type="submit">Log in</Button>
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
