import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';

import { Notification } from '../types';
import { useNotification } from '../useNotification';
import { NotificationAlert } from './NotificationAlert';

export const Notifications = () => {
  const { dismissNotification, notifications } = useNotification();

  return (
    <NotificationsWrapper>
      <PoseGroup>
        {notifications.map(({ id, message, type }: Notification) => {
          const onDismissClick = () => dismissNotification(id);

          return (
            <NotificationAnimation key={id}>
              <NotificationAlert
                id={id}
                message={message}
                onDismissClick={onDismissClick}
                type={type}
              />
            </NotificationAnimation>
          );
        })}
      </PoseGroup>
    </NotificationsWrapper>
  );
};

const NotificationAnimation = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
});

const NotificationsWrapper = styled(NotificationAnimation)`
  bottom: 12px;
  position: fixed;
  right: 24px;
  z-index: 10;
`;
