import { ErrorRequestHandler } from 'express';
import { APIError } from 'teamwork-types';

const STATUS = 500;
const MESSAGE = 'Something went wrong.';
const TYPE = 'BAD_IMPLEMENTATION';

export const handleError: ErrorRequestHandler = (
  err: APIError,
  req,
  res,
  next,
) => {
  const status = err.status || STATUS;
  const message = err.message || MESSAGE;
  const type = err.type || TYPE;

  const error: APIError = {
    message,
    status,
    type,
  };

  res.status(status).send({
    error,
  });
};
