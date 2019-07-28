import {
  Formik,
  FormikActions,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import React, { FunctionComponent } from 'react';
import { Flex } from 'rebass';

import { ButtonSpinner } from '../../../components/button-spinner/ButtonSpinner';
import { AuthMethod, useSignUpOrLogin } from '../../../hooks/useSignUpOrLogin';
import { useSignUpOrLoginOnSuccess } from '../../../hooks/useSignUpOrLoginOnSuccess';
import { Color } from '../../../styles/Color';
import { delay } from '../../../utils/delay';
import {
  FieldWrapper,
  Input,
  Label,
} from '../../signup/components/SignUpShared';

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: '',
};

export const LoginForm: FunctionComponent = () => {
  const { onSuccess } = useSignUpOrLoginOnSuccess();

  const { doEmailAndPassword } = useSignUpOrLogin({
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

  return (
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
        </Form>
      )}
    />
  );
};
