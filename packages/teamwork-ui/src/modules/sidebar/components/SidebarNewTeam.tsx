import { rgba } from 'polished';
import React from 'react';
import { useModal } from 'react-modal-hook';
import styled from 'styled-components';

import { AddCircleIcon } from '../../../components/icons/AddCircleIcon';
import { Easing } from '../../../styles/Easing';
import { TeamsCreateModal } from '../../teams/components/TeamsCreateTeamModal';

export const SidebarNewTeam = () => {
  const [showModal, hideModal] = useModal(() => (
    <TeamsCreateModal hideModal={hideModal} />
  ));

  return (
    <SidebarNewTeamWrapper onClick={showModal}>
      <AddCircleIcon />
      <span>New team</span>
    </SidebarNewTeamWrapper>
  );
};

const SidebarNewTeamWrapper = styled.button`
  align-items: center;
  background: none;
  border-top: 1px solid ${rgba('white', 0.25)};
  bottom: 0;
  color: white;
  display: flex;
  height: 64px;
  left: 0;
  opacity: 0.75;
  padding-left: 36px;
  position: fixed;
  transition: opacity 0.35s ${Easing.OUT};
  width: 280px;

  span {
    margin-left: 12px;
  }

  &:hover {
    opacity: 1;
  }
`;
