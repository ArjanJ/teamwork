import { navigate } from '@reach/router';
import React, { SFC, useEffect, useState } from 'react';

import { useAuthorization } from '../../hooks/useAuthorization';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useForm } from '../../hooks/useForm';
import { useUser } from '../../hooks/useUser';

interface IOnboardingProps {
  path: string;
}

interface IStepFormProps {
  updateStep(step: Step): void;
}

type Step = 'NAME' | 'ROLE';

const NameForm: SFC<IStepFormProps> = ({ updateStep }) => {
  const { authUser } = useAuthUser();
  const { updateUser } = useUser();

  const onSubmit = async () => {
    await updateUser(authUser.uid, values);
    updateStep('ROLE');
  };

  const initialValues = {
    firstName: '',
    lastName: '',
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First name</label>
        <input
          id="firstName"
          name="firstName"
          onChange={handleInputChange}
          required
          type="firstName"
          value={values.firstName}
        />
      </div>
      <div>
        <label>Last name</label>
        <input
          id="lastName"
          name="lastName"
          onChange={handleInputChange}
          required
          type="lastName"
          value={values.lastName}
        />
      </div>
      <div>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

const RoleForm: SFC<IStepFormProps> = ({ updateStep }) => {
  const { authUser } = useAuthUser();
  const { updateUser } = useUser();

  const onSubmit = async () => {
    await updateUser(authUser.uid, values);
    navigate('/');
  };

  const initialValues = {
    role: '',
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues,
    onSubmit,
  });

  const handleBackClick = () => updateStep('NAME');

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Role</label>
        <input
          id="role"
          name="role"
          onChange={handleInputChange}
          required
          type="role"
          value={values.role}
        />
      </div>
      <div>
        <button onClick={handleBackClick} type="button">
          Back
        </button>
      </div>
      <div>
        <button type="submit">Finish</button>
      </div>
    </form>
  );
};

export const Onboarding: SFC<IOnboardingProps> = () => {
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
    <div>
      <h1>Onboarding</h1>
      {step === 'NAME' && <NameForm updateStep={updateStep} />}
      {step === 'ROLE' && <RoleForm updateStep={updateStep} />}
    </div>
  );
};

export default Onboarding;
