// import mongoose from 'mongoose';
// import Hotel from './models/Hotel';

// // Data for the hotels
// const hotelsData = [
//   {
//     name: "Frankfurt Hotel",
//     location: "Frankfurt, Germany",
//     pricePerNight: 120,
//     availableRooms: 50,
//     description: "A luxury hotel in the heart of Frankfurt.",
//     imageUrl: "https://example.com/frankfurt.jpg"
//   },
//   {
//     name: "Osaka Hotel",
//     location: "Osaka, Japan",
//     pricePerNight: 150,
//     availableRooms: 40,
//     description: "A modern hotel in downtown Osaka.",
//     imageUrl: "https://example.com/osaka.jpg"
//   },
//   {
//     name: "Dallas Hotel",
//     location: "Dallas, USA",
//     pricePerNight: 100,
//     availableRooms: 60,
//     description: "Comfortable hotel near Dallas downtown.",
//     imageUrl: "https://example.com/dallas.jpg"
//   },
//   {
//     name: "Paris Hotel",
//     location: "Paris, France",
//     pricePerNight: 180,
//     availableRooms: 30,
//     description: "A romantic hotel near the Eiffel Tower.",
//     imageUrl: "https://example.com/paris.jpg"
//   },
//   {
//     name: "London Hotel",
//     location: "London, UK",
//     pricePerNight: 200,
//     availableRooms: 25,
//     description: "A 5-star hotel with a view of the Thames.",
//     imageUrl: "https://example.com/london.jpg"
//   }
// ];

// mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(async () => {
//     console.log('Connected to the database');

//     await Hotel.insertMany(hotelsData);
//     console.log('Hotels added successfully');
    
//     mongoose.connection.close();
//   })
//   .catch(err => {
//     console.error('Database connection error:', err);
//   });
