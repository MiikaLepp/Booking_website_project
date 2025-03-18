// import { Router } from 'express';
// import Booking from '../models/Booking';
// import { Authenticate } from '../middlewares/auth';

// const router = Router();

// /**
//  * @route   GET /bookings
//  * @desc    Get all bookings for the logged-in user
//  * @access  Private
//  */
// router.get('/', Authenticate, async (req, res) => {
//     try {
//         const bookings = await Booking.find({ user: req.user?._id });
//         res.json(bookings);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// /**
//  * @route   POST /bookings
//  * @desc    Create a new booking
//  * @access  Private
//  */
// router.post('/', Authenticate, async (req, res) => {
//     try {
//         const { hotel, checkInDate, checkOutDate, guests } = req.body;

//         if (!hotel || !checkInDate || !checkOutDate || !guests) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         const newBooking = new Booking({
//             user: req.user?._id,
//             hotel,
//             checkInDate,
//             checkOutDate,
//             guests
//         });

//         await newBooking.save();
//         res.status(201).json(newBooking);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// export default router;
