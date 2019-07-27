import { navigate } from '@reach/router';
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
import { useAuthUser } from '../../hooks/useAuthUser';
import { useUser } from '../user/useUser';
import { Color } from '../../styles/Color';
import { delay } from '../../utils/delay';
import { FieldWrapper, Heading, Input, Label } from '../signup/Shared';
import { isEmptyUser } from '../../utils/isEmptyUser';

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
  const { createUser, error: userError, user } = useUser();

  useEffect(() => {
    if (!userError && user && !isEmptyUser(user)) {
      navigate('/');
    }
  });

  const onSubmit = async (
    values: OnboardingFormValues,
    actions: FormikActions<OnboardingFormValues>,
  ) => {
    console.log({ values, actions });
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
    await createUser(user);
    actions.setSubmitting(false);
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
