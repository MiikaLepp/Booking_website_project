import { type Response } from 'express';

const handleError = (res: Response, message: string, status = 500) => {
  return res.status(status).json({
    error: true,
    message
  });
};

const handleSuccess = (res: Response, message: string, data = {}) => {
  return res.json({
    error: false,
    message,
    ...data
  });
};

export { handleError, handleSuccess };
