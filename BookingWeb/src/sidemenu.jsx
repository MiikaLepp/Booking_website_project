import React from 'react';
import './sideMenu.css';

function SideMenu({ onClose, showMenu }) {
    return (
        <div className={`sideMenu ${showMenu ? 'open' : ''}`}>
            <button className="menuButton" onClick={onClose}>
                <img src="src/visualResources/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" alt="Close Menu" />
            </button>
            <ul>
                <li><a href="attractions">Attractions</a></li>
                <li><a href="hotels">Hotels</a></li>
                <li><a href="flights">Flights</a></li>
                <li><a href="reviews">Reviews</a></li>
            </ul>
        </div>
    );
}

export default SideMenu;
