import { Link, navigate } from '@reach/router';
import React, { FunctionComponent, useState } from 'react';
import { Box, Flex } from 'rebass';

import { ButtonSpinner } from '../../components/button-spinner/ButtonSpinner';
import { Header } from '../../components/header/Header';
import { GoogleLogo } from '../../components/logos/logos';
import { useForm } from '../../hooks/useForm';
import { useEmailPassSignUp } from '../../hooks/useEmailPassSignUp';
import { useSocialSignIn } from '../../hooks/useSocialSignIn';
import { useUser } from '../../hooks/useUser';
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
} from './Shared';

interface SignupProps {
  path: string;
}

export const Signup: FunctionComponent<SignupProps> = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const { signUp } = useEmailPassSignUp({
    onSuccess: onSocialSignInSuccess,
  });

  const initialFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    await delay(1500);
    await signUp(values.email, values.password);
    setIsSubmitting(false);
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues: initialFormValues,
    onSubmit,
  });

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
