import { navigate } from '@reach/router';
import React, { SFC, useState } from 'react';

import { auth } from '../../firebase';
import { useForm } from '../../hooks/useForm';
import { useSocialSignIn } from '../../hooks/useSocialSignIn';
import { useUser } from '../../hooks/useUser';

interface SignupProps {
  path: string;
}

export const Signup: SFC<SignupProps> = () => {
  const { createUser } = useUser();
  const onSocialSignInSuccess = (isNewUser: boolean) => {
    if (isNewUser) {
      createUser({
        firstName: '',
        lastName: '',
        role: '',
      });
      navigate('/onboarding');
    } else {
      navigate('/');
    }
  };

  const { hasError, signIn } = useSocialSignIn({
    onSuccess: onSocialSignInSuccess,
  });

  const onEmailPasswordSignInSuccess = async () => {
    const { email, password } = values;
    const [emailPasswordError, setEmailPasswordError] = useState(false);

    try {
      await auth.doCreateUserWithEmailAndPassword(email, password);
    } catch (err) {
      setEmailPasswordError(true);
    }
  };

  const initialFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues: initialFormValues,
    onSubmit: onEmailPasswordSignInSuccess,
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>
      <button onClick={signIn} type="button">
        Register with Google
      </button>
      <div>
        <label>Email</label>
        <input
          id="email"
          name="email"
          onChange={handleInputChange}
          type="email"
          value={values.email}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          id="password"
          name="password"
          onChange={handleInputChange}
          type="password"
          value={values.password}
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleInputChange}
          type="password"
          value={values.confirmPassword}
        />
      </div>
      <div>
        <button type="submit">Create account</button>
      </div>
    </form>
  );
};

export default Signup;
