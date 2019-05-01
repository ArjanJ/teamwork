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
    console.log(types);
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
    const token = await currentUser.getIdToken(false);

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
        const { data } = await response.json();

        if (response) {
          return dispatch({
            data,
            payload,
            type: successType,
          });
        }
      } catch (error) {
        return dispatch({
          error,
          payload,
          type: failureType,
        });
      }
    }
  }
};
