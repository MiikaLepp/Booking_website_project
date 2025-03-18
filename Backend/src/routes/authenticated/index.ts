import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { handleError, handleSuccess } from '../../lib/responses';
import { Authenticate, type AuthRequest } from '../../middlewares/auth';

const router: Router = Router();
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 10,
  message: {
    error: true,
    message: 'Too many requests'
  }
});

router.all('/', (_req, res) => {
  return handleError(res, 'Not found', 404);
});

router.use(limiter);

router.get('/test', Authenticate, (req: AuthRequest, res) => {
  return handleSuccess(res, 'Authenticated', {
    email: req.user?.email,
    id: req.user?._id
    // name: req.user?.name
  });
});

export default router;
