import {
  ArrayHelpers,
  FieldArray,
  Form,
  Formik,
  FormikActions,
  FormikProps,
} from 'formik';
import React, { FunctionComponent } from 'react';
import { Box, Flex } from 'rebass';

import {
  Team,
  TeamMember,
} from '../../../../functions/src/modules/teams/types';
import { ButtonSpinner } from '../../../components/button-spinner/ButtonSpinner';
import {
  Modal,
  ModalCancelButton,
  ModalSubheading,
  ModalText,
} from '../../../components/modal/Modal';
import { Color } from '../../../styles/Color';
import { delay } from '../../../utils/delay';
import { useTeams } from '../useTeams';
import {
  FieldBox,
  newTeamMember,
  TeamMemberFieldArray,
} from './TeamsCreateTeamModal';

interface TeamsAddMembersModalProps {
  hideModal(): void;
  team: Team;
}

interface AddTeamMembersFormValues {
  members: TeamMember[];
}

const initialValues = {
  members: [newTeamMember],
};

interface AddTeamMembersFormProps
  extends FormikProps<AddTeamMembersFormValues> {
  hideModal(): void;
}

const AddTeamMembersForm: FunctionComponent<AddTeamMembersFormProps> = ({
  errors,
  hideModal,
  isSubmitting,
  values,
}) => {
  const renderFieldArray = (arrayHelpers: ArrayHelpers) => (
    <TeamMemberFieldArray {...arrayHelpers} values={values} />
  );

  return (
    <Form>
      <FieldBox mb="30px">
        <ModalSubheading>Who's on your team?</ModalSubheading>
        <ModalText>Add as many teammates as you'd like.</ModalText>
        <FieldArray name="members" render={renderFieldArray} />
      </FieldBox>
      <Flex justifyContent="flex-end">
        <Flex>
          <ModalCancelButton
            disabled={isSubmitting}
            onClick={hideModal}
            type="button"
          >
            Cancel
          </ModalCancelButton>
          <Box ml="16px">
            <ButtonSpinner
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              primary={Color.AQUA}
              secondary={Color.NAVY}
              type="submit"
              width={180}
            >
              <span>Add team members</span>
            </ButtonSpinner>
          </Box>
        </Flex>
      </Flex>
    </Form>
  );
};

export const TeamsAddMembersModal: FunctionComponent<
  TeamsAddMembersModalProps
> = ({ hideModal, team }) => {
  const { updateTeam } = useTeams();

  const onSubmit = async (
    values: AddTeamMembersFormValues,
    actions: FormikActions<AddTeamMembersFormValues>,
  ) => {
    // Add new memebrs to list of current members.
    const members = [...team.members, ...values.members];

    // Save it.
    await updateTeam(team.id, { members });

    // So the transition of the loader isn't janky.
    await delay(1200);
    actions.setSubmitting(false);

    hideModal();
  };

  const renderAddTeamMembersForm = (
    formikProps: FormikProps<AddTeamMembersFormValues>,
  ) => <AddTeamMembersForm {...formikProps} hideModal={hideModal} />;

  return (
    <Modal hideModal={hideModal} title="Add team members">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={renderAddTeamMembersForm}
      />
    </Modal>
  );
};
