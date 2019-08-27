import {
  DISMISS_NOTIFICATION,
  SHOW_NOTIFICATION,
} from '../constants/ActionTypes';
import { Notification } from '../types';

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
