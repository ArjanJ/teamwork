import { navigate } from '@reach/router';
import {
  Formik,
  FormikActions,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import React, { useEffect } from 'react';
import { Flex } from 'rebass';

import { ButtonSpinner } from '../../../components/button-spinner/ButtonSpinner';
import { Color } from '../../../styles/Color';
import { AsyncActionStatus } from '../../../utils/asyncAction';
import { useAuthUser } from '../../auth/useAuthUser';
import { useUser } from '../../user/useUser';
import {
  FieldWrapper,
  Input,
  Label,
} from '../../signup/components/SignUpShared';
import { isEmptyUser } from '../../user/utils';

interface OnboardingFormValues {
  company: string;
  firstName: string;
  lastName: string;
  role: string;
}

const initialValues: OnboardingFormValues = {
  company: '',
  firstName: '',
  lastName: '',
  role: '',
};

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
    const user = {
      companies: [
        {
          id: '',
          name: values.company,
        },
      ],
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role,
      teams: [],
    };

    const { status } = await createUser(user);
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
      render={(formikBag: FormikProps<OnboardingFormValues>) => (
        <Form>
          <Field
            name="firstName"
            render={({ field, form }: FieldProps<OnboardingFormValues>) => (
              <FieldWrapper mb="36px">
                <Input
                  {...field}
                  autoFocus={true}
                  placeholder="Your First Name"
                  required
                  type="text"
                />
                <Label>First name</Label>
              </FieldWrapper>
            )}
          />
          <Field
            name="lastName"
            render={({ field, form }: FieldProps<OnboardingFormValues>) => (
              <FieldWrapper mb="36px">
                <Input
                  {...field}
                  placeholder="Your Last Name"
                  required
                  type="text"
                />
                <Label>Last name</Label>
              </FieldWrapper>
            )}
          />
          <Field
            name="company"
            render={({ field, form }: FieldProps<OnboardingFormValues>) => (
              <FieldWrapper mb="36px">
                <Input
                  {...field}
                  placeholder="Your Company"
                  required
                  type="text"
                />
                <Label>Company</Label>
              </FieldWrapper>
            )}
          />
          <Field
            name="role"
            render={({ field, form }: FieldProps<OnboardingFormValues>) => (
              <FieldWrapper mb="36px">
                <Input
                  {...field}
                  placeholder="Your Role"
                  required
                  type="text"
                />
                <Label>Role</Label>
              </FieldWrapper>
            )}
          />
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
      )}
    />
  );
};
