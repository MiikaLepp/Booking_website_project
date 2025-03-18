import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { geolocate, getStrippedIp } from '../../lib/information';
import { generateToken } from '../../lib/jwt';
import { handleError, handleSuccess } from '../../lib/responses';
import { loginSchema, registrationSchema } from '../../schemas/authentication';
import { CredentialsModel } from '../../schemas/credentials';

const router: Router = Router();
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 10,
  message: {
    error: true,
    message: 'Too many requests'
  },
  // For local development
  validate: {
    ip: false
  }
});

router.all('/', (_req, res) => {
  return handleError(res, 'Not found', 404);
});

router.use(limiter);

// POST /auth/register
router.post('/register', async (req, res) => {
  try {
    const body = registrationSchema.safeParse(req.body);
    if (!body.success) {
      return handleError(res, 'Invalid request body', 400);
    }

    const user = await CredentialsModel.findOne({ email: body.data.email });
    if (user) {
      return handleError(res, 'User already exists', 400);
    }

    const ip = getStrippedIp(req) || 'Unknown';
    const hashedPassword = await bcrypt.hash(body.data.password, 10);

    await CredentialsModel.create({
      email: body.data.email,
      // name: body.data.name,
      password: hashedPassword,
      registration: { ip, date: new Date(), location: geolocate(ip) }
    });

    return handleSuccess(res, 'User created successfully');
  } catch (error) {
    console.log(error);
    return handleError(res, 'Something went wrong');
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const body = loginSchema.safeParse(req.body);
    if (!body.success) {
      return handleError(res, 'Invalid request body', 400);
    }

    const user = await CredentialsModel.findOne({ email: body.data.email });
    if (!user) {
      return handleError(res, 'User not found', 400);
    }

    const isPasswordValid = await bcrypt.compare(
      body.data.password,
      user.password
    );
    if (!isPasswordValid) {
      return handleError(res, 'Invalid password', 401);
    }

    await user.addLogin(getStrippedIp(req) || 'Unknown');

    const token = generateToken({
      id: user._id.toString(),
      email: user.email
    });

    // Send both the token and the user data
    return handleSuccess(res, 'Logged in successfully', { 
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        // Add any other user fields you want to send back
      }
    });
  } catch (error) {
    console.log(error);
    return handleError(res, 'Something went wrong');
  }
});

export default router;
