import { rgba } from 'polished';
import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

import { CloseCircleIcon } from '../../../components/icons/CloseCircleIcon';
import { Notification, NotificationType } from '../types';

interface NotificationProps extends Notification {
  onDismissClick(): void;
}

export const NotificationAlert: FunctionComponent<NotificationProps> = ({
  message,
  onDismissClick,
  type,
}) => (
  <NotificationAlertBox type={type}>
    <NotificationAlertBoxText>{message}</NotificationAlertBoxText>
    <NotificationAlertBoxButton onClick={onDismissClick} type="button">
      <CloseCircleIcon />
    </NotificationAlertBoxButton>
  </NotificationAlertBox>
);

const notificationThemeMap = {
  [NotificationType.ERROR]: css`
    background: #ffe1e1;
  `,
  [NotificationType.INFO]: css`
    background: #f6f5ff;
  `,
  [NotificationType.SUCCESS]: css`
    background: #d5f7e5;
  `,
};

const NotificationAlertBox = styled.div<{ type: NotificationType }>`
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 2px 10px ${rgba('black', 0.08)};
  display: flex;
  font-size: 14px;
  height: 60px;
  justify-content: space-between;
  margin-bottom: 12px;
  min-width: 312px;
  padding: 0 18px;
  ${({ type }) => notificationThemeMap[type]};
`;

const NotificationAlertBoxText = styled.span`
  opacity: 0.75;
`;

const NotificationAlertBoxButton = styled.button`
  background: none;
  margin-left: 12px;
  opacity: 0.75;
  padding: 4px;
`;
