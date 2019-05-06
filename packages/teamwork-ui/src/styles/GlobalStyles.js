import { createGlobalStyle } from 'styled-components';

import BasisGrotesqueRegular from './fonts/regular.woff2';
import BasisGrotesqueMedium from './fonts/medium.woff2';
import BasisGrotesqueBold from './fonts/bold.woff2';

import { Color } from './Color';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Basis Grotesque';
    src: local('Basis Grotesque Regular'), url('${BasisGrotesqueRegular}') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: 'Basis Grotesque';
    src: local('Basis Grotesque Medium'), url('${BasisGrotesqueMedium}') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: 'Basis Grotesque';
    src: local('Basis Grotesque Bold'), url('${BasisGrotesqueBold}') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: fallback;
  }

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
    font-family:
      "Basis Grotesque",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Helvetica,
      Arial,
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-size: 0.625rem;
    text-rendering: optimizeLegibility;
    text-size-adjust: 100%;
  }

  body {
    background: ${Color.BLUE_RAGE};
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
