import { navigate } from '@reach/router';
import {
  ArrayHelpers,
  Field,
  FieldArray,
  FieldProps,
  Form,
  Formik,
  FormikActions,
  FormikProps,
} from 'formik';
import { darken } from 'polished';
import React, { FunctionComponent } from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import { TeamMember } from '../../../../functions/src/modules/teams/types';
import { ButtonSpinner } from '../../../components/button-spinner/ButtonSpinner';
import { FormField } from '../../../components/form-field/FormField';
import { AddIcon } from '../../../components/icons/AddIcon';
import { TrashIcon } from '../../../components/icons/TrashIcon';
import { Input } from '../../../components/input/Input';
import { Modal } from '../../../components/modal/Modal';
import { Color } from '../../../styles/Color';
import { Easing } from '../../../styles/Easing';
import { AsyncActionStatus } from '../../../utils/asyncAction';
import { delay } from '../../../utils/delay';
import { useAuthUser } from '../../auth/hooks/useAuthUser';
import { useUser } from '../../user/useUser';
import { useTeams } from '../useTeams';
import * as TeamsUtils from '../utils';

interface TeamsCreateModalProps {
  hideModal(): void;
}

interface CreateTeamFormValues {
  name: string;
  members: TeamMember[];
}

const newTeamMember: TeamMember = { email: '', firstName: '', lastName: '' };

const initialValues = {
  members: [newTeamMember],
  name: '',
};

const TeamNameField = ({ field }: FieldProps<CreateTeamFormValues>) => (
  <FormField label="Team Name">
    <Input
      {...field}
      autoFocus={true}
      placeholder="Your team name"
      required={true}
      type="text"
    />
  </FormField>
);

const EmailField = ({ field }: FieldProps<CreateTeamFormValues>) => (
  <FormField label="Email">
    <Input {...field} placeholder="Email" required={true} type="email" />
  </FormField>
);
const FirstNameField = ({ field }: FieldProps<CreateTeamFormValues>) => (
  <FormField label="First Name">
    <Input {...field} placeholder="First Name" required={true} type="text" />
  </FormField>
);

const LastNameField = ({ field }: FieldProps<CreateTeamFormValues>) => (
  <FormField label="Last Name">
    <Input {...field} placeholder="Last Name" required={true} type="text" />
  </FormField>
);

interface TeamMemberFieldArrayProps extends ArrayHelpers {
  values: CreateTeamFormValues;
}

const TeamMemberFieldArray: FunctionComponent<TeamMemberFieldArrayProps> = ({
  push,
  remove,
  values,
}) => {
  const onAddClick = () => push(newTeamMember);

  return (
    <div>
      {values.members && values.members.length > 0
        ? values.members.map((member, index) => {
            const onRemoveClick = () => remove(index);

            return (
              <Flex alignItems="center" key={index} mb="24px">
                <FieldBox>
                  <Field name={`members[${index}].email`} render={EmailField} />
                </FieldBox>
                <FieldBox ml="18px">
                  <Field
                    name={`members[${index}].firstName`}
                    render={FirstNameField}
                  />
                </FieldBox>
                <FieldBox ml="18px">
                  <Field
                    name={`members[${index}].lastName`}
                    render={LastNameField}
                  />
                </FieldBox>
                <Box ml="12px">
                  <RemoveTeammateButton onClick={onRemoveClick} type="button">
                    <TrashIcon />
                  </RemoveTeammateButton>
                </Box>
              </Flex>
            );
          })
        : null}
      <Box mt="6px">
        <AddTeammateButton onClick={onAddClick} type="button">
          <AddIcon />
        </AddTeammateButton>
      </Box>
    </div>
  );
};

interface CreateTeamFormProps extends FormikProps<CreateTeamFormValues> {
  hideModal(): void;
}

const CreateTeamForm: FunctionComponent<CreateTeamFormProps> = ({
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
      <FieldBox mb="48px">
        <FieldTitle>What's your team name?</FieldTitle>
        <P>Puns are encouraged.</P>
        <Field name="name" render={TeamNameField} />
      </FieldBox>
      <FieldBox mb="48px">
        <FieldTitle>Who's on your team?</FieldTitle>
        <P>Add as many teammates as you'd like.</P>
        <FieldArray name="members" render={renderFieldArray} />
      </FieldBox>
      <Flex justifyContent="flex-end">
        <Flex>
          <CancelButton
            disabled={isSubmitting}
            onClick={hideModal}
            type="button"
          >
            Cancel
          </CancelButton>
          <Box ml="16px">
            <ButtonSpinner
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              primary={Color.AQUA}
              secondary={Color.NAVY}
              type="submit"
              width={144}
            >
              <span>Create Team</span>
            </ButtonSpinner>
          </Box>
        </Flex>
      </Flex>
    </Form>
  );
};

export const TeamsCreateModal: FunctionComponent<TeamsCreateModalProps> = ({
  hideModal,
}) => {
  const { createTeam } = useTeams();
  const { authUser } = useAuthUser();
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const onSubmit = async (
    values: CreateTeamFormValues,
    actions: FormikActions<CreateTeamFormValues>,
  ) => {
    // Replace certain characters with a '-' so they become URL friendly.
    const normalizedTeamName = TeamsUtils.normalizeTeamName(values.name);

    // This is the current user, they will be the owner of the team.
    const self = {
      email: authUser.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const { status } = await createTeam({
      company: { id: '', name: '', owner: self },
      displayName: values.name,
      id: '',
      members: [...values.members, self],
      name: normalizedTeamName,
    });

    // If something failed, we stop here and keep the modal open.
    if (status !== AsyncActionStatus.SUCCEEDED) {
      return null;
    }

    // To prevent jankiness from too fast API.
    await delay(1200);
    actions.setSubmitting(false);

    hideModal();

    // Go to the team page of the team that was just created.
    navigate(`/teams/${normalizedTeamName}`);
  };

  const renderCreateTeamForm = (
    formikProps: FormikProps<CreateTeamFormValues>,
  ) => <CreateTeamForm {...formikProps} hideModal={hideModal} />;

  return (
    <Modal hideModal={hideModal} title="Create your team" width={704}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={renderCreateTeamForm}
      />
    </Modal>
  );
};

const FieldTitle = styled.p`
  color: white;
  display: block;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const P = styled.p`
  color: white;
  margin-bottom: 16px;
  opacity: 0.75;
`;

const FieldBox = styled(Box)`
  flex: 1;
`;

const AddTeammateButton = styled.button`
  background: ${Color.BLUE_SKY};
  border-radius: 50%;
  height: 36px;
  transition: background 0.35s ${Easing.OUT};
  width: 36px;

  &:hover {
    background: ${darken(0.1, Color.BLUE_SKY)};
  }
`;

const RemoveTeammateButton = styled.button`
  background: none;
  height: 36px;
  opacity: 0.5;
  padding: 0;
  transition: opacity 0.35s ${Easing.OUT};
  width: 16px;

  &:hover {
    opacity: 1;
  }
`;

const CancelButton = styled.button`
  background: none;
  color: white;
  font-weight: 700;
  opacity: 0.7;
  padding: 0 16px;
  transition: opacity 0.35s ${Easing.OUT};

  &:hover {
    opacity: 1;
  }
`;

const ErrorMessage = styled.p`
  color: #ff7272;
  font-weight: 700;
  margin: 4px 12px;
`;
