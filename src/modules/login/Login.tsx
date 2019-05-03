import { Link, navigate } from '@reach/router';
import React, { SFC, useState } from 'react';
import { Box, Flex } from 'rebass';

import { GoogleLogo, TeamworkLogo } from '../../components/logos/logos';
import { auth } from '../../firebase';
import { useForm } from '../../hooks/useForm';
import { useSocialSignIn } from '../../hooks/useSocialSignIn';
import {
  Backdrop,
  BigButton,
  Button,
  Form,
  Header,
  Heading,
  Input,
  Label,
  P,
  Separator,
} from '../signup/Shared';

interface LoginProps {
  path: string;
}

export const Login: SFC<LoginProps> = () => {
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
      <Header>
        <a href="#">
          <TeamworkLogo />
        </a>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Box mb="24px">
          <Heading>Login</Heading>
          <P>Login with your work Google account</P>
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
        <Box mb="24px">
          <Label>Email</Label>
          <Input
            id="email"
            name="email"
            onChange={handleInputChange}
            placeholder="Your email"
            required
            type="email"
            value={values.email}
          />
        </Box>
        <Box mb="24px">
          <Label>Password</Label>
          <Input
            id="password"
            name="password"
            onChange={handleInputChange}
            placeholder="Create password"
            required
            type="password"
            value={values.password}
          />
        </Box>
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
