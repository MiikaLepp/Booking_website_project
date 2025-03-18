import authRouter from './auth';
import authenticatedRouter from './authenticated';
import reviewsRouter from './reviews';
// import bookingsRouter from './bookings';
import hotelsRouter from './hotels';

export const Routes = [
  {
    path: '/auth',
    router: authRouter
  },
  {
    path: '/authenticated',
    router: authenticatedRouter
  },
  {
    path: '/reviews',
    router: reviewsRouter
  },
  // {
  //   path: '/bookings',
  //   router: bookingsRouter
  // },
  {
    path: '/hotels',
    router: hotelsRouter
  }
] as const;

console.log('Routes loaded:', Routes);
