import React, { FunctionComponent, useState } from 'react';
import { Box, Flex } from 'rebass';

import { ButtonSpinner } from '../../components/button-spinner/ButtonSpinner';
import { useForm } from '../../hooks/useForm';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useUser } from '../../hooks/useUser';
import { delay } from '../../utils/delay';
import { Field, Heading, Input, Label } from '../signup/Shared';
import { IStepFormProps } from './Onboarding';

interface OnboardingForm {
  company: string;
  firstName: string;
  lastName: string;
  role: string;
}

const onboardingFormInitialValues: OnboardingForm = {
  company: '',
  firstName: '',
  lastName: '',
  role: '',
};

export const OnboardingForm = () => {
  const { authUser } = useAuthUser();
  const { updateUser, user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues: onboardingFormInitialValues,
    onSubmit,
  });

  return (
    <React.Fragment>
      <Box mb="24px">
        <Heading>Let's get started</Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <Field mb="24px">
          <Input
            autoFocus={true}
            id="firstName"
            name="firstName"
            onChange={handleInputChange}
            placeholder="Your first name"
            required
            type="firstName"
            value={values.firstName}
          />
          <Label>First name</Label>
        </Field>
        <Field mb="36px">
          <Input
            id="lastName"
            name="lastName"
            onChange={handleInputChange}
            placeholder="Your last name"
            required
            type="lastName"
            value={values.lastName}
          />
          <Label>Last name</Label>
        </Field>
        <Field mb="36px">
          <Input
            id="company"
            name="company"
            onChange={handleInputChange}
            placeholder="Your company"
            required
            type="company"
            value={values.company}
          />
          <Label>Company</Label>
        </Field>
        <Field mb="36px">
          <Input
            id="role"
            name="role"
            onChange={handleInputChange}
            placeholder="Your role"
            required
            type="role"
            value={values.role}
          />
          <Label>Company</Label>
        </Field>
        <Flex justifyContent="flex-end">
          <ButtonSpinner
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
            type="submit"
          >
            {!isSubmitting && 'Done'}
          </ButtonSpinner>
        </Flex>
      </form>
    </React.Fragment>
  );
};
