import { Schema, model } from 'mongoose';

// Hotel schema definition
const hotelSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  availableRooms: { type: Number, required: true },
  amenities: [String], // Example: ['Wi-Fi', 'Pool', 'Gym']
  description: { type: String },
  imageUrl: { type: String, required: true }, // Added imageUrl field
});

const Hotel = model('Hotel', hotelSchema);

export default Hotel;
