const HEADER_KEY = 'Bearer';

type Headers = {
  authorization?: string;
};

export const extractBearerToken = (headers: Headers): string => {
  let bearerToken = '';

  if (headers.authorization) {
    const parts = headers.authorization.split(' ');

    if (parts.length === 2 && parts[0] === HEADER_KEY) {
      const [, token] = parts;
      bearerToken = token;
    }
  }

  return bearerToken;
};
