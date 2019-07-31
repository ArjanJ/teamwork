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
import { darken, rgba } from 'polished';
import React, { FunctionComponent } from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import {
  Team,
  TeamMember,
} from '../../../../functions/src/modules/teams/types';
import { ButtonSpinner } from '../../../components/button-spinner/ButtonSpinner';
import { Modal } from '../../../components/modal/Modal';
import { Color } from '../../../styles/Color';
import { Easing } from '../../../styles/Easing';
import { delay } from '../../../utils/delay';
import { useTeams } from '../useTeams';

interface TeamsAddMembersModalProps {
  hideModal(): void;
  team: Team;
}

interface TeamFormValues {
  members: TeamMember[];
}

const emptyTeammate: TeamMember = { email: '', firstName: '', lastName: '' };
const initialValues = {
  members: [emptyTeammate],
};

export const TeamsAddMembersModal: FunctionComponent<
  TeamsAddMembersModalProps
> = ({ hideModal, team }) => {
  console.log('inmodal', team);
  const { updateTeam } = useTeams();

  return (
    <Modal hideModal={hideModal} title="Add team members">
      <Formik
        initialValues={initialValues}
        onSubmit={async (
          values: TeamFormValues,
          actions: FormikActions<TeamFormValues>,
        ) => {
          // Add new memebrs to list of current members.
          const members = [...team.members, ...values.members];
          // Save it.
          await updateTeam(team.id, { members });
          // So the transition of the loader isn't janky.
          await delay(2000);
          actions.setSubmitting(false);
          hideModal();
        }}
        render={({
          errors,
          isSubmitting,
          values,
        }: FormikProps<TeamFormValues>) => (
          <Form>
            <FieldBox mb="30px">
              <Label>Who's on your team?</Label>
              <P>Add as many teammates as you'd like.</P>
              <FieldArray
                name="members"
                render={({ push, remove }: ArrayHelpers) => {
                  return (
                    <div>
                      {values.members && values.members.length > 0
                        ? values.members.map((member, index) => (
                            <div key={index}>
                              <Flex alignItems="center">
                                <FieldBox mb="12px">
                                  <Field
                                    name={`members[${index}].email`}
                                    render={({
                                      field,
                                    }: FieldProps<TeamFormValues>) => (
                                      <Input
                                        {...field}
                                        autoFocus={true}
                                        placeholder="Email"
                                        required={true}
                                        type="email"
                                      />
                                    )}
                                  />
                                </FieldBox>
                                <FieldBox mb="12px" ml="12px">
                                  <Field
                                    name={`members[${index}].firstName`}
                                    render={({
                                      field,
                                    }: FieldProps<TeamFormValues>) => (
                                      <Input
                                        {...field}
                                        placeholder="First Name"
                                        required={true}
                                        type="text"
                                      />
                                    )}
                                  />
                                </FieldBox>
                                <FieldBox mb="12px" ml="12px">
                                  <Field
                                    name={`members[${index}].lastName`}
                                    render={({
                                      field,
                                    }: FieldProps<TeamFormValues>) => (
                                      <Input
                                        {...field}
                                        placeholder="Last Name"
                                        required={true}
                                        type="text"
                                      />
                                    )}
                                  />
                                </FieldBox>
                                <Box mb="12px" ml="12px">
                                  <RemoveTeammateButton
                                    onClick={() => remove(index)}
                                    type="button"
                                  >
                                    <TrashIcon />
                                  </RemoveTeammateButton>
                                </Box>
                              </Flex>
                            </div>
                          ))
                        : null}
                      <Box mt="6px">
                        <AddTeammateButton
                          onClick={() => push(emptyTeammate)}
                          type="button"
                        >
                          <AddIcon />
                        </AddTeammateButton>
                      </Box>
                    </div>
                  );
                }}
              />
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
                    width={180}
                  >
                    <span>Add team members</span>
                  </ButtonSpinner>
                </Box>
              </Flex>
            </Flex>
          </Form>
        )}
      />
    </Modal>
  );
};

const AddIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="12px"
    height="12px"
    viewBox="0 0 12 12"
  >
    <g transform="translate(0, 0)">
      <path
        d="M11,5H7V1A1,1,0,0,0,5,1V5H1A1,1,0,0,0,1,7H5v4a1,1,0,0,0,2,0V7h4a1,1,0,0,0,0-2Z"
        fill="#FFFFFF"
      />
    </g>
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
  >
    <g transform="translate(0, 0)">
      <rect
        data-color="color-2"
        x="5"
        y="7"
        fill="#FFFFFF"
        width="2"
        height="6"
      />{' '}
      <rect
        data-color="color-2"
        x="9"
        y="7"
        fill="#FFFFFF"
        width="2"
        height="6"
      />{' '}
      <path
        fill="#FFFFFF"
        d="M12,1c0-0.6-0.4-1-1-1H5C4.4,0,4,0.4,4,1v2H0v2h1v10c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1V5h1V3h-4V1z M6,2h4 v1H6V2z M13,5v9H3V5H13z"
      />
    </g>
  </svg>
);

const Label = styled.label`
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

const Input = styled.input`
  background: ${rgba('white', 0.1)};
  border-radius: 4px;
  color: white;
  height: 36px;
  padding: 0 12px;
  width: 100%;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
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
  margin: 4px 12px;
`;
