import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Color } from '../../styles/Color';
import { Easing } from '../../styles/Easing';

interface FormFieldProps {
  children: React.ReactChild | React.ReactNodeArray;
  label: string;
}

export const FormField: FunctionComponent<FormFieldProps> = ({
  children,
  label,
}) => (
  <FormFieldWrapper>
    {children}
    <Label>{label}</Label>
  </FormFieldWrapper>
);

const FormFieldWrapper = styled.div`
  margin-bottom: 36px;
  position: relative;
`;

const Label = styled.label`
  color: ${Color.NAVY};
  font-size: 13px;
  font-weight: 700;
  left: 16px;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 9px;
  transition: all 0.5s ${Easing.OUT};
`;
