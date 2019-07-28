import { Link, RouteComponentProps } from '@reach/router';
import {
  Formik,
  FormikActions,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Flex } from 'rebass';

import { ButtonSpinner } from '../../components/button-spinner/ButtonSpinner';
import { Header } from '../../components/header/Header';
import { GoogleLogo } from '../../components/logos/logos';
import { Spinner } from '../../components/spinner/Spinner';
import { AuthMethod, useSignUpOrLogin } from '../../hooks/useSignUpOrLogin';
import { useSignUpOrLoginOnSuccess } from '../../hooks/useSignUpOrLoginOnSuccess';
import { useUser } from '../user/useUser';
import { Color } from '../../styles/Color';
import { delay } from '../../utils/delay';
import {
  Backdrop,
  BigButton,
  Error,
  FieldWrapper,
  Input,
  Label,
  LoadingSpinnerWrapper,
  P,
  Separator,
  Title,
  Wrapper,
} from '../signup/Shared';

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: '',
};

export const Login: FunctionComponent<RouteComponentProps> = () => {
  const [error, setError] = useState('');
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

  const onSubmit = async (
    values: LoginFormValues,
    actions: FormikActions<LoginFormValues>,
  ) => {
    await delay(1500);
    await doEmailAndPassword(values.email, values.password);
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (emailPassError) {
      setError(emailPassError);
    }
  }, [emailPassError]);

  return (
    <Backdrop>
      <Header />
      <Wrapper textAlign="center">
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
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          render={(formikBag: FormikProps<LoginFormValues>) => (
            <Form>
              <Field
                name="email"
                render={({ field }: FieldProps<LoginFormValues>) => (
                  <FieldWrapper mb="36px">
                    <Input
                      {...field}
                      autoFocus={true}
                      placeholder="Your Email"
                      required
                      type="email"
                    />
                    <Label>Email</Label>
                  </FieldWrapper>
                )}
              />
              <Field
                name="password"
                render={({ field }: FieldProps<LoginFormValues>) => (
                  <FieldWrapper mb="36px">
                    <Input
                      {...field}
                      placeholder="Your Password"
                      required
                      type="password"
                    />
                    <Label>Password</Label>
                  </FieldWrapper>
                )}
              />
              <Flex justifyContent="center" mb="36px">
                <ButtonSpinner
                  isSubmitting={formikBag.isSubmitting}
                  primary={Color.AQUA}
                  secondary={Color.BLUE_PERSIAN}
                  type="submit"
                >
                  <span>Log in</span>
                </ButtonSpinner>
              </Flex>
              <P>
                Don't have an account?{' '}
                <Link to="/signup">
                  <strong>Signup</strong>
                </Link>
              </P>
            </Form>
          )}
        />
      </Wrapper>
      <LoadingSpinnerWrapper>
        {isFetching && <Spinner color={Color.BLUE_PERSIAN} size={72} />}
      </LoadingSpinnerWrapper>
    </Backdrop>
  );
};

export default Login;
