declare namespace Express {
  export interface Request {
    decodedToken: {
      [key: string]: any;
    };
  }
}
