import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

import { firebase } from '../firebase';

export const callAPIMiddleware = ({ dispatch, getState }: MiddlewareAPI) => (
  next: Dispatch,
) => async (action: AnyAction) => {
  const { callAPI, payload = {}, shouldCallAPI = () => true, types } = action;

  if (!types) {
    // Normal action: pass it on.
    return next(action);
  }

  if (
    !Array.isArray(types) ||
    types.length !== 3 ||
    !types.every(type => typeof type === 'string')
  ) {
    throw new Error('Expected an array of three string types.');
  }

  if (typeof callAPI !== 'function') {
    throw new Error('Expected callAPI to be a function.');
  }

  if (!shouldCallAPI(getState())) {
    return null;
  }

  const [requestType, successType, failureType] = types;

  const { currentUser } = firebase.auth;

  if (currentUser) {
    // Fetch idToken first, otherwise API will return 401.
    const token = await currentUser.getIdToken(true);

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      dispatch(
        Object.assign({}, payload, {
          type: requestType,
        }),
      );

      try {
        const response = await callAPI(headers);
        const { data, error } = await response.json();

        if (error) {
          return dispatch({
            error,
            payload,
            type: failureType,
          });
        }

        if (response) {
          return dispatch({
            data,
            error,
            payload,
            type: successType,
          });
        }
      } catch (caughtError) {
        return dispatch({
          error: caughtError,
          payload,
          type: failureType,
        });
      }
    }
  }
};
