import { Router } from 'express';
import Hotel from '../models/Hotel'; // Import the Hotel model

const router = Router();

/**
 * @route   GET /hotels
 * @desc    Get all available hotels
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        // Fetch all hotels from the database
        const hotels = await Hotel.find();
        res.json(hotels); // Return list of hotels
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching hotels' });
    }
});

/**
 * @route   GET /hotels/:id
 * @desc    Get details of a specific hotel
 * @access  Public
 */
router.get('/:id', async (req, res) => {
    try {
        // Fetch a specific hotel by its ID
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.json(hotel); // Return the specific hotel details
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching hotel details' });
    }
});

/**
 * @route   POST /hotels
 * @desc    Add a new hotel (for admin users)
 * @access  Private (Admin)
 */
router.post('/', async (req, res) => {
    try {
        const { name, location, price, description, availableRooms, imageUrl } = req.body; // FIXED: Changed pricePerNight to price

        if (!name || !location || !price || !description || !availableRooms || !imageUrl) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newHotel = new Hotel({
            name,
            location,
            price, // FIXED: Changed pricePerNight to price
            description,
            availableRooms,
            imageUrl
        });

        await newHotel.save();
        res.status(201).json(newHotel); // Return the created hotel
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating hotel' });
    }
});

export default router;
