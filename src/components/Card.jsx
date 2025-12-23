
import React, { useState, useEffect } from "react";
import "./card.css";
import cardclicked from '..\\assets\\Sound effect\\Card_Flip.mp3';

const Card = ({ image, isFlipped, onClick }) => {
  const [rotation, setRotation] = useState(0);


  const flipmusic = new Audio(cardclicked);

  function user_clickedcard() {
    flipmusic.play();
  }
  // Generate random rotation when the card mounts
  useEffect(() => {
    const randomRotation = Math.random() * (3 - (-3)) + (-3); // Random between -3 and 3 degrees
    setRotation(randomRotation);
  }, []);

  return (
    <div
      className={`memory-card ${isFlipped ? "flipped" : ""}`}
      onClick={onClick}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="card-face front" onClick={user_clickedcard}>
        <div className="cover"></div>
      </div>
      <div className="card-face back">
        <img src={image} alt="Card" />
      </div>
    </div>
  );
};

export default Card;

