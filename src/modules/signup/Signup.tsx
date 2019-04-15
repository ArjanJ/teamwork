import { navigate } from '@reach/router';
import React, { SFC, useState } from 'react';

import { auth, firebase } from '../../firebase';

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

  return (
    <form>
      <h1>Signup</h1>
      <button onClick={signupWithGoogle} type="button">
        Register with Google
      </button>
    </form>
  );
};

export default Signup;
