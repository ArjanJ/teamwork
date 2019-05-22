import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import posed, { PoseGroup } from 'react-pose';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import { ButtonSpinner } from '../../components/button-spinner/ButtonSpinner';
import { Header } from '../../components/header/Header';
import { useAuthorization } from '../../hooks/useAuthorization';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useForm } from '../../hooks/useForm';
import { useUser } from '../../hooks/useUser';
import { Easing } from '../../styles/Easing';
import { Backdrop, Field, Heading, Input, Label } from '../signup/Shared';
import { delay } from '../../utils/delay';

interface IStepFormProps {
  updateStep(step: Step): void;
}

type Step = 'NAME' | 'ROLE' | 'DONE';

const NameForm: FunctionComponent<IStepFormProps> = ({ updateStep }) => {
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

const RoleForm: FunctionComponent<IStepFormProps> = ({ updateStep }) => {
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

export const Onboarding: FunctionComponent<RouteComponentProps> = () => {
  useAuthorization('/login');

  const { authUser } = useAuthUser();
  const { getUser, isFetching, user } = useUser();

  useEffect(() => {
    if (authUser) {
      // Fetch user if we haven't already.
      if (!user && !isFetching) {
        getUser(authUser.uid);
      }

      // If the user has filled out the info already go to dashboard.
      if (user && user.firstName && user.lastName && user.role) {
        navigate('/');
      }
    }
  });

  const [step, updateStep] = useState<Step>('NAME');

  return (
    <Backdrop>
      <Header />
      <Wrapper>
        <Title>Welcome to Teamwork!</Title>
        {user !== null && (
          <PoseGroup>
            {step === 'NAME' && (
              <FormAnimation key="shade">
                <NameForm updateStep={updateStep} />
              </FormAnimation>
            )}
            {step === 'ROLE' && (
              <FormAnimation key="shade2">
                <RoleForm updateStep={updateStep} />
              </FormAnimation>
            )}
          </PoseGroup>
        )}
      </Wrapper>
    </Backdrop>
  );
};

const FormAnimation = posed.div({
  enter: {
    opacity: 1,
    delay: 300,
  },
  exit: {
    y: 80,
    opacity: 0,
    transition: { duration: 300 },
  },
});

const Wrapper = styled.div`
  justify-self: center;
  margin-bottom: 148px;
  min-height: 405px;
  width: 460px;
`;

const Title = styled.h1`
  color: #f8cf83;
  font-size: 36px;
  margin-bottom: 64px;
`;

const BackButton = styled.button`
  background: none;
  color: white;
  font-weight: 600;
  opacity: 0.7;
  transition: opacity 0.35s ${Easing.OUT};

  &:hover {
    opacity: 1;
  }
`;

export default Onboarding;
