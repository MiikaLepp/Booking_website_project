import { useState, useEffect } from 'react';
import './header.css';
import SideMenu from './sidemenu.jsx';
import { NavLink } from 'react-router-dom';

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const checkLoginStatus = () => {
        const token = sessionStorage.getItem('token');
        setIsLoggedIn(!!token);
    };

    useEffect(() => {
        checkLoginStatus();
        const interval = setInterval(() => {
            checkLoginStatus();
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        checkLoginStatus();
    };

    return (
        <>
            <div className="header">
                <div className="header-content">
                    <nav>
                        {/* Left Side: Logo & Navigation */}
                        <div className="nav-left">
                            <div id="logo">
                                <a href="/">
                                    <img src="src/visualResources/logo.png" alt="Logo" />
                                </a>
                            </div>
                            <div className="nav-button">
                                <NavLink to="/attractions">Attractions</NavLink>
                            </div>
                            <div className="nav-button">
                                <NavLink to="/hotels">Hotels</NavLink>
                            </div>
                            <div className="nav-button">
                                <NavLink to="/flights">Flights</NavLink>
                            </div>
                            <div className="nav-button">
                                <NavLink to="/reviews">Reviews</NavLink>
                            </div>
                        </div>

                        {/* Right Side: Login, Signup & Menu */}
                        <div className="nav-right">
                            {!isLoggedIn ? (
                                <>
                                    <div id="login">
                                        <NavLink to="/login">
                                            <button className="loginButton">Login</button>
                                        </NavLink>
                                    </div>
                                    <div id="signup">
                                        <NavLink to="/register">
                                            <button className="loginButton">Signup</button>
                                        </NavLink>
                                    </div>
                                </>
                            ) : (
                                <div id="logout">
                                    <button className="loginButton" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            )}
                            
                            {/* Menu Button */}
                            <div id="menu">
                                <button id="menuButton" onClick={toggleMenu}>
                                    <img src="src/visualResources/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" alt="Menu" />
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <SideMenu onClose={toggleMenu} showMenu={showMenu} />
        </>
    );
}

export default Header;
