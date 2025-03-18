import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export interface JwtPayload {
  id: string;
  email: string;
}

/**
 * Generates a JWT token with the given payload.
 * Expires in `3 hours`.
 *
 * @param {JwtPayload} payload - The data to be included in the token.
 * @returns {string} - The generated JWT token.
 */
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '3h' });
};

/**
 * Verifies a JWT token.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {JwtPayload} - The decoded payload.
 */
export const verifyToken = (token: string): JwtPayload | null => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload | null;
};
