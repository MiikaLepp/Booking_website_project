import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HousingPage.css";

const HousingPage = () => {
  const [user, setUser] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData && userData !== "undefined") {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5000/hotels")
        .then((response) => setHotels(response.data))
        .catch((error) => console.error("Error fetching hotels:", error));
    } else {
      setHotels([]);
    }
  }, [user]);

  const handleBookHotel = async (hotelId) => {
    if (!user) {
      alert("Please log in to book a hotel");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Authentication failed. Please log in again.");
        return;
      }

      await axios.post(
        "http://localhost:5000/bookings",
        {
          hotel: hotelId,
          checkInDate: "2025-06-10",
          checkOutDate: "2025-06-15",
          guests: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Hotel booked successfully!");
    } catch (error) {
      console.error("Error booking hotel:", error.response?.data || error);
      alert("Failed to book hotel. Please try again.");
    }
  };

  return (
    <div className="housing-page">
      <h1>Available Hotels</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <ul>
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <li key={hotel._id}>
                <h3>{hotel.name}</h3>
                <p>{hotel.description}</p>
                <button onClick={() => handleBookHotel(hotel._id)}>
                  Book Hotel
                </button>
              </li>
            ))
          ) : (
            <p>No hotels available.</p>
          )}
        </ul>
      ) : (
        <p>Please log in to see available hotels.</p>
      )}
    </div>
  );
};

export default HousingPage;
