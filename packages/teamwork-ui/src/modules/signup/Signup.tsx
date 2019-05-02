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
        <Box mb="24px">
          <Heading>Create your account</Heading>
          <P>Register with your work Google account</P>
        </Box>
        <Box mb="24px">
          <BigButton onClick={signIn} type="button">
            <GoogleLogo />
            <span>Register with Google</span>
          </BigButton>
        </Box>
        <Box mb="36px">
          <P>Or, register with your email</P>
        </Box>
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
        <Box mb="36px">
          <Label>Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleInputChange}
            placeholder="Confirm password"
            required
            type="password"
            value={values.confirmPassword}
          />
        </Box>
        <Flex justifyContent="center" mb="24px">
          <Button type="submit">Create account</Button>
        </Flex>
        <Box>
          <P>
            Already have an account? <Link to="/signup">Login</Link>
          </P>
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
  margin-bottom: 10px;
`;

const P = styled.p`
  color: white;
  font-weight: 500;
`;

const Form = styled.form`
  max-width: 360px;
  text-align: center;
  width: 100%;
`;

const BigButton = styled.button`
  align-items: center;
  background: #f3f3f3;
  border-radius: 2px;
  color: #2d77ee;
  display: flex;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  padding: 0 12px;
  width: 100%;

  span {
    flex: 1;
  }
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  height: 48px;
  padding: 0 16px;
  transition: all 0.2s ease-out;
  width: 100%;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus,
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Label = styled.label`
  display: block;
  height: 0;
  visibility: hidden;
`;

const Button = styled.button`
  background: #2d77ee;
  border-radius: 2px;
  color: white;
  font-size: 15px;
  font-weight: 700;
  height: 40px;
  padding: 0 20px;
`;

const GoogleLogo = () => (
  <svg
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 48 48"
  >
    <defs>
      <path
        id="a"
        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
      />
    </defs>
    <clipPath id="b">
      <use xlinkHref="#a" overflow="visible" />
    </clipPath>
    <path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
    <path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
    <path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
    <path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
  </svg>
);

export default Signup;
