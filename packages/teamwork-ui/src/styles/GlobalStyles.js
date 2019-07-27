import { createGlobalStyle } from 'styled-components';

import { Color } from './Color';

export const GlobalStyles = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  :root {
    -moz-osx-font-smoothing: grayscale;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    cursor: default;
    font-size: 0.625rem;
    text-rendering: optimizeLegibility;
    text-size-adjust: 100%;
  }

  body {
    background: ${Color.BLUE_PERSIAN};
    font-size: 1.6rem;
    line-height: 1.5;
    margin: 0;
  }

  a {
    color: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
  }

  button,
  input,
  select {
    border: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
  }

  button {
    cursor: pointer;

    &:active,
    &:focus {
      outline: none;
    }
  }

  input {
    &:focus {
      outline: none;
    }
  }

  ul {
    margin: 0;
    padding: 0;
  }
`;
