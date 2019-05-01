import { Link, navigate } from '@reach/router';
import React, { SFC, useState } from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import { auth } from '../../firebase';
import { useForm } from '../../hooks/useForm';
import { useSocialSignIn } from '../../hooks/useSocialSignIn';
import { useUser } from '../../hooks/useUser';

interface SignupProps {
  path: string;
}

export const Signup: SFC<SignupProps> = () => {
  const { createUser } = useUser();

  const onSocialSignInSuccess = (isNewUser: boolean) => {
    if (isNewUser) {
      createUser({
        firstName: '',
        lastName: '',
        role: '',
      });
      navigate('/onboarding');
    } else {
      navigate('/');
    }
  };

  const { hasError, signIn } = useSocialSignIn({
    onSuccess: onSocialSignInSuccess,
  });

  const onEmailPasswordSignInSuccess = async () => {
    const { email, password } = values;
    const [emailPasswordError, setEmailPasswordError] = useState(false);

    try {
      await auth.doCreateUserWithEmailAndPassword(email, password);
    } catch (err) {
      setEmailPasswordError(true);
    }
  };

  const initialFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues: initialFormValues,
    onSubmit: onEmailPasswordSignInSuccess,
  });

  return (
    <Backdrop>
      <Form onSubmit={handleSubmit}>
        <Heading>Create your account</Heading>
        <P>Register with your work Google account</P>
        <BigButton onClick={signIn} type="button">
          Register with Google
        </BigButton>
        <P>Or, register with your email</P>
        <Box mb="24px">
          <Label>Email</Label>
          <Input
            id="email"
            name="email"
            onChange={handleInputChange}
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
            required
            type="password"
            value={values.password}
          />
        </Box>
        <Box mb="24px">
          <Label>Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleInputChange}
            required
            type="password"
            value={values.confirmPassword}
          />
        </Box>
        <Flex justifyContent="center" mb="24px">
          <button type="submit">Create account</button>
        </Flex>
        <Box>
          <p>
            Already have an account? <Link to="/signup">Login</Link>
          </p>
        </Box>
      </Form>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  align-items: center;
  background-color: #0900c3;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

const Heading = styled.h1`
  color: #f8cf83;
  font-size: 30px;
`;

const P = styled.p`
  color: white;
`;

const Form = styled.form`
  max-width: 360px;
  width: 100%;
`;

const BigButton = styled.button`
  background: white;
  border: none;
  height: 32px;
  font-weight: 700;
  width: 100%;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  height: 32px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  height: 0;
  visibility: hidden;
`;

export default Signup;
