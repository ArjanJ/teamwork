import { ErrorRequestHandler } from 'express';
import { ApiError } from '../types/ApiError';

const STATUS = 500;
const MESSAGE = 'Something went wrong.';
const TYPE = 'BAD_IMPLEMENTATION';

export const handleError: ErrorRequestHandler = (
  err: ApiError,
  req,
  res,
  next,
) => {
  const status = err.status || STATUS;
  const message = err.message || MESSAGE;
  const type = err.type || TYPE;

  res.status(status).send({
    error: {
      message,
      status,
      type,
    },
  });
};
