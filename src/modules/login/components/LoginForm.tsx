import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikActions,
  FormikProps,
} from 'formik';
import React, { FunctionComponent } from 'react';
import { Box, Flex } from 'rebass';

import { ButtonSpinner } from '../../../components/button-spinner/ButtonSpinner';
import { FormField } from '../../../components/form-field/FormField';
import { Input } from '../../../components/input/Input';
import { Color } from '../../../styles/Color';
import { delay } from '../../../utils/delay';
import {
  AuthMethod,
  useSignUpOrLogin,
} from '../../auth/hooks/useSignUpOrLogin';
import { useSignUpOrLoginOnSuccess } from '../../auth/hooks/useSignUpOrLoginOnSuccess';

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: '',
};

const EmailField = ({ field }: FieldProps<LoginFormValues>) => (
  <FormField label="Email">
    <Input
      {...field}
      autoFocus={true}
      placeholder="Your Email"
      required={true}
      type="email"
    />
  </FormField>
);

const PasswordField = ({ field }: FieldProps<LoginFormValues>) => (
  <FormField label="Password">
    <Input
      {...field}
      placeholder="Your Password"
      required={true}
      type="password"
    />
  </FormField>
);

const LoginFormComponent = ({ isSubmitting }: FormikProps<LoginFormValues>) => (
  <Form>
    <Box mb="24px">
      <Field name="email" render={EmailField} />
    </Box>
    <Box mb="36px">
      <Field name="password" render={PasswordField} />
    </Box>
    <Flex justifyContent="center" mb="36px">
      <ButtonSpinner
        isSubmitting={isSubmitting}
        primary={Color.AQUA}
        secondary={Color.BLUE_PERSIAN}
        type="submit"
      >
        <span>Log in</span>
      </ButtonSpinner>
    </Flex>
  </Form>
);

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
      render={LoginFormComponent}
    />
  );
};
