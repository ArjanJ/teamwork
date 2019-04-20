import { navigate } from '@reach/router';
import React, { SFC, useState } from 'react';

import { auth } from '../../firebase';
import { useForm } from '../../hooks/useForm';
import { useSocialSignIn } from '../../hooks/useSocialSignIn';

interface LoginProps {
  path: string;
}

export const Login: SFC<LoginProps> = () => {
  const onSocialSignInSuccess = () => {
    if (isNewUser) {
      navigate('/onboarding');
    } else {
      navigate('/');
    }
  };

  const { hasError, isNewUser, signIn } = useSocialSignIn({
    onSuccess: onSocialSignInSuccess,
  });

  const onSubmit = async () => {
    const { email, password } = values;
    const [emailPasswordError, setEmailPasswordError] = useState(false);

    try {
      await auth.doSignInWithEmailAndPassword(email, password);
    } catch (err) {
      setEmailPasswordError(true);
    }
  };

  const { handleInputChange, handleSubmit, values } = useForm({
    initialValues: { email: '', password: '' },
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <button onClick={signIn} type="button">
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
