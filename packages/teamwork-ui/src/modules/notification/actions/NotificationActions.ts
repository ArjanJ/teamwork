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

export function showNotification(payload: Notification) {
  const id = new Date().valueOf();
  payload.id = id;

  return {
    payload,
    type: SHOW_NOTIFICATION,
  };
}

export function dismissNotification(payload: Notification['id']) {
  return {
    payload,
    type: DISMISS_NOTIFICATION,
  };
}
