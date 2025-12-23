import Popup from '../components/popup';
import React, { useState, useEffect } from 'react';
import "./GAMEscreen.css";
import { useLocation } from 'react-router-dom';
import PointsCard from '../components/PointsCard';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
const GAMEscreen = () => {
    const location = useLocation();
    const { player1Name, player2Name, player1Icon, player2Icon } = location.state || {};
    const navigate = useNavigate()
    // Array of card images
 
    const card_images = [
        "src\\assets\\cards\\Among-Us-Red.png",
        "src\\assets\\cards\\diamond-axe.png",
        "src\\assets\\cards\\diamond-pickaxe.png",
        "src\\assets\\cards\\Diamond.png",
        'src\\assets\\cards\\emerald.png',
        'src\\assets\\cards\\enchanted_apple.png',
        'src\\assets\\cards\\Gold_Ingot.png',
        'src\\assets\\cards\\steve.jpg',
        'src\\assets\\cards\\sword.png',
        "src\\assets\\cards\\Creeper.jpg"
    ];

    // Duplicate and shuffle the card images
    const doubledImages = [...card_images, ...card_images];
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    const randomplayer = Math.floor(Math.random() * 2) + 1;

    // State
    const [shuffledCards, setShuffledCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);  // Store flipped cards
    const [matchedCards, setMatchedCards] = useState([]);  // Store matched cards
    const [currentPlayer, setCurrentPlayer] = useState(randomplayer); // Track current player (1 or 2)
    const [player1Points, setPlayer1Points] = useState(0); // Player 1 points
    const [player2Points, setPlayer2Points] = useState(0); // Player 2 points
    const [lockBoard, setLockBoard] = useState(false);     // Prevent clicks when checking match
    const [gameOver, setGameOver] = useState(false); // Track if the game is over
    const [winner, setWinner] = useState(null);      // Store winner info
    useEffect(() => {
        setShuffledCards(shuffleArray(doubledImages));
    }, []);

    // Handle card click
    const handleCardClick = (image, index) => {
        if (lockBoard || flippedCards.some(card => card.index === index)) return;

        const newFlippedCards = [...flippedCards, { image, index }];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            checkForMatch(newFlippedCards);
        }
    };

    // Check if two flipped cards match
    const checkForMatch = (flippedCards) => {
        setLockBoard(true); // Lock the board while checking

        const [firstCard, secondCard] = flippedCards;
        if (firstCard.image === secondCard.image) {
            // Cards match, add to matchedCards
            setMatchedCards([...matchedCards, firstCard.index, secondCard.index]);

            // Award points to current player
            if (currentPlayer === 1) {
                setPlayer1Points(player1Points + 1);
            } else {
                setPlayer2Points(player2Points + 1);
            }

            resetTurn(true);
        } else {
            // Cards do not match, switch player
            setTimeout(() => resetTurn(false), 1000);
        }
    };
    useEffect(() => {
        if (matchedCards.length === shuffledCards.length && shuffledCards.length > 0) {
            endGame();
        }
    }, [matchedCards]);
    
    // Reset for the next turn
    const resetTurn = (isMatch) => {
        setFlippedCards([]);
        setLockBoard(false);
        if (!isMatch) {
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }

        // // Check if game is over (when all cards are matched)
        // if (matchedCards.length + 2 === shuffledCards.length) {
        //     endGame();
        // }
    };

    const endGame = () => {
        setGameOver(true);
        console.log("Game Over!");
        console.log("Player 1 Points:", player1Points);
        console.log("Player 2 Points:", player2Points);
        if (player1Points > player2Points) {
            setWinner({
                name: player1Name,
                icon: player1Icon,
                points: player1Points

            });
        } else if (player2Points > player1Points) {
            setWinner({
                name: player2Name,
                icon: player2Icon,
                points: player2Points
            });
        } else {
            setWinner(false); // It's a draw
        }
    };
    const handleRematch = () => {
        // Reset game logic for rematch
        setGameOver(false);
        setPlayer1Points(0);
        setPlayer2Points(0);
        setShuffledCards(shuffleArray([...card_images, ...card_images]));
        setMatchedCards([]);
        setCurrentPlayer(1);
    };

    const handleHome = () => {
        navigate('/');
    };

    // Function to check if card is flipped or matched
    const isCardFlippedOrMatched = (index) => {
        return flippedCards.some(card => card.index === index) || matchedCards.includes(index);
    };

    return (
        <>
            <div className="background-container">
                <div className="Orange-box"
                    style={{
                        backgroundColor: currentPlayer === 1 ? 'var(--primary1)' : 'var(--primary2)'
                    }}>
                    <div className='pointscarddiv' style={{
                        opacity: currentPlayer === 1 ? '100%' : '50%'
                    }}>

                        <PointsCard playerName={player1Name} icon={player1Icon} points={player1Points} />
                    </div>
                    <div className='pointscarddiv'style={{
                        opacity: currentPlayer === 2 ? '100%' : '50%'
                    }}>

                        <PointsCard playerName={player2Name} icon={player2Icon} points={player2Points} />
                    </div>
                </div>
            </div>
            <main className='scr-main'>
                <div className="cards">
                    {shuffledCards.map((image, index) => (
                        <Card
                            key={index}
                            image={image}
                            onClick={() => handleCardClick(image, index)}
                            isFlipped={isCardFlippedOrMatched(index)}
                        />
                    ))}
                </div>

                   {/* Show Popup when game is over */}
                   {gameOver && (
                <Popup 
                    winnerName={winner?.name}
                    winnerIcon={winner?.icon}
                    winnerPoints={winner?.points}
                    isDraw={!winner}
                    onRematch={handleRematch}
                    onHome={handleHome}
                />
            )}
            </main>
        </>
    );
};

export default GAMEscreen;
