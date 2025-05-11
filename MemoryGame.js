import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const MemoryGame2 = () => {
  // Emoji pairs for the game
  const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
  const cards = [...symbols, ...symbols]; // Duplicate for pairs

  // Game state
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Initialize game
  useEffect(() => {
    shuffleCards();
  }, []);

  // Check for win condition
  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setGameWon(true);
    }
  }, [matchedCards]);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffled = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol }));
    setShuffledCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  // Handle card click
  const handleCardClick = (id) => {
    if (gameWon) return;
    
    // Don't allow flip if: already flipped/matched or two cards already flipped
    if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id)) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = shuffledCards.find(card => card.id === firstId);
      const secondCard = shuffledCards.find(card => card.id === secondId);

      if (firstCard.symbol === secondCard.symbol) {
        setMatchedCards([...matchedCards, firstId, secondId]);
      }
      
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  return (
    <div className="memory-game-container">
      <h1 className="game-title">Memory Game</h1>
      
      <div className="game-stats">
        <p>Moves: {moves}</p>
        <p>Matched: {matchedCards.length/2}/{symbols.length}</p>
      </div>

      {gameWon ? (
        <div className="win-message">
          <h2>Congratulations! 🎉</h2>
          <p>You won in {moves} moves!</p>
          <button onClick={shuffleCards} className="reset-btn">
            Play Again
          </button>
        </div>
      ) : (
        <>
          <div className="cards-grid">
            {shuffledCards.map((card) => (
              <div
                key={card.id}
                className={`card ${
                  flippedCards.includes(card.id) || matchedCards.includes(card.id) 
                    ? 'flipped' 
                    : ''
                }`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="card-inner">
                  <div className="card-front">?</div>
                  <div className="card-back">{card.symbol}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={shuffleCards} className="reset-btn">
            Reset Game
          </button>
        </>
      )}
    </div>
  );
};

export default MemoryGame2;