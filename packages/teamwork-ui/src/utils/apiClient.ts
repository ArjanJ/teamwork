import { ApiError } from '../../functions/src/types/types';
import { store } from '../store/store';
import { firebase } from '../firebase';

interface ApiClient {
  body?: {};
  method: 'GET' | 'PUT' | 'POST' | 'DELETE';
  url: string;
}

export interface ApiResponse {
  data?: any;
  error?: ApiError;
}

const headers = new Headers();
headers.append('Content-Type', 'application/json');

export const apiClient = async ({
  body,
  method,
  url,
}: ApiClient): Promise<ApiResponse> => {
  const { currentUser } = firebase.auth;
  const { spaces } = store.getState();

  if (!currentUser) {
    throw new Error('currentUser not found.');
  }

  // Fetch idToken first, otherwise API will return 401.
  const token = await currentUser.getIdToken(true);
  headers.set('Authorization', `Bearer ${token}`);

  if (spaces.activeSpace) {
    headers.set('X-Company', spaces.activeSpace);
  }

  const request: RequestInit = {
    headers,
    method,
  };

  if (body) {
    request.body = JSON.stringify(body);
  }

  const response = await fetch(`/api/${url}`, request);

  return response.json();
};
