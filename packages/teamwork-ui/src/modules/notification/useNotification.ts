import { useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import {
  dismissNotification,
  showNotification,
} from './actions/NotificationActions';
import { NotificationState } from './reducer';
import { Notification } from './types';

interface UseNotification {
  dismissNotification(id: number): void;
  notifications: Notification[];
  showNotification(notification: Notification): void;
}

export const useNotification = () => {
  const dispatch = useDispatch();

  const mapState = useCallback(state => state.notifications, []);
  const notifications = useMappedState(mapState);

  const api: UseNotification = {
    dismissNotification: id => dispatch(dismissNotification(id)),
    notifications,
    showNotification: notification => dispatch(showNotification(notification)),
  };

  return api;
};
