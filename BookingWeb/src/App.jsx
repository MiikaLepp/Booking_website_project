import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header.jsx';
import Home from './home.jsx';
import DirPage from './directoryPage.jsx';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import NotFound from './NotFound.jsx';
import TouristAttractions from './TouristAttractions';
import Reviews from './Reviews.jsx';
import FlightBooking from './FlightForm.jsx';
import HousingPage from './HousingPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/directory" element={<DirPage />} />
        <Route path="/flights" element={<FlightBooking />} />
        <Route path="/attractions" element={<TouristAttractions />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/hotels" element={<HousingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
