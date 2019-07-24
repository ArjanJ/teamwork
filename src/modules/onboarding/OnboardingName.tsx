import React, { FunctionComponent, useState } from 'react';
import { Box, Flex } from 'rebass';

import { ButtonSpinner } from '../../components/button-spinner/ButtonSpinner';
import { useForm } from '../../hooks/useForm';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useUser } from '../../hooks/useUser';
import { delay } from '../../utils/delay';
import { Field, Heading, Input, Label } from '../signup/Shared';
import { IStepFormProps } from './Onboarding';

export const OnboardingName: FunctionComponent<IStepFormProps> = ({
  updateStep,
}) => {
  const { authUser } = useAuthUser();
  const { updateUser, user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
    await updateUser(authUser.uid, values);
    await delay(1600);
    updateStep('ROLE');
  };

  const initialValues = user || {
    firstName: '',
    lastName: '',
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues,
    onSubmit,
  });

  return (
    <React.Fragment>
      <Box mb="24px">
        <Heading>What's your name?</Heading>
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
        <Flex justifyContent="flex-end">
          <ButtonSpinner
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
            type="submit"
          >
            {!isSubmitting && 'Next'}
          </ButtonSpinner>
        </Flex>
      </form>
    </React.Fragment>
  );
};
