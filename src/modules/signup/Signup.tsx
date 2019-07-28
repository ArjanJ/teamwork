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
} from './Shared';

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const Signup: FunctionComponent<RouteComponentProps> = () => {
  const [error, setError] = useState('');
  const { isFetching } = useUser();
  const { onSuccess } = useSignUpOrLoginOnSuccess();

  const { error: signUpError, doEmailAndPassword, doSocial } = useSignUpOrLogin(
    {
      method: AuthMethod.SIGN_UP,
      onSuccess,
    },
  );

  const onSubmit = async (
    values: SignUpFormValues,
    actions: FormikActions<SignUpFormValues>,
  ) => {
    if (values.password !== values.confirmPassword) {
      return setError('Passwords do not match.');
    }

    await delay(1500);
    await doEmailAndPassword(values.email, values.password);
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (signUpError) {
      setError(signUpError);
    }
  }, [signUpError]);

  return (
    <Backdrop>
      <Header />
      <Wrapper textAlign="center">
        <Box mb="24px">
          <Title>Create your account</Title>
          <P>Register with your work Google account</P>
        </Box>
        <Box mb="24px">
          <BigButton onClick={doSocial} type="button">
            <GoogleLogo />
            <span>Register with Google</span>
          </BigButton>
        </Box>
        <Separator mb="36px">
          <P>Or, register with your email</P>
        </Separator>
        {error && <Error>{error}</Error>}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          render={(formikBag: FormikProps<SignUpFormValues>) => (
            <Form>
              <Field
                name="email"
                render={({ field }: FieldProps<SignUpFormValues>) => (
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
                render={({ field }: FieldProps<SignUpFormValues>) => (
                  <FieldWrapper mb="36px">
                    <Input
                      {...field}
                      placeholder="Create Password"
                      required
                      type="password"
                    />
                    <Label>Password</Label>
                  </FieldWrapper>
                )}
              />
              <Field
                name="confirmPassword"
                render={({ field }: FieldProps<SignUpFormValues>) => (
                  <FieldWrapper mb="36px">
                    <Input
                      {...field}
                      placeholder="Confirm Password"
                      required
                      type="password"
                    />
                    <Label>Confirm Password</Label>
                  </FieldWrapper>
                )}
              />
              <Flex justifyContent="center" mb="36px">
                <ButtonSpinner
                  isSubmitting={formikBag.isSubmitting}
                  primary={Color.AQUA}
                  secondary={Color.BLUE_PERSIAN}
                  type="submit"
                  width={156}
                >
                  <span>Create account</span>
                </ButtonSpinner>
              </Flex>
              <P>
                Already have an account?{' '}
                <Link to="/login">
                  <strong>Login</strong>
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

export default Signup;
