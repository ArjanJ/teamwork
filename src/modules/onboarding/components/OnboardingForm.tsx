import { navigate } from '@reach/router';
import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikActions,
  FormikProps,
} from 'formik';
import React, { useEffect } from 'react';
import { Box, Flex } from 'rebass';

import { ButtonSpinner } from '../../../components/button-spinner/ButtonSpinner';
import { FormField } from '../../../components/form-field/FormField';
import { Input } from '../../../components/input/Input';
import { Color } from '../../../styles/Color';
import { AsyncActionStatus } from '../../../utils/asyncAction';
import { useAuthUser } from '../../auth/hooks/useAuthUser';
import { useUser } from '../../user/useUser';
import { isEmptyUser } from '../../user/utils';

interface OnboardingFormValues {
  company: string;
  firstName: string;
  lastName: string;
  role: string;
}

const initialValues = {
  company: '',
  firstName: '',
  lastName: '',
  role: '',
};

const FirstNameField = ({ field }: FieldProps<OnboardingFormValues>) => (
  <FormField label="First Name">
    <Input
      {...field}
      autoFocus={true}
      placeholder="Your First Name"
      required={true}
      type="text"
    />
  </FormField>
);

const LastNameField = ({ field }: FieldProps<OnboardingFormValues>) => (
  <FormField label="Last Name">
    <Input
      {...field}
      placeholder="Your Last Name"
      required={true}
      type="text"
    />
  </FormField>
);

const CompanyField = ({ field }: FieldProps<OnboardingFormValues>) => (
  <FormField label="Company">
    <Input {...field} placeholder="Your Company" required={true} type="text" />
  </FormField>
);

const RoleField = ({ field }: FieldProps<OnboardingFormValues>) => (
  <FormField label="Role">
    <Input {...field} placeholder="Your Role" required={true} type="text" />
  </FormField>
);

const OnboardingFormComponent = (
  formikBag: FormikProps<OnboardingFormValues>,
) => (
  <Form>
    <Box mb="24px">
      <Field name="firstName" render={FirstNameField} />
    </Box>
    <Box mb="24px">
      <Field name="lastName" render={LastNameField} />
    </Box>
    <Box mb="24px">
      <Field name="company" render={CompanyField} />
    </Box>
    <Box mb="36px">
      <Field name="role" render={RoleField} />
    </Box>
    <Flex justifyContent="flex-end">
      <ButtonSpinner
        disabled={formikBag.isSubmitting}
        isSubmitting={formikBag.isSubmitting}
        primary={Color.AQUA}
        secondary={Color.BLUE_PERSIAN}
        type="submit"
      >
        <span>Next</span>
      </ButtonSpinner>
    </Flex>
  </Form>
);

export const OnboardingForm = () => {
  const { authUser } = useAuthUser();
  const { createUser, error, getUser, isFetching, user } = useUser();

  useEffect(() => {
    if (!error && !user && !isFetching && authUser.uid) {
      getUser(authUser.uid);
    }

    if (!error && user && !isEmptyUser(user)) {
      navigate('/');
    }
  }, [authUser, error, user]);

  const onSubmit = async (
    values: OnboardingFormValues,
    actions: FormikActions<OnboardingFormValues>,
  ) => {
    const newUser = {
      companies: [
        {
          id: '',
          name: values.company,
        },
      ],
      email: authUser.email,
      firstName: values.firstName,
      id: '',
      lastName: values.lastName,
      role: values.role,
      teams: [],
    };

    const { status } = await createUser(newUser);
    if (status === AsyncActionStatus.FAILED) {
      // Do not go further if there was an error creating the user.
      return actions.setSubmitting(false);
    }

    // If user is successfully created go to dashboard :)
    navigate('/');
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={OnboardingFormComponent}
    />
  );
};
