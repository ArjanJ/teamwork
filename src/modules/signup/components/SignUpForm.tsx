import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikActions,
  FormikProps,
} from 'formik';
import React, { FunctionComponent } from 'react';
import { Flex } from 'rebass';

import { ButtonSpinner } from '../../../components/button-spinner/ButtonSpinner';
import { Color } from '../../../styles/Color';
import { delay } from '../../../utils/delay';
import {
  AuthMethod,
  useSignUpOrLogin,
} from '../../auth/hooks/useSignUpOrLogin';
import { useSignUpOrLoginOnSuccess } from '../../auth/hooks/useSignUpOrLoginOnSuccess';
import { FieldWrapper, Input, Label } from './SignUpShared';

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

export const SignUpForm: FunctionComponent = () => {
  const { onSuccess } = useSignUpOrLoginOnSuccess();

  const { doEmailAndPassword } = useSignUpOrLogin({
    method: AuthMethod.SIGN_UP,
    onSuccess,
  });

  const onSubmit = async (
    values: SignUpFormValues,
    actions: FormikActions<SignUpFormValues>,
  ) => {
    await delay(1500);
    await doEmailAndPassword(values.email, values.password);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ isSubmitting }: FormikProps<SignUpFormValues>) => (
        <Form>
          <Field
            name="email"
            render={({ field }: FieldProps<SignUpFormValues>) => (
              <FieldWrapper mb="36px">
                <Input
                  {...field}
                  autoFocus={true}
                  placeholder="Your Email"
                  required={true}
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
                  required={true}
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
                  required={true}
                  type="password"
                />
                <Label>Confirm Password</Label>
              </FieldWrapper>
            )}
          />
          <Flex justifyContent="center" mb="36px">
            <ButtonSpinner
              isSubmitting={isSubmitting}
              primary={Color.AQUA}
              secondary={Color.BLUE_PERSIAN}
              type="submit"
              width={156}
            >
              <span>Create account</span>
            </ButtonSpinner>
          </Flex>
        </Form>
      )}
    />
  );
};
