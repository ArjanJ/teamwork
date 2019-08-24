import { Dispatch } from 'redux';
import { ApiError } from 'teamwork-types';

import { ApiResponse } from './apiClient';

export enum AsyncActionStatus {
  FAILED = 'FAILED',
  STARTED = 'STARTED',
  SUCCEEDED = 'SUCCEEDED',
  UNSTARTED = 'UNSTARTED',
}

interface StartedAsyncAction<T, P = any> {
  payload: P;
  status: AsyncActionStatus.STARTED;
  type: T;
}

export interface SucceededAsyncAction<T, P = any> {
  payload: P;
  status: AsyncActionStatus.SUCCEEDED;
  type: T;
}

export interface FailedAsyncAction<T> {
  payload: ApiError;
  status: AsyncActionStatus.FAILED;
  type: T;
}

export type AsyncAction<T, P = any> =
  | StartedAsyncAction<T, P>
  | SucceededAsyncAction<T, P>
  | FailedAsyncAction<T>;

function startedAsyncAction<T, P>(type: T, payload: P): StartedAsyncAction<T> {
  return {
    payload,
    status: AsyncActionStatus.STARTED,
    type,
  };
}

function succeededAsyncAction<T, P>(
  type: T,
  payload: P,
): SucceededAsyncAction<T, P> {
  return {
    payload,
    status: AsyncActionStatus.SUCCEEDED,
    type,
  };
}

function failedAsyncAction<T>(type: T, error: ApiError): FailedAsyncAction<T> {
  return {
    payload: error,
    status: AsyncActionStatus.FAILED,
    type,
  };
}

export function async<T, P extends ApiResponse>(
  type: T,
  action: (...args: any[]) => Promise<P>,
  ...args: any[]
) {
  return async (dispatch: Dispatch) => {
    dispatch(startedAsyncAction(type, {}));

    try {
      const payload = await action(...args);

      if (payload.error) {
        return dispatch(failedAsyncAction(type, payload.error));
      }

      return dispatch(succeededAsyncAction(type, payload.data));
    } catch (error) {
      return dispatch(failedAsyncAction(type, error));
    }
  };
}
