import { Router } from 'express';
import Review from '../models/Review';
import express from 'express';

const router = Router();
router.use(express.json());


router.get('/', async (_req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/', async (req, res) => {
    try {
        const { text, rating } = req.body;
        if (!text || !rating) {
            return res.status(400).json({ message: 'Text and rating are required' });
        }

        const newReview = new Review({ text, rating });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
