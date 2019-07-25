import React, { FunctionComponent, useState } from 'react';
import { Box, Flex } from 'rebass';

import { ButtonSpinner } from '../../components/button-spinner/ButtonSpinner';
import { useForm } from '../../hooks/useForm';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useUser } from '../../hooks/useUser';
import { Color } from '../../styles/Color';
import { delay } from '../../utils/delay';
import { Field, Heading, Input, Label } from '../signup/Shared';

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
  const { createUser, user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);

    const user = {
      company: {
        name: values.company,
      },
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role,
      teams: [],
    };

    const res = await createUser(user);
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues: onboardingFormInitialValues,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Field mb="36px">
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
        <Label>Role</Label>
      </Field>
      <Flex justifyContent="flex-end">
        <ButtonSpinner
          disabled={isSubmitting}
          isSubmitting={isSubmitting}
          primary={Color.AQUA}
          secondary={Color.BLUE_PERSIAN}
          type="submit"
        >
          <span>Next</span>
        </ButtonSpinner>
      </Flex>
    </form>
  );
};
