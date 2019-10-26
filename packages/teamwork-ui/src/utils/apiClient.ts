import { APIResponse } from 'teamwork-types';

import { firebase } from '../firebase';
import { store } from '../store/store';

interface APIClient {
  body?: {};
  method: 'GET' | 'PUT' | 'POST' | 'DELETE';
  url: string;
}

const headers = new Headers();
headers.append('Content-Type', 'application/json');

export const apiClient = async ({
  body,
  method,
  url,
}: APIClient): Promise<APIResponse> => {
  const { currentUser } = firebase.auth;
  const { spaces } = store.getState();

  if (!currentUser) {
    throw new Error('Firebase currentUser not found, API call cannot be made.');
  }

  // Fetch idToken first, otherwise API will return 401.
  const token = await currentUser.getIdToken(false);
  headers.set('Authorization', `Bearer ${token}`);

  // Add company id to headers.
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

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/${url}`,
    request,
  );

  return response.json();
};
