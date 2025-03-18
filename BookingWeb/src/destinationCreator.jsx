import React from "react";

const DestinationCreator = ({ name, image, link, description }) => (
  <li className="listedSD">
    <a href={link}>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>{description}</p>
    </a>
  </li>
);

export default DestinationCreator;