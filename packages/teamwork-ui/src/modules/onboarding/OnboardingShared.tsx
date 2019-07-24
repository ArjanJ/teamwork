import styled from 'styled-components';

import { Easing } from '../../styles/Easing';

export const BackButton = styled.button`
  background: none;
  color: white;
  font-weight: 600;
  opacity: 0.7;
  transition: opacity 0.35s ${Easing.OUT};

  &:hover {
    opacity: 1;
  }
`;
