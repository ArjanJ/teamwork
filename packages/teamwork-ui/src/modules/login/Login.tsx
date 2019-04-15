import { navigate } from '@reach/router';
import React, { SFC, useState } from 'react';

import { auth, firebase } from '../../firebase';
import { useForm } from '../../hooks/useForm';

interface LoginProps {
  path: string;
}

export const Login: SFC<LoginProps> = () => {
  const [hasError, setError] = useState(false);

  const signInWithGoogle = async () => {
    try {
      await auth.doSignInWithPopup(firebase.GoogleProvider);
      navigate('/');
    } catch (err) {
      setError(true);
    }
  };

  const onSubmit = async () => {
    const { email, password } = values;

    try {
      await auth.doSignInWithEmailAndPassword(email, password);
    } catch (err) {
      setError(true);
    }
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues: { email: '', password: '' },
    onSubmit,
  });

  return (
    <form>
      <h1>Login</h1>
      <button onClick={signInWithGoogle} type="button">
        Login with Google
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
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
