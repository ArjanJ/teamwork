import React, { FunctionComponent } from 'react';

import { Modal } from '../../components/modal/Modal';

interface ITeamsCreateModalProps {
  hideModal(): void;
}

export const TeamsCreateModal: FunctionComponent<ITeamsCreateModalProps> = ({
  hideModal,
}) => {
  return (
    <Modal hideModal={hideModal}>
      <h1>Create a team</h1>
    </Modal>
  );
};
