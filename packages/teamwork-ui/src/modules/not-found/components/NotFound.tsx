import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Color } from '../../../styles/Color';

export const NotFound: FunctionComponent<RouteComponentProps> = () => (
  <NotFoundWrapper>
    <NotFoundTitle>Oops, this page doesn't exist yet.</NotFoundTitle>
  </NotFoundWrapper>
);

const NotFoundWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  padding: 24px;
`;

const NotFoundTitle = styled.h1`
  color: ${Color.ORANGE};
  font-size: 30px;
`;

export default NotFound;
