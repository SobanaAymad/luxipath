import { useState } from 'react';
import MemoryGame2 from '../components/MemoryGame';

export default function MemoryGame() {
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  return (
    <div className="page game-page">
      <h1>Memory Challenge</h1>
      <div className="game-stats">
        <p>Moves: {moves}</p>
        <p>Matches: {matches}/8</p>
      </div>
      <div className="game-board">
        {/* Game cards will be rendered here */}
        {Array(8).fill().map((_, i) => (
          <div key={i} className="memory-card">
            <MemoryGame2/>
          </div>
        ))}
      </div>
    </div>
  );
}