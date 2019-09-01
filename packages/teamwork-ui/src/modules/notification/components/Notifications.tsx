import React, { useCallback } from 'react';

import { Notification } from '../types';
import { useNotification } from '../useNotification';
import { NotificationAlert } from './NotificationAlert';

export const Notifications = () => {
  const { dismissNotification, notifications } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <>
      {notifications.map(({ id, message, type }: Notification) => {
        const onDismissClick = () => dismissNotification(id);

        return (
          <NotificationAlert
            id={id}
            key={id}
            message={message}
            onDismissClick={onDismissClick}
            type={type}
          />
        );
      })}
    </>
  );
};
