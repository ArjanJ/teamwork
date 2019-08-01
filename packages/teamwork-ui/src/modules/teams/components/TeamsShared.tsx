import { LinkProps } from '@reach/router';
import { darken } from 'polished';
import styled from 'styled-components';

import { PoseListStaggerList } from '../../../components/pose/PoseListStagger';
import { Easing } from '../../../styles/Easing';

export const TeamsGrid = styled(PoseListStaggerList)`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  list-style-type: none;
  min-height: 94px;
`;

export const TeamsCard = styled.div<LinkProps<void>>`
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  display: block;
  padding: 24px;
  text-decoration: none;
  transition: all 0.35s ${Easing.OUT};
  width: 100%;

  &:hover {
    background: ${darken(0.08, 'white')};
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.16);
  }
`;

export const TeamsDivider = styled.div`
  background: white;
  height: 1px;
  margin: 48px 0;
  opacity: 0.25;
`;
