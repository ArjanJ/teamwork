import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikActions,
  FormikProps,
} from 'formik';
import React, { FunctionComponent } from 'react';
import { Box, Flex } from 'rebass';

import { ButtonSpinner } from '../../../../components/button-spinner/ButtonSpinner';
import { FormField } from '../../../../components/form-field/FormField';
import { Input } from '../../../../components/input/Input';
import { Color } from '../../../../styles/Color';
import { delay } from '../../../../utils/delay';
import { useUser } from '../../../user/useUser';

interface SettingsProfileFormValues {
  bio: string;
  firstName: string;
  lastName: string;
  role: string;
}

const initialValues = {
  bio: '',
  firstName: '',
  lastName: '',
  role: '',
};

const FirstNameField = ({ field }: FieldProps<SettingsProfileFormValues>) => (
  <FormField label="First Name">
    <Input
      {...field}
      placeholder="Your First Name"
      required={true}
      type="text"
    />
  </FormField>
);

const LastNameField = ({ field }: FieldProps<SettingsProfileFormValues>) => (
  <FormField label="Last Name">
    <Input
      {...field}
      placeholder="Your Last Name"
      required={true}
      type="text"
    />
  </FormField>
);

const RoleField = ({ field }: FieldProps<SettingsProfileFormValues>) => (
  <FormField label="Role">
    <Input {...field} placeholder="Your Role" required={true} type="text" />
  </FormField>
);

const SettingsProfileFormComponent = ({
  isSubmitting,
}: FormikProps<SettingsProfileFormValues>) => (
  <Form>
    <Flex mb="24px">
      <Box flex={1}>
        <Field name="firstName" render={FirstNameField} />
      </Box>
      <Box flex={1} ml="24px">
        <Field name="lastName" render={LastNameField} />
      </Box>
    </Flex>
    <Box mb="36px">
      <Field name="role" render={RoleField} />
    </Box>
    <Flex mb="36px">
      <ButtonSpinner
        isSubmitting={isSubmitting}
        primary={Color.AQUA}
        secondary={Color.BLUE_PERSIAN}
        type="submit"
        width={144}
      >
        <span>Update profile</span>
      </ButtonSpinner>
    </Flex>
  </Form>
);

export const SettingsProfileForm: FunctionComponent = () => {
  const { updateUser, user } = useUser();

  const getInitialValues = () => {
    if (user !== null) {
      return {
        bio: '',
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };
    }

    return initialValues;
  };

  const onSubmit = async (
    values: SettingsProfileFormValues,
    actions: FormikActions<SettingsProfileFormValues>,
  ) => {
    if (user === null) {
      return null;
    }

    await delay(1500);
    await updateUser(user.id, values);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      onSubmit={onSubmit}
      render={SettingsProfileFormComponent}
    />
  );
};
