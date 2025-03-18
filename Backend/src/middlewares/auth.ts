import { type NextFunction, type Request, type Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import type { z } from 'zod';
import { verifyToken } from '../lib/jwt';
import { handleError } from '../lib/responses';
import { CredentialsModel, credentialsSchema } from '../schemas/credentials';

export interface AuthRequest extends Request {
  user?: z.infer<typeof credentialsSchema>;
}

/**
 * Middleware function to authenticate API requests.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 * @returns A Promise that resolves to the next middleware function.
 */
const Authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;

  try {
    if (!auth || !auth.startsWith('Bearer ')) {
      return handleError(res, 'Invalid token provided', 401);
    }

    const verifiedToken = verifyToken(auth.split(' ')[1]);
    if (!verifiedToken) {
      return handleError(res, 'Invalid token provided', 401);
    }

    const user = await CredentialsModel.findById(verifiedToken.id);
    if (!user) {
      return handleError(res, 'Invalid token provided', 401);
    }

    req.user = user;

    return next();
  } catch (error) {
    // Invalid or malformed token
    if (error instanceof JsonWebTokenError || error instanceof SyntaxError) {
      return handleError(res, 'Invalid token provided', 401);
    }

    console.log(error);
    return handleError(res, 'Internal server error');
  }
};

export { Authenticate };
