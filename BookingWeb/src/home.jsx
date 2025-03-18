import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import beachImage from './visualResources/beach.jpg';
import holidayImage from './visualResources/holiday.jpg';
import hotelImage from './visualResources/hotel.jpg';
import wheelImage from './visualResources/wheel.jpg';
import sunsetImage from './visualResources/sunset.jpg';

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  return (
    <>
      {/* Header Section */}
      <div className="home-container" style={{ backgroundImage: `url(${beachImage})` }}>
        <div>
          <h1 className='welcome'>Welcome to spend the best holiday!</h1>
        </div>
        {/* <div className="overlay">
          <h2 className="headText">Find Your Next Adventure</h2>
          <div id="quickSearch">
            <input 
              type="text" 
              placeholder="Search... "
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="searchbar"    
            />
            <button className="searchButton">
              Search
            </button>
          </div>
        </div> */}
      </div>

      {/* Pitch Text */}
      <div className="pitch-text">
        <p>Discover breathtaking destinations, explore new cultures, and make unforgettable memories. Start your journey today!</p>
      </div>

      <div className="main-content">
        <div className="big-buttons-container">
          <div className="big-button" style={{ backgroundImage: `url(${holidayImage})` }} onClick={() => navigate('/flights')}>
            Book a Flight
          </div>
          <div className="big-button" style={{ backgroundImage: `url(${hotelImage})` }} onClick={() => navigate('/hotels')}>
            Find a Hotel
          </div>
          <div className="big-button" style={{ backgroundImage: `url(${wheelImage})` }} onClick={() => navigate('/attractions')}>
            Top Attractions
          </div>
          <div className="big-button" style={{ backgroundImage: `url(${sunsetImage})` }} onClick={() => navigate('/reviews')}>
            Reviews
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>We are entirely fictional. You cant actually go anywhere with us, stay home.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="flights">Flights</a></li>
              <li><a href="hotels">Hotels</a></li>
              <li><a href="attractions">Attractions</a></li>
              <li><a href="reviews">Reviews</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <ul className="social-links">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
