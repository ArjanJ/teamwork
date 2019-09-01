import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

import { Notification, NotificationType } from '../types';

interface NotificationProps extends Notification {
  onDismissClick(): void;
}

export const NotificationAlert: FunctionComponent<NotificationProps> = ({
  id,
  message,
  onDismissClick,
  type,
}) => (
  <NotificationAlertBox type={type}>
    <span>{message}</span>
    <button onClick={onDismissClick} type="button">
      X
    </button>
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
  ${({ type }) => notificationThemeMap[type]};
`;
