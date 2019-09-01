import { Dispatch } from 'redux';

import { delay } from '../../../utils/delay';
import {
  DISMISS_NOTIFICATION,
  SHOW_NOTIFICATION,
} from '../constants/ActionTypes';
import { Notification } from '../types';

interface ShowNotifcation {
  payload: Notification;
  type: typeof SHOW_NOTIFICATION;
}

interface DismissNotification {
  payload: Notification['id'];
  type: typeof DISMISS_NOTIFICATION;
}

export type NotificationActions = ShowNotifcation | DismissNotification;

export function showNotification(payload: Notification, autoDismiss = true) {
  const id = new Date().valueOf();
  payload.id = id;

  const showNotificationAction = { payload, type: SHOW_NOTIFICATION };

  if (autoDismiss) {
    return async (dispatch: Dispatch) => {
      dispatch(showNotificationAction);

      // Wait 3 secs then dismiss the notification
      await delay(3000);
      return dispatch({ payload: id, type: DISMISS_NOTIFICATION });
    };
  }

  return showNotificationAction;
}

export function dismissNotification(payload: Notification['id']) {
  return {
    payload,
    type: DISMISS_NOTIFICATION,
  };
}
