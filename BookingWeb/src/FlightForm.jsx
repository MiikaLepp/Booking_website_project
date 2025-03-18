import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import khadr from './visualResources/destinationImages/khadr.jpg';
import './FlightBooking.css';



const FlightForm = () => {
  const [tripType, setTripType] = useState("oneWay");
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    adults: 1,
    children: 0,
  });
  const [flightResults, setFlightResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 const fetchFlights = async () => {
    setLoading(true);
    try {
      // x
      
const response = await axios.post("http://localhost:5000/api/flights/search", formData);

      setFlightResults(response.data || []);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
    setLoading(false);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFlights();
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="navbar-title"></h1>
        </div>
      </nav>

      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${khadr})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      ></div>

      <br />
      <p>Find the best deals on flights to your favorite destinations!</p>

      <div className="main-content">
        <form onSubmit={handleSubmit} className="form">
          <div className="trip-type">
            <label>
              <input
                type="radio"
                name="tripType"
                value="oneWay"
                checked={tripType === "oneWay"}
                onChange={() => setTripType("oneWay")}
              />
              One Way
            </label>
            <label>
              <input
                type="radio"
                name="tripType"
                value="roundTrip"
                checked={tripType === "roundTrip"}
                onChange={() => setTripType("roundTrip")}
              />
              Round Trip
            </label>
          </div>

          <div className="form-group">
            <label>Departure:</label>
            <input
              type="text"
              name="departure"
              value={formData.departure}
              onChange={handleInputChange}
              placeholder="Enter departure city"
              required
            />
          </div>

          <div className="form-group">
            <label>Destination:</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="Enter destination city"
              required
            />
          </div>

          <div className="form-group">
            <label>Departure Date:</label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleInputChange}
              required
            />
          </div>

          {tripType === "roundTrip" && (
            <div className="form-group">
              <label>Return Date:</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>Flight Class:</label>
            <select name="flightClass" value={formData.flightClass} onChange={handleInputChange}>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First Class</option>
            </select>
          </div>

          <div className="passenger-ages">
            <div className="form-group">
              <label>Adults:</label>
              <input
                type="number"
                name="adults"
                value={formData.adults}
                onChange={handleInputChange}
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Children:</label>
              <input
                type="number"
                name="children"
                value={formData.children}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>

          <button type="submit" className="search-button">
            Search Flights
          </button>

          <button className="stays-button">
            <Link to="/stays">Find Stays</Link>
          </button>
      
        </form>
      
      </div>
    </div>
  );
};

export default FlightForm;