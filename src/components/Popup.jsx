import { useEffect } from 'react';
import React from 'react';
import "./popup.css";
import { useState} from 'react'
import clicked from '..\\assets\\Sound effect\\click_sound.mp3';

const Popup = ({ winnerName, winnerIcon, winnerPoints, isDraw, onRematch, onHome }) => {
    const [showPopup, setShowPopup] = useState(false);
    const music = new Audio(clicked);
    function user_clicked() {
          music.play();
    }
    // Use effect to trigger the fade-in
    useEffect(() => {
        const timer = setTimeout(() => setShowPopup(true), 50); // Short delay to ensure transition
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className={`popup-container ${showPopup ? 'show' : ''}`}>
                <div className='popup-box'>
                    {/* Show winner icon if not a draw */}
                    {!isDraw && (
                        <div className="winner-icon">
                            <img src={winnerIcon} alt="Winner Icon" />
                        </div>
                    )}

                    {/* Display "Draw" if it's a draw, otherwise show who won */}
                    <div className="winner-title">
                        {isDraw ? "It's a Draw!" : `${winnerName} won with ${winnerPoints} points`}
                    </div>

                    <div className='btn-container'>
                        <button className="rematch-btn nav-button" onClick={onRematch}>REMATCH</button>
                        <button className="home-btn nav-button" onClick={onHome}>HOME</button>
                    </div>
                </div>
            </div>
    );
}

export default Popup;
