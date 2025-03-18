import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  guests: { type: Number, required: true, min: 1 },
  createdAt: { type: Date, default: Date.now }
});

const Booking = model('Booking', bookingSchema);

export default Booking;
