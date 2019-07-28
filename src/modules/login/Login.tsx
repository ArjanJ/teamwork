import { Link, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Flex } from 'rebass';

import { ButtonSpinner } from '../../components/button-spinner/ButtonSpinner';
import { Header } from '../../components/header/Header';
import { GoogleLogo } from '../../components/logos/logos';
import { Spinner } from '../../components/spinner/Spinner';
import { useForm } from '../../hooks/useForm';
import { AuthMethod, useSignUpOrLogin } from '../../hooks/useSignUpOrLogin';
import { useSignUpOrLoginOnSuccess } from '../../hooks/useSignUpOrLoginOnSuccess';
import { useUser } from '../user/useUser';
import { Color } from '../../styles/Color';
import { delay } from '../../utils/delay';
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
  const { isFetching } = useUser();
  const { onSuccess } = useSignUpOrLoginOnSuccess();

  const {
    error: emailPassError,
    doEmailAndPassword,
    doSocial,
  } = useSignUpOrLogin({
    method: AuthMethod.LOGIN,
    onSuccess,
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    await delay(1500);
    await doEmailAndPassword(values.email, values.password);
    setIsSubmitting(false);
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues: { email: '', password: '' },
    onSubmit,
  });

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
          <BigButton onClick={doSocial} type="button">
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
            placeholder="Password"
            required
            type="password"
            value={values.password}
          />
          <Label>Password</Label>
        </Field>
        <Flex justifyContent="center" mb="24px">
          <ButtonSpinner
            isSubmitting={isSubmitting}
            primary={Color.AQUA}
            secondary={Color.BLUE_PERSIAN}
            type="submit"
          >
            <span>Log in</span>
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
