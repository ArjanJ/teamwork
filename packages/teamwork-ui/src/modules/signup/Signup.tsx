import { navigate } from '@reach/router';
import React, { SFC, useState } from 'react';

import { auth, firebase } from '../../firebase';
import { useForm } from '../../hooks/useForm';

interface SignupProps {
  path: string;
}

export const Signup: SFC<SignupProps> = () => {
  const [hasError, setError] = useState(false);

  const signupWithGoogle = async () => {
    try {
      await auth.doSignInWithPopup(firebase.GoogleProvider);
      navigate('/');
    } catch (err) {
      setError(true);
    }
  };

  const onSubmit = () => {
    console.log(values);
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues: { email: '', password: '', confirmPassword: '' },
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>
      <button onClick={signupWithGoogle} type="button">
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
