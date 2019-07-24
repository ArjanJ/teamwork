import { navigate } from '@reach/router';
import React, { FunctionComponent, useState } from 'react';
import { Box, Flex } from 'rebass';

import { ButtonSpinner } from '../../components/button-spinner/ButtonSpinner';
import { useForm } from '../../hooks/useForm';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useUser } from '../../hooks/useUser';
import { delay } from '../../utils/delay';
import { Field, Heading, Input, Label } from '../signup/Shared';
import { IStepFormProps } from './Onboarding';
import { BackButton } from './OnboardingShared';

export const OnboardingRole: FunctionComponent<IStepFormProps> = ({
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
    await delay(300);
    navigate('/');
  };

  const initialValues = user || {
    role: '',
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues,
    onSubmit,
  });

  const handleBackClick = () => updateStep('NAME');

  return (
    <React.Fragment>
      <Box mb="24px">
        <Heading>What's your role?</Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <Field mb="36px">
          <Input
            autoFocus={true}
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
        <Flex justifyContent="space-between">
          <Box>
            <BackButton onClick={handleBackClick} type="button">
              Back
            </BackButton>
          </Box>
          <Box>
            <ButtonSpinner
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              type="submit"
            >
              {!isSubmitting && 'Finish'}
            </ButtonSpinner>
          </Box>
        </Flex>
      </form>
    </React.Fragment>
  );
};
