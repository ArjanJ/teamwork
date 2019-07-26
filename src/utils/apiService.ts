import { firebase } from '../firebase';

interface ApiService {
  body?: {};
  method: 'GET' | 'PUT' | 'POST' | 'DELETE';
  url: string;
}

export interface ApiResponseSuccess<D = any> {
  data: D;
}

export const apiService = async ({ body, method, url }: ApiService) => {
  const { currentUser } = firebase.auth;

  if (currentUser) {
    // Fetch idToken first, otherwise API will return 401.
    const token = await currentUser.getIdToken(true);

    const request: RequestInit = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method,
    };

    if (body) {
      request.body = JSON.stringify(body);
    }

    const response = await fetch(`/api/${url}`, request);

    return response.json();
  }
};
