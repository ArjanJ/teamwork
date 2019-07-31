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

interface FormFieldProps {
  children: React.ReactChild | React.ReactNodeArray;
  label: string;
}

const FormField: FunctionComponent<FormFieldProps> = ({ children, label }) => (
  <FieldWrapper mb="36px">
    {children}
    <Label>{label}</Label>
  </FieldWrapper>
);

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
    <Field name="email" render={EmailField} />
    <Field name="password" render={PasswordField} />
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
