import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now }
});

const Review = model('Review', reviewSchema);

export default Review;
