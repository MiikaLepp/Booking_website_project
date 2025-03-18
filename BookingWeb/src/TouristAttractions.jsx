import React, { useState } from "react";
import "./TouristAttractions.css";
import stBartImage from "./visualResources/stbart.jpg";
import osakaCastleImage from "./visualResources/osakacastle.jpg";
import dallasImage from "./visualResources/dallas.jpg";
import parisImage from "./visualResources/paris.jpg";
import londonImage from "./visualResources/london.jpg";

const TouristAttractions = () => {
  const [openCity, setOpenCity] = useState(null);

  const handleToggle = (city) => {
    setOpenCity(openCity === city ? null : city);
  };

  return (
    <div className="container">
      <div
        className={`city-button ${openCity === "frankfurt" ? "active" : ""}`}
        onClick={() => handleToggle("frankfurt")}
        style={{
          backgroundImage: `url(${stBartImage})`,
        }}
      >
        <div className="button-text">Frankfurt</div>
      </div>

      <div className={`info-panel ${openCity === "frankfurt" ? "open" : ""}`}>
        <div className="info-content">
          <img
            src={stBartImage}
            alt="St. Bartholomew's Cathedral"
            className="info-image"
          />
          <div className="info-text">
            <h2>Our recommendation: St. Bartholomew's Cathedral</h2>
            <p>
              A Gothic-style Roman Catholic cathedral, also known as Frankfurt
              Cathedral, renowned for its stunning architecture and historical
              significance.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`city-button ${openCity === "osaka" ? "active" : ""}`}
        onClick={() => handleToggle("osaka")}
        style={{
          backgroundImage: `url(${osakaCastleImage})`,
        }}
      >
        <div className="button-text">Osaka</div>
      </div>

      <div className={`info-panel ${openCity === "osaka" ? "open" : ""}`}>
        <div className="info-content">
          <img
            src={osakaCastleImage}
            alt="Osaka Castle"
            className="info-image"
          />
          <div className="info-text">
            <h2>Our recommendation: Osaka Castle</h2>
            <p>
              A historic castle in Chūō-ku, Osaka, Japan, that played a major
              role in the unification of Japan during the 16th century.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`city-button ${openCity === "dallas" ? "active" : ""}`}
        onClick={() => handleToggle("dallas")}
        style={{
          backgroundImage: `url(${dallasImage})`,
        }}
      >
        <div className="button-text">Dallas</div>
      </div>

      <div className={`info-panel ${openCity === "dallas" ? "open" : ""}`}>
        <div className="info-content">
          <img
            src={dallasImage}
            alt="The Sixth Floor Museum"
            className="info-image"
          />
          <div className="info-text">
            <h2>Our recommendation: The Sixth Floor Museum</h2>
            <p>
              A historic museum at Dealey Plaza, dedicated to President John F. Kennedy. It marks the location from where Lee Harvey Oswald fired the fatal shots.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`city-button ${openCity === "paris" ? "active" : ""}`}
        onClick={() => handleToggle("paris")}
        style={{
          backgroundImage: `url(${parisImage})`,
        }}
      >
        <div className="button-text">Paris</div>
      </div>

      <div className={`info-panel ${openCity === "paris" ? "open" : ""}`}>
        <div className="info-content">
          <img
            src={parisImage}
            alt="Eiffel Tower"
            className="info-image"
          />
          <div className="info-text">
            <h2>Our recommendation: Eiffel Tower</h2>
            <p>
              The Eiffel Tower, a global cultural icon of France, is one of the most recognizable landmarks in the world and offers spectacular views of Paris.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`city-button ${openCity === "london" ? "active" : ""}`}
        onClick={() => handleToggle("london")}
        style={{
          backgroundImage: `url(${londonImage})`,
        }}
      >
        <div className="button-text">London</div>
      </div>

      <div className={`info-panel ${openCity === "london" ? "open" : ""}`}>
        <div className="info-content">
          <img
            src={londonImage}
            alt="The British Museum"
            className="info-image"
          />
          <div className="info-text">
            <h2>Our recommendation: The British Museum</h2>
            <p>
              Home to a vast collection of world art and history, including the Rosetta Stone, ancient Egyptian mummies, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default TouristAttractions;
