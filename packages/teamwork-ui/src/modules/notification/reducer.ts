import { NotificationActions } from './actions/NotificationActions';
import {
  DISMISS_NOTIFICATION,
  SHOW_NOTIFICATION,
} from './constants/ActionTypes';
import { Notification } from './types';

type NotificationState = Notification[];

const initialState: NotificationState = [];

export default function(
  state: NotificationState = initialState,
  action: NotificationActions,
) {
  switch (action.type) {
    case DISMISS_NOTIFICATION:
      return state.filter(notification => notification.id !== action.payload);
    case SHOW_NOTIFICATION:
      return [...state, action.payload];
    default:
      return state;
  }
}
