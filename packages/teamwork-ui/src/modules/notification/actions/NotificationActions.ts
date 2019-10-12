import { Dispatch } from 'redux';

import { delay as wait } from '../../../utils/delay';
import {
  DISMISS_NOTIFICATION,
  SHOW_NOTIFICATION,
} from '../constants/ActionTypes';
import { Notification } from '../types';

interface ShowNotification {
  payload: Notification;
  type: typeof SHOW_NOTIFICATION;
}

interface DismissNotification {
  payload: Notification['id'];
  type: typeof DISMISS_NOTIFICATION;
}

export type NotificationActions = ShowNotification | DismissNotification;

const defaultOptions = { autoDismiss: true, delay: 3000 };

export function showNotification(
  payload: Notification,
  options = defaultOptions,
) {
  const id = new Date().valueOf();
  payload.id = id;

  const showNotificationAction = { payload, type: SHOW_NOTIFICATION };
  const { autoDismiss, delay } = options;

  if (autoDismiss) {
    return async (dispatch: Dispatch) => {
      dispatch(showNotificationAction);

      // Wait x secs then dismiss the notification
      await wait(delay);
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
