import { Link, navigate } from '@reach/router';
import React, { SFC, useState } from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

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
    <Backdrop>
      <Header>
        <a href="#">
          <TeamworkLogo />
        </a>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Box mb="24px">
          <Heading>Create your account</Heading>
          <P>Register with your work Google account</P>
        </Box>
        <Box mb="24px">
          <BigButton onClick={signIn} type="button">
            <GoogleLogo />
            <span>Register with Google</span>
          </BigButton>
        </Box>
        <Separator mb="36px">
          <P>Or, register with your email</P>
        </Separator>
        <Box mb="24px">
          <Label>Email</Label>
          <Input
            id="email"
            name="email"
            onChange={handleInputChange}
            placeholder="Your email"
            required
            type="email"
            value={values.email}
          />
        </Box>
        <Box mb="24px">
          <Label>Password</Label>
          <Input
            id="password"
            name="password"
            onChange={handleInputChange}
            placeholder="Create password"
            required
            type="password"
            value={values.password}
          />
        </Box>
        <Box mb="36px">
          <Label>Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleInputChange}
            placeholder="Confirm password"
            required
            type="password"
            value={values.confirmPassword}
          />
        </Box>
        <Flex justifyContent="center" mb="24px">
          <Button type="submit">Create account</Button>
        </Flex>
        <Box>
          <P>
            Already have an account?{' '}
            <Link to="/signup">
              <strong>Login</strong>
            </Link>
          </P>
        </Box>
      </Form>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  background-color: #0900c3;
  display: grid;
  min-height: 100vh;
`;

const Header = styled.header`
  padding: 24px;
`;

const Heading = styled.h1`
  color: #f8cf83;
  font-size: 30px;
  margin-bottom: 10px;
`;

const P = styled.p`
  color: white;
  font-weight: 500;
`;

const Form = styled.form`
  justify-self: center;
  max-width: 360px;
  text-align: center;
  width: 100%;
`;

const BigButton = styled.button`
  align-items: center;
  background: #f3f3f3;
  border-radius: 2px;
  color: #2d77ee;
  display: flex;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  padding: 0 12px;
  width: 100%;

  span {
    flex: 1;
  }
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  height: 48px;
  padding: 0 16px;
  transition: all 0.2s ease-out;
  width: 100%;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus,
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Label = styled.label`
  display: block;
  height: 0;
  visibility: hidden;
`;

const Button = styled.button`
  background: #2d77ee;
  border-radius: 2px;
  color: white;
  font-size: 15px;
  font-weight: 700;
  height: 40px;
  padding: 0 20px;
`;

const Separator = styled(Box)`
  position: relative;
  z-index: 1;

  &::before {
    background: white;
    content: '';
    height: 1px;
    left: 0;
    opacity: 0.5;
    position: absolute;
    top: 50%;
    width: 100%;
    z-index: -2;
  }

  &::after {
    background: #0900c3;
    content: '';
    height: 100%;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    width: 64%;
    z-index: -1;
  }
`;

const GoogleLogo = () => (
  <svg
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 48 48"
  >
    <defs>
      <path
        id="a"
        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
      />
    </defs>
    <clipPath id="b">
      <use xlinkHref="#a" overflow="visible" />
    </clipPath>
    <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
    <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
    <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
    <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
  </svg>
);

const TeamworkLogo = () => (
  <svg
    width="92"
    height="15"
    viewBox="0 0 92 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.542 13.532C7.266 13.736 6.924 13.892 6.516 14C6.12 14.096 5.7 14.144 5.256 14.144C4.104 14.144 3.21 13.85 2.574 13.262C1.95 12.674 1.638 11.81 1.638 10.67V6.692H0.144V4.532H1.638V2.174H4.446V4.532H6.858V6.692H4.446V10.634C4.446 11.042 4.548 11.36 4.752 11.588C4.968 11.804 5.268 11.912 5.652 11.912C6.096 11.912 6.474 11.792 6.786 11.552L7.542 13.532ZM17.5854 9.194C17.5854 9.23 17.5674 9.482 17.5314 9.95H10.2054C10.3374 10.55 10.6494 11.024 11.1414 11.372C11.6334 11.72 12.2454 11.894 12.9774 11.894C13.4814 11.894 13.9254 11.822 14.3094 11.678C14.7054 11.522 15.0714 11.282 15.4074 10.958L16.9014 12.578C15.9894 13.622 14.6574 14.144 12.9054 14.144C11.8134 14.144 10.8474 13.934 10.0074 13.514C9.16744 13.082 8.51944 12.488 8.06344 11.732C7.60744 10.976 7.37944 10.118 7.37944 9.158C7.37944 8.21 7.60144 7.358 8.04544 6.602C8.50144 5.834 9.11944 5.24 9.89944 4.82C10.6914 4.388 11.5734 4.172 12.5454 4.172C13.4934 4.172 14.3514 4.376 15.1194 4.784C15.8874 5.192 16.4874 5.78 16.9194 6.548C17.3634 7.304 17.5854 8.186 17.5854 9.194ZM12.5634 6.296C11.9274 6.296 11.3934 6.476 10.9614 6.836C10.5294 7.196 10.2654 7.688 10.1694 8.312H14.9394C14.8434 7.7 14.5794 7.214 14.1474 6.854C13.7154 6.482 13.1874 6.296 12.5634 6.296ZM22.3772 4.172C23.8772 4.172 25.0292 4.532 25.8332 5.252C26.6372 5.96 27.0392 7.034 27.0392 8.474V14H24.4112V12.794C23.8832 13.694 22.8992 14.144 21.4592 14.144C20.7152 14.144 20.0672 14.018 19.5152 13.766C18.9752 13.514 18.5612 13.166 18.2732 12.722C17.9852 12.278 17.8412 11.774 17.8412 11.21C17.8412 10.31 18.1772 9.602 18.8492 9.086C19.5332 8.57 20.5832 8.312 21.9992 8.312H24.2312C24.2312 7.7 24.0452 7.232 23.6732 6.908C23.3012 6.572 22.7432 6.404 21.9992 6.404C21.4832 6.404 20.9732 6.488 20.4692 6.656C19.9772 6.812 19.5572 7.028 19.2092 7.304L18.2012 5.342C18.7292 4.97 19.3592 4.682 20.0912 4.478C20.8352 4.274 21.5972 4.172 22.3772 4.172ZM22.1612 12.254C22.6412 12.254 23.0672 12.146 23.4392 11.93C23.8112 11.702 24.0752 11.372 24.2312 10.94V9.95H22.3052C21.1532 9.95 20.5772 10.328 20.5772 11.084C20.5772 11.444 20.7152 11.732 20.9912 11.948C21.2792 12.152 21.6692 12.254 22.1612 12.254ZM41.2626 4.172C42.4746 4.172 43.4346 4.532 44.1426 5.252C44.8626 5.96 45.2226 7.028 45.2226 8.456V14H42.4146V8.888C42.4146 8.12 42.2526 7.55 41.9286 7.178C41.6166 6.794 41.1666 6.602 40.5786 6.602C39.9186 6.602 39.3966 6.818 39.0126 7.25C38.6286 7.67 38.4366 8.3 38.4366 9.14V14H35.6286V8.888C35.6286 7.364 35.0166 6.602 33.7926 6.602C33.1446 6.602 32.6286 6.818 32.2446 7.25C31.8606 7.67 31.6686 8.3 31.6686 9.14V14H28.8606V4.316H31.5426V5.432C31.9026 5.024 32.3406 4.712 32.8566 4.496C33.3846 4.28 33.9606 4.172 34.5846 4.172C35.2686 4.172 35.8866 4.31 36.4386 4.586C36.9906 4.85 37.4346 5.24 37.7706 5.756C38.1666 5.252 38.6646 4.862 39.2646 4.586C39.8766 4.31 40.5426 4.172 41.2626 4.172ZM62.3957 4.316L58.8857 14H56.1857L54.0077 7.988L51.7577 14H49.0577L45.5657 4.316H48.2117L50.4977 10.868L52.8737 4.316H55.2497L57.5537 10.868L59.9117 4.316H62.3957ZM67.3255 14.144C66.3055 14.144 65.3875 13.934 64.5715 13.514C63.7675 13.082 63.1375 12.488 62.6815 11.732C62.2255 10.976 61.9975 10.118 61.9975 9.158C61.9975 8.198 62.2255 7.34 62.6815 6.584C63.1375 5.828 63.7675 5.24 64.5715 4.82C65.3875 4.388 66.3055 4.172 67.3255 4.172C68.3455 4.172 69.2575 4.388 70.0615 4.82C70.8655 5.24 71.4955 5.828 71.9515 6.584C72.4075 7.34 72.6355 8.198 72.6355 9.158C72.6355 10.118 72.4075 10.976 71.9515 11.732C71.4955 12.488 70.8655 13.082 70.0615 13.514C69.2575 13.934 68.3455 14.144 67.3255 14.144ZM67.3255 11.84C68.0455 11.84 68.6335 11.6 69.0895 11.12C69.5575 10.628 69.7915 9.974 69.7915 9.158C69.7915 8.342 69.5575 7.694 69.0895 7.214C68.6335 6.722 68.0455 6.476 67.3255 6.476C66.6055 6.476 66.0115 6.722 65.5435 7.214C65.0755 7.694 64.8415 8.342 64.8415 9.158C64.8415 9.974 65.0755 10.628 65.5435 11.12C66.0115 11.6 66.6055 11.84 67.3255 11.84ZM76.4744 5.594C76.8104 5.126 77.2604 4.772 77.8244 4.532C78.4004 4.292 79.0604 4.172 79.8044 4.172V6.764C79.4924 6.74 79.2824 6.728 79.1744 6.728C78.3704 6.728 77.7404 6.956 77.2844 7.412C76.8284 7.856 76.6004 8.528 76.6004 9.428V14H73.7924V4.316H76.4744V5.594ZM84.912 10.202L83.562 11.534V14H80.754V0.643999H83.562V8.204L87.666 4.316H91.014L86.982 8.42L91.374 14H87.972L84.912 10.202Z"
      fill="white"
    />
  </svg>
);

export default Signup;
