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
import { FormField } from '../../../components/form-field/FormField';
import { Input } from '../../../components/input/Input';
import { Color } from '../../../styles/Color';
import { delay } from '../../../utils/delay';
import {
  AuthMethod,
  useSignUpOrLogin,
} from '../../auth/hooks/useSignUpOrLogin';
import { useSignUpOrLoginOnSuccess } from '../../auth/hooks/useSignUpOrLoginOnSuccess';

interface SignUpFormValues {
  confirmPassword: string;
  email: string;
  password: string;
}

const initialValues = {
  confirmPassword: '',
  email: '',
  password: '',
};

const EmailField = ({ field }: FieldProps<SignUpFormValues>) => (
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

const PasswordField = ({ field }: FieldProps<SignUpFormValues>) => (
  <FormField label="Password">
    <Input
      {...field}
      placeholder="Your Password"
      required={true}
      type="password"
    />
  </FormField>
);

const ConfirmPasswordField = ({ field }: FieldProps<SignUpFormValues>) => (
  <FormField label="Confirm Password">
    <Input
      {...field}
      placeholder="Confirm Password"
      required={true}
      type="password"
    />
  </FormField>
);

const SignUpFormComponent = ({
  isSubmitting,
}: FormikProps<SignUpFormValues>) => (
  <Form>
    <Field name="email" render={EmailField} />
    <Field name="password" render={PasswordField} />
    <Field name="confirmPassword" render={ConfirmPasswordField} />
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
);

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
      render={SignUpFormComponent}
    />
  );
};
